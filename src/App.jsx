import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = { X: "Player 1", O: "Player 2" };

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveGameBoard = function (gameTurns) {
  let gameBoard = [...INITIAL_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
};

const deriveActivePlayer = function (gameTurns) {
  return gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";
};

const isGameOver = function (gameTurns) {
  for (const combo of WINNING_COMBINATIONS) {
    const square1 = gameTurns.find(
      (turn) =>
        turn?.square.row === combo[0].row && turn?.square.col === combo[0].col
    );
    const square2 = gameTurns.find(
      (turn) =>
        turn?.square.row === combo[1].row && turn?.square.col === combo[1].col
    );
    const square3 = gameTurns.find(
      (turn) =>
        turn?.square.row === combo[2].row && turn?.square.col === combo[2].col
    );

    if (
      square1 &&
      square1?.player === square2?.player &&
      square1?.player === square3?.player
    )
      return true;
  }

  return false;
};

const isGameDrawn = function (gameOver, gameTurns) {
  return !gameOver && gameTurns.length === 9;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const handleResetGame = function () {
    setGameTurns([]);
  };

  const handleSelectSquare = function (row, col) {
    setGameTurns((gt) => {
      const curPlayer = deriveActivePlayer(gt);
      return [{ square: { row, col }, player: curPlayer }, ...gt];
    });
  };

  const handleRenamePlayers = function (symbol, newName) {
    setPlayers((p) => {
      return {
        ...p,
        [symbol]: newName,
      };
    });
  };

  let gameBoard = deriveGameBoard(gameTurns);
  const curPlayer = deriveActivePlayer(gameTurns);
  const gameOver = isGameOver(gameTurns);
  const gameEnded = gameOver || isGameDrawn(gameOver, gameTurns);
  const winner = gameOver ? players[gameTurns[0].player] : null;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={curPlayer === "X"}
            onRename={handleRenamePlayers}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={curPlayer === "O"}
            onRename={handleRenamePlayers}
          />
        </ol>
        {gameEnded && <GameOver winner={winner} onReset={handleResetGame} />}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} players={players} />
    </main>
  );
}

export default App;
