import { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import Note from "../components/Note";
import ThemeOptions from "../components/ThemeOptions";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
    
    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(notes);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        setNotes(items);
      }
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
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="notes">
                    {(provided) =>(
                        <div 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="notes-List"
                        >
                            {notes.map((note, index) =>( 
                                <Draggable
                                key={note.$id}
                                draggableId={note.$id.toString()}
                                index={index}
                                >
                                    {(provided) => (
                                        <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                            <Note
                                            noteData={note}
                                            onDelete={() => deleteNote(note.$id)}
                                            onComplete={() => completeNote(note.$id)}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}

            </Droppable>
    </DragDropContext>
        </>
    );
}

export default Notes;
