import React from 'react';
import { ChessPiece as ChessPieceType } from '../types/chess';

interface ChessPieceProps {
  piece: ChessPieceType | null;
  isDragging?: boolean;
  size?: number;
}

const pieceSymbols: Record<string, string> = {
  'wk': '♔', 'wq': '♕', 'wr': '♖', 'wb': '♗', 'wn': '♘', 'wp': '♙',
  'bk': '♚', 'bq': '♛', 'br': '♜', 'bb': '♝', 'bn': '♞', 'bp': '♟',
};

export function ChessPiece({ piece, isDragging = false, size = 48 }: ChessPieceProps) {
  if (!piece) return null;

  const pieceKey = `${piece.color}${piece.type}`;
  const symbol = pieceSymbols[pieceKey];

  return (
    <div
      className={`
        flex items-center justify-center select-none cursor-pointer
        transition-all duration-200 ease-in-out
        ${isDragging ? 'scale-110 opacity-75 z-50' : 'hover:scale-105'}
      `}
      style={{ fontSize: `${size}px` }}
    >
      <span
        className={`
          drop-shadow-sm
          ${piece.color === 'w' ? 'text-white' : 'text-gray-900'}
        `}
        style={{
          textShadow: piece.color === 'w' 
            ? '1px 1px 2px rgba(0,0,0,0.8)' 
            : '1px 1px 2px rgba(255,255,255,0.3)',
        }}
      >
        {symbol}
      </span>
    </div>
  );
}