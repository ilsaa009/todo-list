import { useState } from "react";

function NoteForm({ onAddNote }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddNote = (e) => {
    e.preventDefault();
    onAddNote(inputValue); 
    setInputValue(""); 
  };

  return (
    <div id="todo-form" onSubmit={handleAddNote}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add task..."
      />
      <button onClick={handleAddNote}>I Got This!</button>
    </div>
  );
}

export default NoteForm;
