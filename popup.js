function getTasksFromLocalStorage() {
  let newTaskArr = JSON.parse(localStorage.getItem("newTaskArr") || "[]");
  return newTaskArr;
}

function saveTaskTolocalStorage(tasks) {
  localStorage.setItem("newTaskArr", JSON.stringify(tasks));
}

function setTasks(newTaskArr) {
  let str = "";
  for (i = 0; i < newTaskArr.length; i++) {
      str += "<li>" + newTaskArr[i] + "</li>";
  }
  $("#myOL").html(str);
}

$("#button").click(function () {
  let newTaskArr = getTasksFromLocalStorage();
  if ($("#myInput").val() !== "") {
      var newTask = $("#myInput").val();
      newTaskArr.push(newTask);
      saveTaskTolocalStorage(newTaskArr);
      setTasks(newTaskArr);
      $("#myInput").val("");
      return false;
  }
});
