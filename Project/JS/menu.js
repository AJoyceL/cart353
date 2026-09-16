// create a star field for the background of the b

"use strict";

// create a star field element and append it to the body
const starfieldCanvas = document.createElement("canvas");
starfieldCanvas.width = window.innerWidth;
starfieldCanvas.height = window.innerHeight;
document.body.appendChild(starfieldCanvas);

// get the 2D rendering context of the star field
const starfieldContext = starfieldCanvas.getContext("2d");

// get the title element and its bounding rectangle
let title = document.querySelector("h1");
const titleRect = title.getBoundingClientRect();

// create an array of stars with random positions and sizes
const stars = [];
const numStars = 200;

// calls the stars array with random star objects
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * starfield.width,
        y: Math.random() * starfield.height,
        radius: Math.random() * 2,
    });
}

// draw the stars on the star field
function drawStars() {
    // clear the star field
    starfieldContext.clearRect(0, 0, starfield.width, starfield.height); 

    // draw each star as a white circle
    for (let star of stars) {
        starfieldContext.beginPath();
        starfieldContext.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starfieldContext.fillStyle = "white";
        starfieldContext.fill();
    }
  
}



// call the drawStars function to render the stars on the star field
drawStars();       