import React from 'react';
import ToDoItem from './ToDoItem';

function ToDoList({ todos, toggleComplete, removeTodo, editTodo }) {
  const categories = ['Work', 'Sports', 'Personal'];

  return (
    <div className="todo-list-container">
      {categories.map((category) => (
        <div key={category} className="todo-category">
          <h2>{category} Tasks</h2>
          <ul className="todo-list">
            {todos
              .filter((todo) => todo.category === category)
              .map((todo, index) => (
                <ToDoItem
                  key={index}
                  index={index}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ToDoList;
