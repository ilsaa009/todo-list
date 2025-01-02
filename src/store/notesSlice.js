import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: JSON.parse(localStorage.getItem("notes")) || [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    completeNote: (state, action) => {
      const note = state.notes.find((n) => n.$id === action.payload);
      if (note) {
        note.completed = !note.completed;
        localStorage.setItem('notes', JSON.stringify(state.notes));
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((n) => n.$id !== action.payload);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    reorderNotes: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [reorderedItem] = state.notes.splice(sourceIndex, 1);
      state.notes.splice(destinationIndex, 0, reorderedItem);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
  },
});

export const { addNote, completeNote, deleteNote, reorderNotes } = notesSlice.actions;

export default notesSlice.reducer;
