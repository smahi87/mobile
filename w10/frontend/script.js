const API_URL = 'http://localhost:3000/api/tasks';

document.addEventListener('DOMContentLoaded', loadTasks);

// LOAD TASKS
function loadTasks() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', API_URL);
  xhr.onload = function () {
    const tasks = JSON.parse(xhr.responseText || "[]");
    const list = document.getElementById('task-list');
    list.innerHTML = "";
    tasks.forEach(addTaskToDOM);
  };
  xhr.send();
}

// ADD TASK
function addTask() {
  const input = document.getElementById('new-task');
  const text = input.value.trim();
  if (!text) return;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', API_URL);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    input.value = "";
    loadTasks();   // refresh instead of manual add
  };
  xhr.send(JSON.stringify({ text, completed: false }));
}

// ADD TO DOM
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span onclick="toggleTask(${task.id}, ${!task.completed})"
          style="${task.completed ? 'text-decoration:line-through' : ''}">
      ${task.text}
    </span>
    <button onclick="deleteTask(${task.id})">❌</button>
  `;
  document.getElementById('task-list').appendChild(li);
}

// TOGGLE TASK
function toggleTask(id, completed) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', API_URL + '/' + id);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = loadTasks;
  xhr.send(JSON.stringify({ completed }));
}

// DELETE TASK
function deleteTask(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', API_URL + '/' + id);
  xhr.onload = loadTasks;

  xhr.send();
}



