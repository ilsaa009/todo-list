import { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import Note from "../components/Note";
import ThemeOptions from "../components/ThemeOptions";

function Notes() {
    const [notes, setNotes] = useState([]);
    const [dateTime, setDateTime] = useState("");


    const addNote = (noteBody) => {
        if(!noteBody.trim()){
            alert("Please write something");
            return;
        }
        const newNote = {
            $id: Date.now(), 
            completed: false,
            body: noteBody,
        };
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    const completeNote = (id) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.$id === id
              ? { ...note, completed: !note.completed}
              : note
          )
        );
      };

    const deleteNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.$id !== id));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formatDate = now.toLocaleDateString();
            const formatTime = now.toLocaleTimeString();
            setDateTime(`${formatDate} - ${formatTime}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    

    return (
        <>
            <div>
                <h1>Just do it</h1>
            </div>
            <div className="theme-options">
                <ThemeOptions theme="light" />
                <ThemeOptions theme="dark" />
                <ThemeOptions theme="purple" />
            </div>
            <NoteForm onAddNote={addNote} />
            <p className="date-time">{dateTime}</p>
            <div>
                {notes.map((note) => (
                    <Note
                        key={note.$id}
                        noteData={note}
                        onDelete={() => deleteNote(note.$id)} 
                        onComplete={() => completeNote(note.$id)}
                    />
                ))}
            </div>
        </>
    );
}

export default Notes;
