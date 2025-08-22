// Elements
const showFormBtn = document.getElementById("showFormBtn");
const backBtn = document.getElementById("backBtn");
const formSection = document.getElementById("formSection");
const taskContainer = document.getElementById("taskContainer");
const taskForm = document.getElementById("taskForm");

const taskName = document.getElementById("taskName");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");

const taskNameError = document.getElementById("taskNameError");
const priorityError = document.getElementById("priorityError");
const dueDateError = document.getElementById("dueDateError");

const taskTableBody = document.getElementById("taskTableBody");
const completedTasksList = document.getElementById("completedTasksList");

let tasks = [];
let completedTasks = [];

// Show form
showFormBtn.addEventListener("click", () => {
  formSection.style.display = "block";
  taskContainer.style.display = "none";
});

// Hide form
backBtn.addEventListener("click", () => {
  formSection.style.display = "none";
  taskContainer.style.display = "flex";
});

// Form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let valid = true;

  // Validation
  if (taskName.value.trim() === "") {
    taskNameError.textContent = "TaskName is required!";
    valid = false;
  } else {
    taskNameError.textContent = "";
  }

  if (priority.value === "") {
    priorityError.textContent = "Priority is required!";
    valid = false;
  } else {
    priorityError.textContent = "";
  }

  if (dueDate.value === "") {
    dueDateError.textContent = "DueDate is required!";
    valid = false;
  } else {
    dueDateError.textContent = "";
  }

  if (!valid) return;

  // Add new task
  const newTask = {
    id: Date.now(),
    name: taskName.value,
    priority: priority.value,
    dueDate: dueDate.value
  };
  tasks.push(newTask);

  renderTasks();

  // Reset form
  taskForm.reset();
  formSection.style.display = "none";
  taskContainer.style.display = "flex";
});

// Render tasks
function renderTasks() {
  taskTableBody.innerHTML = "";
  if (tasks.length === 0) {
    taskTableBody.innerHTML = `<tr><td colspan="4">No tasks added yet.</td></tr>`;
    return;
  }

  tasks.forEach(task => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" data-id="${task.id}"></td>
      <td>${task.name}</td>
      <td>${task.priority}</td>
      <td>${task.dueDate}</td>
    `;
    taskTableBody.appendChild(row);

    row.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) {
        completeTask(task.id);
      }
    });
  });
}

// Complete task
function completeTask(id) {
  const task = tasks.find(t => t.id === id);
  tasks = tasks.filter(t => t.id !== id);
  completedTasks.push(task);

  renderTasks();
  renderCompletedTasks();
}

// Render completed tasks
function renderCompletedTasks() {
  completedTasksList.innerHTML = "";
  if (completedTasks.length === 0) {
    completedTasksList.innerHTML = "<li>No tasks completed yet.</li>";
    return;
  }

  completedTasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.name} (Priority: ${task.priority}, Due: ${task.dueDate})`;
    completedTasksList.appendChild(li);
  });
}
