// Get the canvas and the context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Verify the engine is running
console.log("Game Engine Ready!");

// Draw a placeholder for students
ctx.fillStyle = "#05ffff";
ctx.font = "20px Arial";
ctx.textAlign = "center";
ctx.fillText("Code your Game here!", canvas.width/2, canvas.height/2);

// DAY 1 TASK:
// 1. Change the background color above.
// 2. Can you make a square appear?
// 3. Ask AI: "How do I draw a red rectangle on a JS canvas?"