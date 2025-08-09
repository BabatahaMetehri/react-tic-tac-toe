import { useState } from "react";

export default function Player({ name, symbol, isActive, onRename }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleClickBtn = function (symbol, newName) {
    setIsEditing((ie) => !ie);
    if (isEditing)
      onRename(
        symbol,
        newName[0].toUpperCase() +
          newName.slice(1, newName.length).toLowerCase()
      );
  };

  const handleChange = function (e) {
    setNewName(e.target.value);
  };
  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{newName}</span>
        ) : (
          <input type="text" required value={newName} onChange={handleChange} />
        )}
        <span className="player-symbol">{symbol}</span>
        <button onClick={() => handleClickBtn(symbol, newName)}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </span>
    </li>
  );
}
