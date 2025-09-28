// Sample tasks
let tasks = [
  { id: 1, name: "Finish assignment", dueDate: "2025-09-28", status: "pending" },
  { id: 2, name: "Doing Roundery", dueDate: "2025-09-29", status: "completed" },
  { id: 3, name: "Prepare presentation", dueDate: "2025-10-2", status: "pending" },
  { id: 4, name: "Hiking", dueDate: "2025-10-5", status: "pending" },
  { id: 5, name: "Meeting with my teammates", dueDate: "2025-09-22", status: "completed" }
];
let currentFilter = "all";
let currentSort = "date-asc";
// DOM Elements
const taskForm = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const taskDateInput = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");
const sortSelect = document.getElementById("sortSelect");

// Add task
taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = taskNameInput.value.trim();
  const date = taskDateInput.value;

  if (name === "") {
    alert("Task name cannot be empty!");
    return;
  }

  const newTask = {
    id: Date.now(),
    name: name,
    dueDate: date || "No date",
    status: "pending"
  };

  tasks.push(newTask);
  taskNameInput.value = "";
  taskDateInput.value = "";
  renderTasks();
});
// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === "pending") return task.status === "pending";
    if (currentFilter === "completed") return task.status === "completed";
    return true;
  });

  // Sort tasks by date
  filteredTasks.sort((a, b) => {
    if (currentSort === "date-asc") return new Date(a.dueDate) - new Date(b.dueDate);
    return new Date(b.dueDate) - new Date(a.dueDate);
  });

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "bg-white p-4 shadow-md rounded-md flex justify-between items-center";

    li.innerHTML = `
      <div>
        <p class="font-medium ${task.status === "completed" ? "line-through text-green-600" : ""}">
          ${task.name}
        </p>
        <small class="text-gray-500">Due: ${task.dueDate}</small>
      </div>
      <div class="flex gap-2">
        <button onclick="toggleTask(${task.id})"
          class="px-2 py-1 ${task.status === "completed" ? "bg-yellow-500" : "bg-green-500"} text-white rounded">
          ${task.status === "completed" ? "Undo" : "Done"}
        </button>
        <button onclick="editTask(${task.id})"
          class="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
        <button onclick="deleteTask(${task.id})"
          class="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  // Save and update dashboard
  saveTasks();
  updateDashboard();
}