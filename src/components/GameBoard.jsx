import { useState } from "react";

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [board, setBoard] = useState(INITIAL_BOARD);

  const handleClickSquare = function (clickedRow, clickedCol) {
    setBoard((b) =>
      b.map((row, i) =>
        row.map((col, j) => (i === clickedRow && j === clickedCol ? "X" : col))
      )
    );
  };

  return (
    <ol id="game-board">
      {board.map((row, i) => (
        <li key={i}>
          <ol>
            {row.map((col, j) => (
              <li key={(i + 1) * 3 + j}>
                <button onClick={() => handleClickSquare(i, j)}>{col}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
