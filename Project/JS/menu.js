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

// create a light object with random position from the stars array
const light = {
    x: Math.random() * starfieldCanvas.width,
    y: Math.random() * starfieldCanvas.height,
    intensity: 1.2
}

// draw a light source as a yellow circle
//ref: https://www.desarrollolibre.net/blog/javascript/how-to-create-a-light-point-with-javascript-and-canvas
const drawLight = () => {
    // draw a light source as a yellow circle
    const imageData = starfieldContext.createImageData(starfieldCanvas.width, starfieldCanvas.height);
    const pixels = imageData.data;

    for (let x = 0; x < starfieldCanvas.width; x++) {
        for (let y = 0; y < starfieldCanvas.height; y++) {
            const dx = x - light.x;
            const dy = y - light.y;
            const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            const density = light.intensity / d;
            const index = (y * starfieldCanvas.width + x) * 4;
            pixels[index] = 255; // red
            pixels[index + 1] = 255; // green
            pixels[index + 2] = 0; // blue
            pixels[index + 3] = density * 255; // alpha
        }
    }

    starfieldContext.putImageData(imageData, 0, 0);
}

// calls the stars array with random star objects
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * starfieldCanvas.width,
        y: Math.random() * starfieldCanvas.height,
        radius: Math.random() * 2,
    });
}

// draw the stars on the star field
function drawStars() {
    // clear the star field
    starfieldContext.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height); 

    // draw each star as a white circle
    for (let star of stars) {
        starfieldContext.beginPath();
        starfieldContext.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starfieldContext.fillStyle = "white";
        starfieldContext.shadowColor = "#e27ab7";
        starfieldContext.shadowBlur = 8;
        starfieldContext.fill();
    }
  
}




// call the drawStars function to render the stars on the star field
drawStars();      