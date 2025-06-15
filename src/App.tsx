import React from 'react';
import { ChessProvider } from './context/ChessContext';
import { ChessBoard } from './components/ChessBoard';
import { GameStatus } from './components/GameStatus';
import { MoveHistory } from './components/MoveHistory';
import { GameControls } from './components/GameControls';

function App() {
  return (
    <ChessProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Chess Game
            </h1>
            <p className="text-gray-600">
              Click or drag pieces to make your move
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            {/* Left sidebar */}
            <div className="order-2 lg:order-1 w-full lg:w-80 space-y-6">
              <GameStatus />
              <GameControls />
            </div>

            {/* Chess board */}
            <div className="order-1 lg:order-2 flex justify-center">
              <ChessBoard />
            </div>

            {/* Right sidebar */}
            <div className="order-3 w-full lg:w-80">
              <MoveHistory />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Built with React, TypeScript, and chess.js</p>
          </div>
        </div>
      </div>
    </ChessProvider>
  );
}

export default App;