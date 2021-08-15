//get current day and date to show in the header
const currentDay = moment().format('dddd MMMM Do, YYYY');
$(".jumbotron").append(currentDay);
// get current hour
const currentHour = "11";
// moment().format("HH");
// get time from document
const timeEl = document.querySelectorAll(".time");
//turn timeEl node into an array to check if timeEl is equal to current hour
const timeElArr = Array.apply(null, timeEl);


//check to see if each timeEl is equal to, <, > and if it is add a class to the input that matches
timeElArr.forEach(time => {
    if (time.dataset.time === currentHour) {
       $(time).closest(".row").find("input").addClass("present");
    }
    else if (time.dataset.time < currentHour) {
        $(time).closest(".row").find("input").addClass("past");
    } else {
        $(time).closest(".row").find("input").addClass("future");
    }
});

$(".btn").on("click", function() {
   $(event.target).closest(".row").find("input[name='task']").value = "hello";
})

// //load tasks 
// function loadTasks() {
//     tasks = JSON.parse(localStorage.getItem("tasks"));

//     //if nothing in localStorage push tasks
//     tasks.push()
// }


//save buttons 
const saveBtn = document.querySelectorAll(".btn");
//turn saveBtn node list to array
const saveBtnArr = Array.apply(null, saveBtn);
saveBtnArr.forEach(element => {
    addEventListener("click", function() {
        if (element === event.target) {
            let taskToSave = $(element).closest(".row").find("input");
            console.log(taskToSave);
            // localStorage.setItem("savedTasks", JSON.stringify(taskToSave));
        }
    })
})

