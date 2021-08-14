const currentDay = moment().format('dddd MMMM Do YYYY');
console.log(currentDay);

$(".jumbotron").append(currentDay);