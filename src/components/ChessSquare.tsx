import React, { useState } from 'react';
import { ChessPiece } from './ChessPiece';
import { ChessPiece as ChessPieceType } from '../types/chess';

interface ChessSquareProps {
  piece: ChessPieceType | null;
  isLight: boolean;
  isHighlighted?: boolean;
  isPossibleMove?: boolean;
  isLastMove?: boolean;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  square: string;
}

export function ChessSquare({
  piece,
  isLight,
  isHighlighted = false,
  isPossibleMove = false,
  isLastMove = false,
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
  square,
}: ChessSquareProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
    onDragOver(e);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragOver(false);
    onDrop(e);
  };

  const getSquareColor = () => {
    if (isHighlighted) return 'bg-yellow-400';
    if (isLastMove) return 'bg-yellow-300';
    if (isDragOver && isPossibleMove) return 'bg-green-400';
    if (isPossibleMove) return 'bg-green-200';
    return isLight ? 'bg-amber-100' : 'bg-amber-700';
  };

  return (
    <div
      className={`
        relative w-16 h-16 flex items-center justify-center
        transition-all duration-200 ease-in-out
        ${getSquareColor()}
        ${piece ? 'cursor-pointer' : ''}
        hover:opacity-90
      `}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Coordinate labels */}
      {square[1] === '1' && (
        <div className="absolute bottom-0 right-1 text-xs font-medium opacity-60">
          {square[0]}
        </div>
      )}
      {square[0] === 'a' && (
        <div className="absolute top-0 left-1 text-xs font-medium opacity-60">
          {square[1]}
        </div>
      )}
      
      {/* Possible move indicator */}
      {isPossibleMove && !piece && (
        <div className="w-6 h-6 rounded-full bg-gray-600 opacity-30" />
      )}
      
      {/* Chess piece */}
      {piece && (
        <div
          draggable
          onDragStart={onDragStart}
          className="w-full h-full flex items-center justify-center"
        >
          <ChessPiece piece={piece} />
        </div>
      )}
    </div>
  );
}