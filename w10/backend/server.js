const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const FILE = 'tasks.json';

app.use(cors());
app.use(express.json());

// helper functions
function readTasks() {
  return JSON.parse(fs.readFileSync(FILE, 'utf8') || '[]');
}

function saveTasks(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks));
}

// GET
app.get('/api/tasks', (req, res) => {
  res.json(readTasks());
});

// POST
app.post('/api/tasks', (req, res) => {
  let tasks = readTasks();

  const newTask = {
    id: Date.now(),
    text: req.body.text,
    completed: false
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.json(newTask);
});

// PUT (TOGGLE)
app.put('/api/tasks/:id', (req, res) => {
  let tasks = readTasks();
  const id = parseInt(req.params.id);

  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: req.body.completed === true } : t
  );

  saveTasks(tasks);
  res.json({ success: true });
});

// DELETE
app.delete('/api/tasks/:id', (req, res) => {
  let tasks = readTasks();
  const id = parseInt(req.params.id);

  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);

  res.json({ success: true });
});

app.listen(PORT, () => console.log("Server running on http://localhost:3000"));