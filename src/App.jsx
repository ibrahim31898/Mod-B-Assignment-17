/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { db } from './config/firebase';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import './App.css';
import './index.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTask, setEditingTask] = useState('');


  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(db, 'tasks');
      const tasksSnapshot = await getDocs(tasksCollection);
      const tasksList = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (editingId) {
      const taskDoc = doc(db, 'tasks', editingId);
      await updateDoc(taskDoc, { text: editingTask });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingId ? { ...task, text: editingTask } : task
        )
      );
      setEditingId(null);
      setEditingTask('');
    } else {
      const docRef = await addDoc(collection(db, 'tasks'), { text: newTask });
      setTasks([...tasks, { id: docRef.id, text: newTask }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id, text) => {
    setEditingId(id);
    setEditingTask(text);
  };

  const handleDeleteAllTasks = async () => {
    const tasksCollection = collection(db, 'tasks');
    const tasksSnapshot = await getDocs(tasksCollection);
    tasksSnapshot.forEach(async (taskDoc) => {
      await deleteDoc(doc(db, 'tasks', taskDoc.id));
    });
    setTasks([]);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center todo-title">Todo list</h1>
      <Form className="mb-4">
        <Row>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Enter your task"
              value={editingId ? editingTask : newTask}
              onChange={(e) => {
                if (editingId) {
                  setEditingTask(e.target.value);
                } else {
                  setNewTask(e.target.value);
                }
              }}
            />
          </Col>
          <Col md={4}>
            <Button onClick={handleAddTask} className="w-100">
              {editingId ? 'Update' : 'Add'}
            </Button>
          </Col>
        </Row>
      </Form>
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
            {task.text}
            <div>
              <Button variant="warning" className="me-2" onClick={() => handleEditTask(task.id, task.text)}>
                ✏️
              </Button>
              <Button variant="danger" onClick={() => handleDeleteTask(task.id)}>
                🗑️
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {tasks.length > 0 && (
        <Button variant="danger" className="mt-3 w-100" onClick={handleDeleteAllTasks}>
          Delete All
        </Button>
      )}
    </Container>
  );
}

export default App;
