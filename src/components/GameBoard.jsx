export default function GameBoard({ onSelectSquare, gameBoard }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, i) => (
        <li key={i}>
          <ol>
            {row.map((col, j) => (
              <li key={(i + 1) * 3 + j}>
                <button onClick={() => onSelectSquare(i, j)} disabled={col}>
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
