// Notes.js
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, completeNote, deleteNote, reorderNotes } from '../store/notesSlice';
import NoteForm from '../components/NoteForm';
import Note from '../components/Note';
import ThemeOptions from '../components/ThemeOptions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Notes() {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const [dateTime, setDateTime] = useState('');

  const handleAddNote = (noteBody) => {
    if (!noteBody.trim()) {
      alert('Please write something');
      return;
    }
    const newNote = {
      $id: Date.now(),
      completed: false,
      body: noteBody,
    };
    dispatch(addNote(newNote));
  };

  const handleCompleteNote = (id) => {
    dispatch(completeNote(id));
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    dispatch(
      reorderNotes({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime(`${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
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
      <NoteForm onAddNote={handleAddNote} />
      <p className="date-time">{dateTime}</p>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="notes-List">
              {notes.map((note, index) => (
                <Draggable key={note.$id} draggableId={note.$id.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Note
                        noteData={note}
                        onDelete={() => handleDeleteNote(note.$id)}
                        onComplete={() => handleCompleteNote(note.$id)}
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
