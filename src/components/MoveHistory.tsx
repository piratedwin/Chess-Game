import React from 'react';
import { History } from 'lucide-react';
import { useChess } from '../context/ChessContext';

export function MoveHistory() {
  const { gameState } = useChess();

  const formatMoves = () => {
    const moves = gameState.moveHistory;
    const pairs = [];
    
    for (let i = 0; i < moves.length; i += 2) {
      const moveNumber = Math.floor(i / 2) + 1;
      const whiteMove = moves[i];
      const blackMove = moves[i + 1];
      
      pairs.push({
        number: moveNumber,
        white: whiteMove,
        black: blackMove,
      });
    }
    
    return pairs;
  };

  const movePairs = formatMoves();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-3">
        <History className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-800">Move History</h3>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {movePairs.length === 0 ? (
          <p className="text-gray-500 text-sm">No moves yet</p>
        ) : (
          <div className="space-y-1">
            {movePairs.map((pair) => (
              <div key={pair.number} className="flex items-center text-sm">
                <span className="w-8 text-gray-500 font-mono">
                  {pair.number}.
                </span>
                <span className="w-16 font-mono text-gray-800">
                  {pair.white}
                </span>
                {pair.black && (
                  <span className="w-16 font-mono text-gray-800">
                    {pair.black}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}