import React, { useState, useEffect } from 'react';

function AddToDo({ addTodo, editIndex, todos }) {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Work'); // Default category

  useEffect(() => {
    if (editIndex !== null) {
      const taskToEdit = todos[editIndex];
      setTask(taskToEdit.text);
      setCategory(taskToEdit.category);
    } else {
      setTask('');
      setCategory('Work');
    }
  }, [editIndex, todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(task, category);
    setTask('');
    setCategory('Work'); // Reset to default category after adding
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Sports">Sports</option>
        <option value="Personal">Personal</option>
      </select>
      <button type="submit">{editIndex !== null ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}

export default AddToDo; 
