var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
// var paused = false;
// document.body.style.overflow = 'hidden';
// document.addEventListener('wheel', function(e) { if (!paused) e.preventDefault(); }, { passive: false });
// document.addEventListener('touchmove', function(e) { if (!paused) e.preventDefault(); }, { passive: false });

// the canvas width & height, snake x & y, and the apple x & y, all need to be a multiples of the grid size in order for collision detection to work
// (e.g. 16 * 32 = 512)
var grid = 16;
var count = 0;
var score = 0;

var snake = {
  x: 256,
  y: 256,

  // snake velocity. moves one grid length every frame in either the x or y direction
  dx: grid,
  dy: 0,

  // keep track of all grids the snake body occupies
  cells: [],

  // length of the snake. grows when eating an apple
  maxCells: 4
};
var apples = [
  {x: 192, y: 256},
  {x: 320, y: 256}
];

// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function loop() {
  requestAnimationFrame(loop);

  // slow game loop to 15 fps instead of 60 (60/15 = 4)
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  // move snake by it's velocity
  snake.x += snake.dx;
  snake.y += snake.dy;

  // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({x: snake.x, y: snake.y});

  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // draw apples
  context.fillStyle = 'red';
  apples.forEach(function(apple) {
    context.fillRect(apple.x, apple.y, grid-1, grid-1);
  });

  // draw snake one cell at a time
  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {

    // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    context.fillRect(cell.x, cell.y, grid-1, grid-1);

    // check if snake ate any apple
    apples.forEach(function(apple, appleIndex) {
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        score++;

        // canvas is 512x512 which is 32x32 grids
        apples[appleIndex].x = getRandomInt(0, 32) * grid;
        apples[appleIndex].y = getRandomInt(0, 32) * grid;
      }
    });

    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {

      // snake occupies same space as a body part. reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 256;
        snake.y = 256;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        score = 0;

        apples[0].x = getRandomInt(0, 32) * grid;
        apples[0].y = getRandomInt(0, 32) * grid;
        apples[1].x = getRandomInt(0, 32) * grid;
        apples[1].y = getRandomInt(0, 32) * grid;
      }
    }
  });

  // draw score
  context.fillStyle = 'white';
  context.font = '16px Arial';
  context.fillText('Score: ' + score, 10, 20);
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
  // prevent snake from backtracking on itself by checking that it's
  // not already moving on the same axis (pressing left while moving
  // left won't do anything, and pressing right while moving left
  // shouldn't let you collide with your own body)

  // left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// start the game
requestAnimationFrame(loop);
