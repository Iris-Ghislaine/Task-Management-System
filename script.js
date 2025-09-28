// Sample tasks
let tasks = [
  {
    id: 1,
    name: "Finish assignment",
    dueDate: "2025-09-28",
    status: "pending",
  },
  { id: 2, name: "Doing Roundery", dueDate: "2025-09-29", status: "completed" },
  {
    id: 3,
    name: "Prepare presentation",
    dueDate: "2025-10-2",
    status: "pending",
  },
  { id: 4, name: "Hiking", dueDate: "2025-10-5", status: "pending" },
  {
    id: 5,
    name: "Meeting with my teammates",
    dueDate: "2025-09-22",
    status: "completed",
  },
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

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter((task) => {
    if (currentFilter === "pending") return task.status === "pending";
    if (currentFilter === "completed") return task.status === "completed";
    return true;
  });
 // Sort tasks by date
  filteredTasks.sort((a, b) => {
    if (currentSort === "date-asc")
      return new Date(a.dueDate) - new Date(b.dueDate);
    return new Date(b.dueDate) - new Date(a.dueDate);
  });
// task icons
  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className =
      "bg-white p-4 shadow-md rounded-md flex justify-between items-center";

    li.innerHTML = `
      <div>
        <p class="font-medium ${
          task.status === "completed" ? "line-through text-green-600" : ""
        }">
          ${task.name}
        </p>
        <small class="text-gray-500">Due: ${task.dueDate}</small>
      </div>
      <div class="flex gap-2">
        <button onclick="toggleTask(${task.id})"
          class="px-2 py-1 ${
            task.status === "completed" ? "text-yellow-500" : "text-green-500"
          } text-white rounded">
          ${task.status === "completed" ? `<svg fill="#EAB308" width="24" height="24" viewBox="-0.5 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-undo"><path d='M5.308 7.612l1.352-.923a.981.981 0 0 1 1.372.27 1.008 1.008 0 0 1-.266 1.388l-3.277 2.237a.981.981 0 0 1-1.372-.27L.907 6.998a1.007 1.007 0 0 1 .266-1.389.981.981 0 0 1 1.372.27l.839 1.259C4.6 3.01 8.38 0 12.855 0c5.458 0 9.882 4.477 9.882 10s-4.424 10-9.882 10a.994.994 0 0 1-.988-1c0-.552.443-1 .988-1 4.366 0 7.906-3.582 7.906-8s-3.54-8-7.906-8C9.311 2 6.312 4.36 5.308 7.612z' /></svg>` : `                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>`}
        </button>
        <button onclick="editTask(${task.id})"
          class="px-2 py-1 text-blue-500 rounded"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
</svg></button>
        <button onclick="deleteTask(${task.id})"
          class="px-2 py-1 text-red-500  rounded"><svg width="24" height="24" viewBox="0 0 1024 1024" class="icon" xmlns="http://www.w3.org/2000/svg"><path fill="#F44336" d="M160 256H96a32 32 0 010-64h256V95.936a32 32 0 0132-32h256a32 32 0 0132 32V192h256a32 32 0 110 64h-64v672a32 32 0 01-32 32H192a32 32 0 01-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32zm192 0a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32z"/></svg></button>
      </div>
    `;
    taskList.appendChild(li);
  });
  // Save and update dashboard
  saveTasks();
  updateDashboard();
}
// Add task
taskForm.addEventListener("submit", (e) => {
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
    status: "pending",
  };

  tasks.push(newTask);
  taskNameInput.value = "";
  taskDateInput.value = "";
  renderTasks();
});
// Toggle status
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, status: task.status === "pending" ? "completed" : "pending" } : task
  );
  renderTasks();
}
// Delete task
function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
  }
}
// Edit task
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newName = prompt("Edit task name:", task.name);
  const newDate = prompt("Edit due date (YYYY-MM-DD):", task.dueDate);

  if (newName) task.name = newName;
  if (newDate) task.dueDate = newDate;
  renderTasks();
}