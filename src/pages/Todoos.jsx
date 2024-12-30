import React from 'react'
import TodoForm from '../components/TodoForm'
import ThemeOptions from '../components/ThemeOptions'
import Todo from '../components/Todo'

const Todoos = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dateTime, setDateTime] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: task, completed: false },
      ]);
      setTask("");
    }
  };

  const toggleComplete = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formatDate = now.toLocaleDateString();
      const formatTime = now.toLocaleTimeString();
      setDateTime(`${formatDate} - ${formatTime}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
   <>
   <div>
                <h1>Just Do it</h1>
            </div>
            <div className="theme-options">
                <ThemeOptions theme="light"/>
                <ThemeOptions theme="dark"/>
                <ThemeOptions theme="purple"/>
            </div>
            <TodoForm/>
            <h2 className="date-time">{dateTime}</h2>
      <div className="task-list">
        {tasks.map((t, index) => (
          <div
            className="task"
            key={index}
            style={{
              backgroundColor: t.completed ? "#d3f9d8" : "",
            }}
          >
            <span className="task-text">{t.text}</span>
            <div className="task-buttons">
              <button
                className="complete-btn"
                onClick={() => toggleComplete(index)}
              >
                ✓
              </button>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
            

   </>
  )
}

export default Todoos
