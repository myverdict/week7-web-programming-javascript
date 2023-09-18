// debug: just checking if JS page is connected to the right page
// alert("is this working?");

// find the reference to the canvas element on the document
let canvas = document.querySelector("#canvas");
// create a drawing context that does the drawing on the canvas
let context = canvas.getContext("2d");

// find the reference to the input text element on the document
let input = document.querySelector("#image-text");
// disable the text box until the image is loaded as an image may take time to load
input.disabled = true;

let image = new Image(); // create a new image object
image.src = "mn-dam.jpg"; // set the image source

// when images are ready & loaded, they emit an event 'load'
// when the 'load' event occurs we can listen to it with an addEventListener
image.addEventListener("load", function () {
  // drawImage(image, destination x, destination y)
  context.drawImage(image, 0, 0);
  input.disabled = false;
});

// add an event listener to the input text box
input.addEventListener("input", function () {
  let text = this.value; // get the text input value

  context.fillStyle = "purple"; // set the filled text color
  context.font = "50px Courier"; // set the text font

  // redraw the image so that the text is not overwritten
  // --> drawImage(image, destination x, destination y)
  context.drawImage(image, 0, 0);

  // draw the text on the picture --> fillText(text, x, y)
  context.fillText(text, 30, 100);
});
