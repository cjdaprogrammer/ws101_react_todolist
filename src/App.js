import React, { useState } from 'react';
import './App.css';
import AddToDo from './components/AddToDo';

function App() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track the task being edited

  // Updated array of emoticons with additional icons
  const emoticons = {
    basketball: "🏀",
    volleyball: "🏐",
    "table tennis": "🏓",
    badminton: "🏸",
    hiking: "🥾",
    homework: "📚",
    reading: "📖",
    dart: "🎯",
    skating: "⛸️",
    "window shopping": "🛍️",
    running: "🏃",
    celebrating: "🎉",
    holiday: "🏝️",
    "going to work": "🏢",
    cooking: "🍳",
    baking: "🎂",
    washing: "🧼",
    cleaning: "🧹",
    baseball: "⚾",
    chess: "♟️",
    "listening to music": "🎵",
    "traveling": "✈️",
    "playing games": "📱",
    "cyber security": "🛡️",
    "taking notes": "📝",
    meeting: "👨‍💼",
    vacation: "🏖️",
    swimming: "🏊",
    "web development": "💻",
    "play basketball": "🏀",
    "play games": "🎮",
    coding: "👨‍💻",
    work: "📁",
    relax: "🧘",
    party: "🎊",
    programming: "👨‍💻",
    computer: "🖥️",
    hacking: "👾"
  };

  // Function to get emoticon based on the task description
  function getEmoticon(task) {
    const taskLower = task.toLowerCase();
    for (let keyword in emoticons) {
      if (taskLower.includes(keyword)) {
        return emoticons[keyword];
      }
    }
    return "✅"; // Default icon if no match
  }

  const addTodo = (task, category) => {
    const assignedEmoticon = getEmoticon(task);

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = { ...updatedTodos[editIndex], text: task, category, emoticon: assignedEmoticon };
      setTodos(updatedTodos);
      setEditIndex(null); // Reset after editing
    } else {
      setTodos([...todos, { text: task, completed: false, category, emoticon: assignedEmoticon }]);
    }
  };

  // Toggle complete for the specific task
  const toggleComplete = (index) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed }; // Toggle only the clicked task
        }
        return todo; // Return the rest as is
      });
    });
  };

  // Debounced remove to prevent rapid consecutive clicks
  const removeTodo = (() => {
    let timeout;
    return (index) => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        setTodos((prevTodos) => {
          const newTodos = [...prevTodos];
          if (index >= 0 && index < newTodos.length) {
            newTodos.splice(index, 1); // Safely remove task by index
          }
          return newTodos;
        });
      }, 300); // 300ms debounce delay
    };
  })();

  // Edit the specific task
  const editTodo = (index) => {
    setEditIndex(index); // Set the index of the task being edited
  };

  // Function to render tasks based on category
  const renderTasksByCategory = (category) => {
    return todos
      .filter(todo => todo.category === category)
      .map((todo, index) => (
        <div key={index} className="todo-item">
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.emoticon} {todo.text}
          </span>
          <button onClick={() => toggleComplete(todos.indexOf(todo))} className="complete-btn">
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => editTodo(todos.indexOf(todo))} className="edit-btn">Edit</button>
          <button onClick={() => removeTodo(todos.indexOf(todo))} className="remove-btn">Remove</button>
        </div>
      ));
  };

  return (
    <div className="app-container">
      <h1>ToDo List with Task Groups</h1>
      <AddToDo addTodo={addTodo} editIndex={editIndex} todos={todos} />

      <div className="task-group">
        <h2>Work Tasks</h2>
        {renderTasksByCategory("Work")}
      </div>

      <div className="task-group">
        <h2>Sports Tasks</h2>
        {renderTasksByCategory("Sports")}
      </div>

      <div className="task-group">
        <h2>Personal Tasks</h2>
        {renderTasksByCategory("Personal")}
      </div>
    </div>
  );
}

export default App;
