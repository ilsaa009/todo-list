

function Note({ noteData, onDelete, onComplete }) {
    return (
        <div className={`note-wrapper ${noteData.completed ? "completed" : ""}`} 
      >
      <div 
                className={`note-body ${noteData.completed ? "completed-text" : ""}`} 
                onClick={onComplete} 
                role="button" 
                title="Mark as Completed"
            >
                {noteData.body}
            </div>

            <div className="task-buttons">
                <button
                    className="complete-btn"
                    onClick={onComplete}
                    title="Mark as Completed"
                >
                    ✓
                </button>

                <button
                    className="delete-btn"
                    onClick={onDelete}
                    title="Delete Note"
                >
                    🗑
                </button>
            </div>
        </div>
    );
}

export default Note;
