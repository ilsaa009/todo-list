import { useState } from "react";

function NoteForm({ onAddNote }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddNote = (e) => {
    e.preventDefault();
    if(!inputValue.trim()) return;
    onAddNote(inputValue); 
    setInputValue(""); 
  };

  const handleKeyPress = (e) => {
    if(e.key === "Enter") {
      handleAddNote(e);
    }
  }
  return (
    <div id="todo-form" onSubmit={handleAddNote}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add task..."
      />
      <button onClick={handleAddNote}>I Got This!</button>
    </div>
  );
}

export default NoteForm;
