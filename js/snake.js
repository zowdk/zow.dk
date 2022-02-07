const width = 10;
const DIRECTIONS = {
  LEFT: -1,
  RIGHT: 1,
  UP: -width,
  DOWN: width,
};
const snackCalories = {
  "🍎": 1,
  "🧁": 10,
  "🍩": 15,
  "☕️": 25,
};

const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const scoreboard = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = DIRECTIONS.RIGHT;
let snackIndex = 0;
let snackType = "🍎";
let score = 0;
let intervalTime = 700;
let speed = 0.9;
let timerId = 0;

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

function startGame() {
  //remove snake
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  //remove apple
  squares[snackIndex].classList.remove("snack");
  squares[snackIndex].textContent = " ";
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  //   readd new score to browser
  scoreboard.textContent = score;
  direction = DIRECTIONS.RIGHT;
  intervalTime = 700;
  //   readd class snake to new current snake
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  generateSnack();
  timerId = setInterval(move, intervalTime);
}

function fail() {
  console.log("you died");
  return clearInterval(timerId);
}

function move() {
  //   debugger;
  if (direction === DIRECTIONS.LEFT && currentSnake[0] % width === 0) {
    return fail();
  }
  if (direction === DIRECTIONS.RIGHT && currentSnake[0] % width === 9) {
    return fail();
  }

  if (
    direction === DIRECTIONS.DOWN &&
    currentSnake[0] + width > width * width - 1
  ) {
    return fail();
  }
  if (direction === DIRECTIONS.UP && currentSnake[0] - width < 0) {
    return fail();
  }

  if (squares[currentSnake[0] + direction].classList.contains("snake")) {
    return fail();
  }

  //remove last element from current snake array
  const tail = currentSnake.pop();
  //remove styling from last element
  squares[tail].classList.remove("snake");
  //add square in direction we are moving
  currentSnake.unshift(currentSnake[0] + direction);
  //add styling so we can see movement
  squares[currentSnake[0]].classList.add("snake");

  // deal with snake head getting snack
  if (currentSnake[0] === snackIndex) {
    //remove class of apple
    squares[currentSnake[0]].classList.remove("snack");
    squares[currentSnake[0]].textContent = " ";
    //grow snake by adding class of snake
    squares[tail].classList.add("snake");
    //grow snake array
    currentSnake.push(tail);

    // what snack type is it determines new score
    score += snackCalories[snackType];

    //generate new apple
    generateSnack();
    //update score board
    scoreboard.textContent = score;
    //speed up snake
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }
  squares[currentSnake[0]].classList.add("snake");
}

function generateSnack() {
  do {
    snackIndex = Math.floor(Math.random() * squares.length);
  } while (squares[snackIndex].classList.contains("snake"));
  squares[snackIndex].classList.add("snack");

  snackType = "🍎";
  if (Math.random() < 0.2) {
    //randomly, ~20% of the time
    snackType = "🧁";
  }

  squares[snackIndex].textContent = snackType;
}
generateSnack();

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
startBtn.addEventListener("click", startGame);
