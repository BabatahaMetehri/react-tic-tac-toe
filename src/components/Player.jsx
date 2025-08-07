import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleClickBtn = function () {
    setIsEditing((ie) => !ie);
  };

  const handleChange = function (e) {
    setNewName((_) => e.target.value);
  };
  return (
    <li>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{newName}</span>
        ) : (
          <input type="text" required value={newName} onChange={handleChange} />
        )}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleClickBtn}>{isEditing ? "Save" : "Edit"}</button>
      </span>
    </li>
  );
}
