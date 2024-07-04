// src/context/TodoContext.js

import React, { createContext, useState } from 'react';

// Create the context
export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    const addTodo = (todo) => {
        setTodos([...todos, { ...todo, completed: false }]);
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const filteredTodos = () => {
        if (filter === 'completed') {
            return todos.filter((todo) => todo.completed);
        } else if (filter === 'active') {
            return todos.filter((todo) => !todo.completed);
        }
        return todos;
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo, setFilter, filteredTodos }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
