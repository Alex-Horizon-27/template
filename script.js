// Get the canvas and the context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Verify the engine is running
console.log("Game Engine Ready!");
// Draw a placeholder for students (kept as header text)
ctx.font = "20px Arial";
ctx.textAlign = "center";

// Paddles (white rectangles) - left controlled by W/S, right by Arrow Up/Down
const leftPaddle = { x: 0, y: 175, w: 5, h: 40, speed: 4 };
const rightPaddle = { x: canvas.width - 5, y: 175, w: 5, h: 40, speed: 4 };

// Ball
const ball = { x: canvas.width / 2, y: canvas.height / 2, w: 5, h: 5, dx: 2, dy: 1 };

// Key state
const keys = {};
window.addEventListener("keydown", (e) => { keys[e.key] = true; });
window.addEventListener("keyup", (e) => { keys[e.key] = false; });

function update() {
	// Left paddle: W / S
	if (keys['w'] || keys['W']) leftPaddle.y -= leftPaddle.speed;
	if (keys['s'] || keys['S']) leftPaddle.y += leftPaddle.speed;

	// Right paddle: ArrowUp / ArrowDown
	if (keys['ArrowUp']) rightPaddle.y -= rightPaddle.speed;
	if (keys['ArrowDown']) rightPaddle.y += rightPaddle.speed;

	// Keep paddles inside canvas
	leftPaddle.y = Math.max(0, Math.min(canvas.height - leftPaddle.h, leftPaddle.y));
	rightPaddle.y = Math.max(0, Math.min(canvas.height - rightPaddle.h, rightPaddle.y));

	// Move ball
	ball.x += ball.dx;
	ball.y += ball.dy;

	// Bounce off top and bottom
	if (ball.y <= 0 || ball.y >= canvas.height - ball.h) ball.dy = -ball.dy;

	// Bounce off left and right (for now, reset if out)
	if (ball.x <= 0 || ball.x >= canvas.width - ball.w) ball.dx = -ball.dx;

}

function draw() {
	// clear background
	ctx.fillStyle = "#222";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// header text
	ctx.fillStyle = "#05ffff";
	ctx.fillText("Code your Game here!", canvas.width / 2, 24);

	// draw paddles
	ctx.fillStyle = "white";
	ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.w, leftPaddle.h);
	ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h);

	// draw ball
    ctx.fillStyle = "white";
    ctx.fillRect(ball.x, ball.y, ball.w, ball.h)

    // instructions
	ctx.fillStyle = "#fff";
	ctx.font = "12px Arial";
	ctx.textAlign = "left";
	ctx.fillText("Left: W/S    Right: Up arrow/Down arrow", 8, canvas.height - 8);
}

function loop() {
	update();
	draw();
	requestAnimationFrame(loop);
}
loop();