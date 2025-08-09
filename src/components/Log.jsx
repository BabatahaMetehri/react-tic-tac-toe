export default function Log({ turns, players }) {
  return (
    <ol id="log">
      {turns.map((turn, i) => (
        <li key={i}>
          {players[turn.player]} selected{" "}
          {`(${turn.square.row}, ${turn.square.col})`}
        </li>
      ))}
    </ol>
  );
}
