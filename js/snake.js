const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentSnake = [0, 1, 2];
let direction = 1;

function createGrid() {
  //create 100 of these elements with a for loop
  for (i = 0; i < 100; i++) {
    //create elements
    const square = document.createElement("div");
    //add styling to the element
    square.classList.add("square");
    //put the element into grid
    grid.appendChild(square);
    //push it into a new squares array
    squares.push(square);
  }
}
createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function move() {
  //remove last element from current snake array
  const tail = currentSnake.pop();
  //remove styling from last element
  squares[tail].classList.remove("snake");
  //add square in direction we are moving
  currentSnake.unshift(currentSnake[0] + directrion);
  //add styling so we can see movement
  squares[currentSnake[0]].classList.add("snake");
}
move();

let timerId = setInterval(move, 1000);
