import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  Button,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTask, setEditingTask] = useState('');

  useEffect(() => {
    axios.get('/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    if (task) {
      axios.post('/todos', { title: task })
        .then(response => {
          setTodos([...todos, response.data]);
          setTask('');
        })
        .catch(error => console.error('Error adding todo:', error));
    }
  };

  const deleteTodo = (id) => {
    axios.delete(`/todos/${id}`)
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
    axios.patch(`/todos/${id}`, { title: editingTask })
      .then(response => {
        setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
        setEditingId(null);
        setEditingTask('');
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  const toggleCompleted = (id, completed) => {
    axios.patch(`/todos/${id}`, { completed: !completed })
      .then(response => {
        setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
      })
      .catch(error => console.error('Error toggling completion:', error));
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md="6">
          <Card>
            <CardBody>
              <CardTitle tag="h3" className="text-center">TODO List</CardTitle>
              <Form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
                <FormGroup>
                  <Input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter a new task"
                  />
                </FormGroup>
                <Button color="primary" block onClick={addTodo}>Add Task</Button>
              </Form>
              <ListGroup className="mt-4">
                {todos.map((todo) => (
                  <ListGroupItem key={todo.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      {editingId === todo.id ? (
                        <Input
                          type="text"
                          value={editingTask}
                          onChange={(e) => setEditingTask(e.target.value)}
                          placeholder="Edit task"
                        />
                      ) : (
                        <span
                          style={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            cursor: 'pointer'
                          }}
                          onClick={() => toggleCompleted(todo.id, todo.completed)}
                        >
                          {todo.title}
                        </span>
                      )}
                    </div>
                    <div>
                      {editingId === todo.id ? (
                        <Button color="success" size="sm" onClick={() => updateTodo(todo.id)}>
                          Save
                        </Button>
                      ) : (
                        <Button color="warning" size="sm" onClick={() => startEditing(todo.id, todo.title)}>
                          Edit
                        </Button>
                      )}
                      {' '}
                      <Button color="danger" size="sm" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
