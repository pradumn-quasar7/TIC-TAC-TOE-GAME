import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type Player = 'X' | 'O' | null;

function App() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const calculateWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner || newBoard.every(square => square !== null)) {
      setGameOver(true);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const getStatus = () => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a Draw!";
    return `Next Player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Tic Tac Toe
        </h1>

        <div className="mb-6 text-center">
          <p className={`text-2xl font-semibold ${
            winner ? 'text-green-600' : isDraw ? 'text-orange-600' : 'text-blue-600'
          }`}>
            {getStatus()}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((square, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`aspect-square rounded-xl text-5xl font-bold transition-all duration-200
                ${square === 'X' ? 'bg-blue-100 text-blue-600' : ''}
                ${square === 'O' ? 'bg-red-100 text-red-600' : ''}
                ${!square ? 'bg-gray-50 hover:bg-gray-100 hover:shadow-md' : ''}
                ${!square && !gameOver ? 'cursor-pointer' : 'cursor-not-allowed'}
                border-2 border-gray-200 hover:border-gray-300 shadow-sm
              `}
              disabled={!!square || gameOver}
            >
              {square}
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold text-lg
            hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg
            flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;
