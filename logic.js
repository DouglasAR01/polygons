var coors = [];
var canvas = document.getElementById("drawArea");
var canvasInfo = canvas.getContext("2d");
canvasInfo.lineWidth = 5;
canvasInfo.strokeStyle = "black";
canvasInfo.fillStyle = "red";

// Position and canvas dimensions info
var offsetX = 0;
var offsetY = 0;
var canvasW = canvas.width;
var canvasH = canvas.height;

const setOffset = () => {
  const dim = canvas.getBoundingClientRect();
  offsetX = dim.left;
  offsetY = dim.top;
};

const closePolygon = () => {
  if (coors.length < 3) return;
  canvasInfo.closePath();
  canvasInfo.stroke();
};

const clearCanvas = () => {
  coors = [];
  canvasInfo.clearRect(0, 0, canvasW, canvasH);
};

const render = () => {
  // Every time the user clicks on the area, the canvas is re-rendered
  canvasInfo.clearRect(0, 0, canvasW, canvasH);
  canvasInfo.beginPath();
  canvasInfo.fillRect(coors[0].x - 0.5, coors[0].y - 0.5, 5, 5);
  canvasInfo.moveTo(coors[0].x, coors[0].y); // There will always be at least one coordinate

  // Draw the other coors
  for (let i = 1; i < coors.length; i++) {
    canvasInfo.fillRect(coors[i].x - 0.5, coors[i].y - 0.5, 5, 5);
    canvasInfo.lineTo(coors[i].x, coors[i].y);
  }
  canvasInfo.stroke();
};

const userClickOnCanvas = (e) => {
  // Stop unexpected behaviours
  e.preventDefault();
  e.stopPropagation();

  mouseX = parseInt(e.clientX - offsetX);
  mouseY = parseInt(e.clientY - offsetY);
  coors.push({
    x: mouseX,
    y: mouseY,
  });
  render();
};

// Recalc where should be the vertex saved at
setOffset();
window.onscroll = (e) => setOffset();
