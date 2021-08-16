//get current day and date to show in the header
const currentDay = moment().format("dddd MMMM Do, YYYY");
$(".jumbotron").append(currentDay);
// get current hour
const currentHour = "11";
// moment().format("HH");
// get time from document
const timeEl = document.querySelectorAll(".time");
//turn timeEl node into an array to check if timeEl is equal to current hour
const timeElArr = Array.apply(null, timeEl);
//define empty array to push tasks into
let tasks = [];

//check to see if each timeEl is equal to, <, > and if it is add a class to the input that matches
timeElArr.forEach((time) => {
  if (time.dataset.time === currentHour) {
    $(time).closest(".row").find("input").addClass("present");
  } else if (time.dataset.time < currentHour) {
    $(time).closest(".row").find("input").addClass("past");
  } else {
    $(time).closest(".row").find("input").addClass("future");
  }
});

//when click button- save task
$(".btn").on("click", saveTask);

function saveTask() {
  let taskToSave = {
    task: $(this).parent().parent().children(".task").val(),
    time: $(this).parent().parent().children(".time").attr("id"),
  };

  tasks = localStorage.getItem("tasks");

  if (tasks === null) {
    tasks = [];
    tasks.push(taskToSave);
    saveToLocalStor();
  } else {
    tasks = JSON.parse(tasks);
    tasks.push(taskToSave);
    saveToLocalStor(taskToSave);
  }
}

//save tasks function
function saveToLocalStor() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//load tasks
function loadTasks(tasks) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    return;
  }

  tasks.forEach((task) => {
    $("#" + task.time)
      .parent()
      .children(".task")
      .val(task.task);
  });
}

loadTasks();
