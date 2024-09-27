import React from 'react';

function ToDoItem({ index, todo, toggleComplete, removeTodo, editTodo }) {
  return (
    <li data-index={index} className={todo.completed ? 'completed' : ''}>
      <span role="img" aria-label="Emoticon">{todo.emoticon}</span>
      <span>{todo.text}</span>
      <div className="button-container">
        <button onClick={() => toggleComplete(index)}>
          {todo.completed ? 'Undo' : 'Complete'} {/* Button text changes based on completion */}
        </button>
        <button onClick={() => editTodo(index)}>Edit</button>
        <button onClick={() => removeTodo(index)}>Remove</button>
      </div>
    </li>
  );
}

export default ToDoItem;
