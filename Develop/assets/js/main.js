//get current day and date to show in the header
const currentDay = moment().format("dddd MMMM Do, YYYY");
$("#currentDay").text(currentDay);
// get current hour
const currentHour = moment().format("HH");
//get current day
// get time from document
const timeEl = document.querySelectorAll(".time");
//turn timeEl node into an array to check if timeEl is equal to current hour
const timeElArr = Array.apply(null, timeEl);
//define empty array to push tasks into
let tasks = [];

//check to see if each timeEl is equal to, <, > and if it is add a class to the textarea that matches
timeElArr.forEach((time) => {
  if (time.dataset.time === currentHour) {
    $(time).closest(".row").find("textarea").addClass("present");
  } else if (time.dataset.time < currentHour) {
    $(time).closest(".row").find("textarea").addClass("past");
  } else {
    $(time).closest(".row").find("textarea").addClass("future");
  }
});

//when click button- save task
$(".btn").on("click", saveTask);

function saveTask() {
  //create taskObj with task, time, currentDay (to ensure tomorrow we have a clean slate)
  let taskObj = {
    task: $(this).parent().children(".task").val(),
    time: $(this).parent().children(".time").attr("id"),
    day: currentDay,
  };
  // get item from local Storage
  tasks = localStorage.getItem("tasks");
  // if local storage is empty, empty tasks array, push task obj to array and save to local storage
  if (tasks === null) {
    tasks = [];
    tasks.push(taskObj);
    saveToLocalStor();
  }
  //if local storage has items, parse into an array and push the task object to array
  else {
    tasks = JSON.parse(tasks);
    tasks.push(taskObj);
    saveToLocalStor(taskObj);
  }
}

//save tasks function
function saveToLocalStor() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//load tasks on refresh or opening of browser
function loadTasks(tasks) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    return;
  }

  //get task from each task item in tasks array and get time to know which line to add the task text to
  tasks.forEach((task) => {
    //if task was created yesterday, clear localStorage and all data on page. clear all localStorage because tasks should only be created for that day
    if (task.day != currentDay) {
      localStorage.clear();
      window.location.reload();
    }
    //get time slot for task to be made with id matching task.time and create values of task.task for the textarea
    else {
      $("#" + task.time)
        .parent()
        .children(".task")
        .val(task.task);
    }
  });
}

loadTasks();
