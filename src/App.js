// src/App.js

import React, { useContext, useState } from 'react';
import { TodoContext } from './context/TodoContext';
import './App.css';

function App() {
  const { addTodo, removeTodo, toggleTodo, setFilter, filteredTodos } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo({ id: Date.now(), text: newTodo });
      setNewTodo('');
    }
  };

  return (
    <div className="app container">
      <header className="app-header text-center my-5">
        <h1>To-Do List</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleAddTodo}>
              Add
            </button>
          </div>
        </div>
        <div className="btn-group mb-3">
          <button className="btn btn-outline-secondary" onClick={() => setFilter('all')}>All</button>
          <button className="btn btn-outline-secondary" onClick={() => setFilter('active')}>Active</button>
          <button className="btn btn-outline-secondary" onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <ul className="list-group">
          {filteredTodos().map((todo) => (
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={`ml-2 ${todo.completed ? 'completed' : ''}`}>{todo.text}</span>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => removeTodo(todo.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
