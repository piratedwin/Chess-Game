import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Chess } from 'chess.js';
import { GameState, Move } from '../types/chess';

interface ChessContextType {
  game: Chess;
  gameState: GameState;
  makeMove: (move: Move) => boolean;
  resetGame: () => void;
  isValidMove: (from: string, to: string) => boolean;
  getPossibleMoves: (square: string) => string[];
}

const ChessContext = createContext<ChessContextType | undefined>(undefined);

interface ChessAction {
  type: 'MAKE_MOVE' | 'RESET_GAME' | 'UPDATE_STATE';
  payload?: any;
}

const initialGame = new Chess();

const initialState: GameState = {
  fen: initialGame.fen(),
  turn: 'w',
  gameOver: false,
  winner: null,
  check: false,
  checkmate: false,
  stalemate: false,
  draw: false,
  moveHistory: [],
};

function chessReducer(state: GameState, action: ChessAction): GameState {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.payload };
    case 'RESET_GAME':
      return { ...initialState };
    default:
      return state;
  }
}

interface ChessProviderProps {
  children: ReactNode;
}

export function ChessProvider({ children }: ChessProviderProps) {
  const [game] = React.useState(new Chess());
  const [gameState, dispatch] = useReducer(chessReducer, initialState);

  const updateGameState = () => {
    const newState: Partial<GameState> = {
      fen: game.fen(),
      turn: game.turn(),
      gameOver: game.isGameOver(),
      check: game.inCheck(),
      checkmate: game.isCheckmate(),
      stalemate: game.isStalemate(),
      draw: game.isDraw(),
      moveHistory: game.history(),
    };

    if (game.isCheckmate()) {
      newState.winner = game.turn() === 'w' ? 'b' : 'w';
    } else if (game.isDraw() || game.isStalemate()) {
      newState.winner = null;
    }

    dispatch({ type: 'UPDATE_STATE', payload: newState });
  };

  const makeMove = (move: Move): boolean => {
    try {
      const result = game.move(move);
      if (result) {
        updateGameState();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const resetGame = () => {
    game.reset();
    dispatch({ type: 'RESET_GAME' });
    updateGameState();
  };

  const isValidMove = (from: string, to: string): boolean => {
    try {
      const moves = game.moves({ square: from, verbose: true });
      return moves.some(move => move.to === to);
    } catch (error) {
      return false;
    }
  };

  const getPossibleMoves = (square: string): string[] => {
    try {
      const moves = game.moves({ square: square, verbose: true });
      return moves.map(move => move.to);
    } catch (error) {
      return [];
    }
  };

  React.useEffect(() => {
    updateGameState();
  }, []);

  const value: ChessContextType = {
    game,
    gameState,
    makeMove,
    resetGame,
    isValidMove,
    getPossibleMoves,
  };

  return (
    <ChessContext.Provider value={value}>
      {children}
    </ChessContext.Provider>
  );
}

export function useChess() {
  const context = useContext(ChessContext);
  if (context === undefined) {
    throw new Error('useChess must be used within a ChessProvider');
  }
  return context;
}