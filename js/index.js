//game Constants and Variables
const foodSound = new Audio("../assets/snake-food.mp3");
const gameOverSound = new Audio("../assets/snake-die.mp3");
const snakeMove = new Audio("../assets/snake-move.wav");
const bgMusic = new Audio("../assets/bg-music.mp3");
let inputDir = { x: 0, y: 0 };
let interval = 5;
let prevtime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 10, y: 5 };
let score = 0;
let hiscore = localStorage.getItem("hiscore");

//Gamne starts
bgMusic.play();
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  highScore.innerHTML = "HiScore: " + hiscore;
}

//Game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - prevtime) / 1000 < 1 / interval) {
    return;
  }
  prevtime = ctime;
  gameEngine();
}

function isCollide(snake) {
  //if you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  //if You bump into wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  //Part 1 :Updating the snake variable and food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    bgMusic.pause();
    alert("Game Over. Press any key to play over");
    inputDir = { x: 0, y: 0 };
    snakeArr = [{ x: 13, y: 15 }];
    bgMusic.play();
    score = 0;
    gameScore.innerHTML = "Score : 0";
  }
  //if snakes eat food, update score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score++;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      highScore.innerHTML = "HiScore: " + hiscoreval;
    }
    gameScore.innerHTML = "Score : " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //Part 2 :Render the snake and food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // start the game
  snakeMove.play();

  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
