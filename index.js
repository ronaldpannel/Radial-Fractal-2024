/**@type{HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const randomBtn = document.getElementById("randomBtn");
const resetBtn = document.getElementById("resetBtn");
const spreadSlider = document.getElementById("spreadSlider");
const spreadLabel = document.getElementById("spreadLabel");
const sideSlider = document.getElementById("sideSlider");
const sideLabel = document.getElementById("sideLabel");
const widthSlider = document.getElementById("widthSlider");
const widthLabel = document.getElementById("widthLabel");

ctx.fillStyle = "blue";
ctx.lineCap = "round";
ctx.shadowColor = "rgba(0,0,0,0.7";
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;

//setup
let maxSteps = 4;
let step = 0;
let branches = 2;

let size =
  canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
let spread = 0.5;
let scale = 0.5;
let sides = 5;
let color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
let lineWidth = Math.floor(Math.random() * 10 + 10);

ctx.save();
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(1, 1);
ctx.rotate(0);
ctx.restore();

function drawBranch(step) {
  if (step > maxSteps) return;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();
  for (let i = 0; i < branches; i++) {
    ctx.save();
    ctx.translate(size - (size / branches) * i, 0);
    ctx.rotate(spread);
    ctx.scale(scale, scale);
    drawBranch(step + 1);
    ctx.restore();

    ctx.save();
    ctx.translate(size - (size / branches) * i, 0);
    ctx.rotate(-spread);
    ctx.scale(scale, scale);
    drawBranch(step + 1);
    ctx.restore();
  }
}

function drawFractal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, 1);
  ctx.rotate(0);
  for (let i = 0; i < sides; i++) {
    ctx.rotate((Math.PI * 2) / sides);
    drawBranch(0);
  }
  ctx.restore();
  randomBtn.style.backgroundColor = color;
}

drawFractal();

function randomize() {
  lineWidth = Math.floor(Math.random() * 20 + 10);
  spread = Math.random() * 2.9 + 0.1;
  scale = Math.random() * 0.2 + 0.4;
  sides = Math.floor(Math.random() * 7 + 2);
  color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  drawFractal();
}

function resetFractal() {
  lineWidth = 15;
  spread = 0.7;
  scale = 0.5;
  sides = 5;
  color = "hsl(290, 100%, 50%)";
}

function updateSliders() {
  spreadSlider.value = spread;
  spreadLabel.innerText = `Spread: ${Number(spread).toFixed(2)}`;
  sideSlider.value = sides;
  sideLabel.innerText = `Sides: ${Number(sides)}`;
  widthSlider.value = lineWidth;
  widthLabel.innerText = `Line Width: ${Number(lineWidth)}`;
}

randomBtn.addEventListener("click", (e) => {
  updateSliders();
  randomize();
});
resetBtn.addEventListener("click", (e) => {
  resetFractal();
  updateSliders();
  drawFractal();
});

spreadSlider.addEventListener("change", (e) => {
  spread = e.target.value;
  updateSliders();
  drawFractal();
});
sideSlider.addEventListener("change", (e) => {
  sides = e.target.value;
  updateSliders();
  drawFractal();
});
widthSlider.addEventListener("change", (e) => {
  lineWidth = e.target.value;
  updateSliders();
  drawFractal();
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}

//animate();

// window.addEventListener("resize", (e) => {
//   canvas.width = e.target.innerWidth;
//   canvas.height = e.target.innerHeight;
// });
