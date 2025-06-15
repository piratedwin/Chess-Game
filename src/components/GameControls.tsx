import React from 'react';
import { RotateCcw, Download, Upload } from 'lucide-react';
import { useChess } from '../context/ChessContext';

export function GameControls() {
  const { resetGame, gameState } = useChess();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to start a new game?')) {
      resetGame();
    }
  };

  const handleExportPGN = () => {
    // This would export the game in PGN format
    const moves = gameState.moveHistory.join(' ');
    const pgn = `[Event "Chess Game"]\n[Date "${new Date().toISOString().split('T')[0]}"]\n\n${moves}`;
    
    const blob = new Blob([pgn], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chess-game.pgn';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Game Controls</h3>
      
      <div className="space-y-2">
        <button
          onClick={handleReset}
          className="w-full flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          New Game
        </button>
        
        <button
          onClick={handleExportPGN}
          disabled={gameState.moveHistory.length === 0}
          className="w-full flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          Export PGN
        </button>
        
        <button
          className="w-full flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200"
          disabled
        >
          <Upload className="w-4 h-4" />
          Import PGN
        </button>
      </div>
    </div>
  );
}