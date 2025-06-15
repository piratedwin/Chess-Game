import React from 'react';
import { Crown, Clock, AlertTriangle } from 'lucide-react';
import { useChess } from '../context/ChessContext';

export function GameStatus() {
  const { gameState } = useChess();

  const getStatusMessage = () => {
    if (gameState.checkmate) {
      const winner = gameState.winner === 'w' ? 'White' : 'Black';
      return {
        message: `Checkmate! ${winner} wins`,
        icon: <Crown className="w-5 h-5" />,
        color: 'text-yellow-600',
      };
    }
    
    if (gameState.stalemate) {
      return {
        message: 'Stalemate - Draw',
        icon: <AlertTriangle className="w-5 h-5" />,
        color: 'text-gray-600',
      };
    }
    
    if (gameState.draw) {
      return {
        message: 'Draw',
        icon: <AlertTriangle className="w-5 h-5" />,
        color: 'text-gray-600',
      };
    }
    
    if (gameState.check) {
      const player = gameState.turn === 'w' ? 'White' : 'Black';
      return {
        message: `${player} is in check`,
        icon: <AlertTriangle className="w-5 h-5" />,
        color: 'text-red-600',
      };
    }
    
    const player = gameState.turn === 'w' ? 'White' : 'Black';
    return {
      message: `${player} to move`,
      icon: <Clock className="w-5 h-5" />,
      color: 'text-gray-700',
    };
  };

  const status = getStatusMessage();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className={`flex items-center gap-2 font-semibold ${status.color}`}>
        {status.icon}
        <span>{status.message}</span>
      </div>
    </div>
  );
}