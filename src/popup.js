// create task and display

function createTask(value) {
    let newtask = { task: value, id: Date.now()};
    let newTaskHtml = `<li id=${newtask.id}>${newtask.task}<i id=${newtask.id}></i></li>`;
    $('#list').append(newTaskHtml);
    let tasks = getTasksFromLocalStorage();
    let allTasks = [...tasks, newtask];
    saveTaskTolocalStorage(allTasks);
  }
  
  
  //  get data from localStorage
  
  function getTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return tasks;
  }
  
  
  //  store data to localStorage
  
  function saveTaskTolocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  
  // add event when called
  
  $('#button').click(function () {
    createTask($('#name').val());
  });
  
  