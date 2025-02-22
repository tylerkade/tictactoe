"use client";
import { TicTacToeProps, WinnerInfo } from "@/lib/definititions";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const TicTacToe: React.FC<TicTacToeProps> = ({
  currWins,
  setCurrWins,
  vsComputer,
}) => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [playersTurn, setPlayersTurn] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState<WinnerInfo>({
    winner: null,
    combo: null,
  });

  const winningCombos = useMemo(
    () => [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    []
  );

  const checkWinner = useCallback(
    (squares: Array<string | null>): WinnerInfo => {
      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return { winner: squares[a]!, combo };
        }
      }
      return { winner: null, combo: null };
    },
    [winningCombos]
  );

  const handleClick = useCallback(
    (index: number) => {
      if (board[index] || winnerInfo.winner) return;
      const newBoard = [...board];
      newBoard[index] = playersTurn ? "X" : "O";
      setBoard(newBoard);
      setPlayersTurn(!playersTurn);

      const result = checkWinner(newBoard);
      if (result.winner) {
        setWinnerInfo(result);
        setCurrWins((prev) => ({
          ...prev,
          [result.winner as "X" | "O"]: prev[result.winner as "X" | "O"] + 1,
        }));
      }
    },
    [board, playersTurn, winnerInfo, checkWinner, setCurrWins]
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayersTurn(true);
    setWinnerInfo({ winner: null, combo: null });
  };

  const getAiMove = useCallback(
    (board: Array<string | null>): number => {
      const ai: string = "O";
      const player: string = "X";

      const corners: number[] = [0, 2, 6, 8];
      const edges: number[] = [1, 3, 5, 7];

      const centerChance: number = 0.3; // 70% to pick centre if empty
      const cornerChance: number = 0.5; // 50% to pick corner if empty

      const findWinningMove = (symbol: string) => {
        for (const combo of winningCombos) {
          const [a, b, c] = combo;
          const values = [board[a], board[b], board[c]];

          if (
            values.filter((value) => value === symbol).length === 2 &&
            values.includes(null)
          ) {
            return combo[values.indexOf(null)];
          }
        }
        return null;
      };

      const winningMove = findWinningMove(ai);
      if (winningMove !== null) return winningMove;

      const blockMove = findWinningMove(player);
      if (blockMove !== null) return blockMove;

      if (board[4] === null && Math.random() > centerChance) return 4;

      const cornerMove = corners.filter((index) => board[index] === null);
      if (cornerMove.length > 0 && Math.random() > cornerChance)
        return cornerMove[Math.floor(Math.random() * cornerMove.length)];

      const edgesMove = edges.filter((index) => board[index] === null);
      if (edgesMove.length > 0)
        return edgesMove[Math.floor(Math.random() * edgesMove.length)];

      const randomMove = board
        .map((val, index) => (val === null ? index : null))
        .filter((val) => val !== null) as number[];
      return randomMove[Math.floor(Math.random() * randomMove.length)];
    },
    [winningCombos]
  );

  useEffect(() => {
    if (vsComputer && !playersTurn && !winnerInfo.winner) {
      const emptyIndices = board
        .map((val, index) => (val === null ? index : null))
        .filter((val) => val !== null) as number[];
      if (emptyIndices.length > 0) {
        const aiMove = getAiMove(board);
        setTimeout(() => handleClick(aiMove), 500);
      }
    }
  }, [playersTurn, board, vsComputer, winnerInfo, getAiMove, handleClick]);

  return (
    <div className="flex flex-col items-center mt-10 h-screen">
      <h2 className="text-2xl font-bold mb-4">
        {winnerInfo.winner
          ? `Winner: ${winnerInfo.winner}`
          : !board.includes(null)
          ? "It's a Draw!"
          : `Turn: ${playersTurn ? "X" : "O"}`}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`w-20 h-20 flex items-center justify-center text-2xl font-bold  text-black hover:bg-gray-200 ${
              winnerInfo.combo?.includes(index)
                ? "bg-green-700 hover:bg-green-800 duration-200"
                : board.includes(null)
                ? "bg-white"
                : "duration-200 bg-red-500 hover:bg-red-700"
            }`}
            onClick={() => handleClick(index)}
            disabled={!!winnerInfo.winner || (vsComputer && !playersTurn)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        className="mt-4 bg-blue-500 text-white w-40 py-2 rounded-md hover:bg-blue-400"
        onClick={resetGame}
      >
        Reset Game
      </button>
      {currWins.X | currWins.O ? (
        <div className="mb-4 text-xl text-center">
          Score
          <div className="flex gap-5">
            <p className="rounded-xl bg-[#333] text-center py-2 px-5">
              X: {currWins.X}
            </p>
            <p className="rounded-xl bg-[#333] text-center py-2 px-5">
              O: {currWins.O}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TicTacToe;
