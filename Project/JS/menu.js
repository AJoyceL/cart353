// create a star field for the background of the canvas

"use strict";

// create a canvas element and append it to the body
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// get the 2D rendering context of the canvas
const ctx = canvas.getContext("2d");

// create an array of stars with random positions and sizes
const stars = [];
const numStars = 200;

// calls the stars array with random star objects
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
    });
}

// draw the stars on the canvas
function drawStars() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // draw each star as a white circle
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }
  
}

// call the drawStars function to render the stars on the canvas
drawStars();       