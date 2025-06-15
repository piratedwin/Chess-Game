import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { ChessSquare } from './ChessSquare';
import { useChess } from '../context/ChessContext';
import { ChessPiece as ChessPieceType } from '../types/chess';

export function ChessBoard() {
  const { game, makeMove, isValidMove, getPossibleMoves } = useChess();
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<string | null>(null);

  const board = game.board();

  const handleSquareClick = (square: string) => {
    const piece = game.get(square);
    
    if (selectedSquare) {
      if (selectedSquare === square) {
        // Deselect if clicking the same square
        setSelectedSquare(null);
        setPossibleMoves([]);
      } else if (isValidMove(selectedSquare, square)) {
        // Make move
        const success = makeMove({ from: selectedSquare, to: square });
        if (success) {
          setSelectedSquare(null);
          setPossibleMoves([]);
        }
      } else if (piece && piece.color === game.turn()) {
        // Select new piece
        setSelectedSquare(square);
        setPossibleMoves(getPossibleMoves(square));
      } else {
        // Invalid move or selecting opponent's piece
        setSelectedSquare(null);
        setPossibleMoves([]);
      }
    } else if (piece && piece.color === game.turn()) {
      // Select piece
      setSelectedSquare(square);
      setPossibleMoves(getPossibleMoves(square));
    }
  };

  const handleDragStart = (e: React.DragEvent, square: string) => {
    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      setDraggedPiece(square);
      setPossibleMoves(getPossibleMoves(square));
      e.dataTransfer.setData('text/plain', square);
    } else {
      e.preventDefault();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetSquare: string) => {
    e.preventDefault();
    const sourceSquare = e.dataTransfer.getData('text/plain');
    
    if (sourceSquare && isValidMove(sourceSquare, targetSquare)) {
      makeMove({ from: sourceSquare, to: targetSquare });
    }
    
    setDraggedPiece(null);
    setPossibleMoves([]);
    setSelectedSquare(null);
  };

  const getSquareFromIndices = (row: number, col: number): string => {
    const file = String.fromCharCode(97 + col); // 'a' to 'h'
    const rank = (8 - row).toString(); // '8' to '1'
    return file + rank;
  };

  const isLight = (row: number, col: number): boolean => {
    return (row + col) % 2 === 0;
  };

  return (
    <div className="inline-block border-4 border-amber-900 rounded-lg shadow-2xl">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((piece, colIndex) => {
            const square = getSquareFromIndices(rowIndex, colIndex);
            const isSquareLight = isLight(rowIndex, colIndex);
            const isHighlighted = selectedSquare === square;
            const isPossibleMove = possibleMoves.includes(square);
            
            return (
              <ChessSquare
                key={square}
                piece={piece as ChessPieceType}
                isLight={isSquareLight}
                isHighlighted={isHighlighted}
                isPossibleMove={isPossibleMove}
                square={square}
                onClick={() => handleSquareClick(square)}
                onDragStart={(e) => handleDragStart(e, square)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, square)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}