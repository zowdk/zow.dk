const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentSnake = [0, 1, 2];
let direction = 1;
const width = 10;
let appleIndex = 0;
let timerId = setInterval(move, 1000);

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
  if (
    //if hits bottom
    (currentSnake[0] + width * width >= 100 && direction === width) ||
    //if hits right
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    //if hits left
    (currentSnake[0] % width === 0 % direction) === -1 ||
    //if hits top
    (currentSnake[0] - width < 0 && direction === -width) ||
    //if snake drives into self
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(timerId);

  //remove last element from current snake array
  const tail = currentSnake.pop();
  //remove styling from last element
  squares[tail].classList.remove("snake");
  //add square in direction we are moving
  currentSnake.unshift(currentSnake[0] + direction);
  //add styling so we can see movement

  // deal with snake head getting apple
  if (currentSnake[0]) {
    //remove class of apple
    //grow snake by adding class of snake
    //grow snake array
    //generate new apple
    //add one pt to score
    //speed up snake
  }

  squares[currentSnake[0]].classList.add("snake");
}
move();

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
  squares[appleIndex].textContent = "🍎";
}
generateApples();

// controls
function control(e) {
  if (e.keyCode === 39) {
    console.log("right pressed");
    direction = 1;
  } else if (e.keyCode === 38) {
    console.log("up pressed");
    direction = -width;
  } else if (e.keyCode === 37) {
    console.log("left pressed");
    direction = -1;
  } else if (e.keyCode === 40) {
    console.log("down pressed");
    direction = +width;
  }
}
document.addEventListener("keydown", control);
