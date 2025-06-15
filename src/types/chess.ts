export type PieceColor = 'w' | 'b';
export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

export interface Square {
  rank: number;
  file: number;
}

export interface Move {
  from: string;
  to: string;
  promotion?: PieceType;
}

export interface GameState {
  fen: string;
  turn: PieceColor;
  gameOver: boolean;
  winner: PieceColor | null;
  check: boolean;
  checkmate: boolean;
  stalemate: boolean;
  draw: boolean;
  moveHistory: string[];
}