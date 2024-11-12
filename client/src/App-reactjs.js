import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingTask, setEditingTask] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/todos')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    const addTodo = () => {
        if (task) {
            axios.post('http://localhost:4000/todos', { title: task })
                .then(response => {
                    setTodos([...todos, response.data]);
                    setTask('');
                })
                .catch(error => console.error('Error adding todo:', error));
        }
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:4000/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => console.error('Error deleting todo:', error));
    };

    const startEditing = (id, title) => {
        setEditingId(id);
        setEditingTask(title);
    };

    const updateTodo = (id) => {
        axios.patch(`http://localhost:4000/todos/${id}`, { title: editingTask })
            .then(response => {
                setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
                setEditingId(null);
                setEditingTask('');
            })
            .catch(error => console.error('Error updating todo:', error));
    };

    const toggleCompleted = (id, completed) => {
        axios.patch(`http://localhost:4000/todos/${id}`, { completed: !completed })
            .then(response => {
                setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
            })
            .catch(error => console.error('Error toggling completion:', error));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a new task"
            />
            <button onClick={addTodo}>Add</button>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {editingId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTask}
                                    onChange={(e) => setEditingTask(e.target.value)}
                                />
                                <button onClick={() => updateTodo(todo.id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => toggleCompleted(todo.id, todo.completed)}
                                >
                                    {todo.title}
                                </span>
                                <button onClick={() => startEditing(todo.id, todo.title)}>Edit</button>
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                                <span>{todo.completed ? '✔️' : '❌'}</span>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
