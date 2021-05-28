function createTask(value) {
  let newtask = { task: value, id: Date.now(), active: true };
  let newTaskHtml = `<li id=${newtask.id}>${newtask.task}<i class="fa fa-times close" id=${newtask.id}></i></li>`;

  $("#myOL").append(newTaskHtml);

  let tasks = getTasksFromLocalStorage();
  let allTasks = [...tasks, newtask];

  saveTaskTolocalStorage(allTasks);
}

function getTasksFromLocalStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  return tasks;
}

function saveTaskTolocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

$("#button").click(function () {
  createTask($("#myInput").val());
});
