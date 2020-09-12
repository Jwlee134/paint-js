const canvas = document.querySelector(`#jsCanvas`),
  ctx = canvas.getContext("2d"),
  colors = document.querySelectorAll(`.jsColor`),
  range = document.querySelector(`#jsRange`),
  fill = document.querySelector(`#jsFill`),
  save = document.querySelector(`#jsSave`);

const INITIAL_COLOR = `#2c2c2c`;

canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = `white`;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX,
    y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleCanvasClick() {
  if (filling === false) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (canvas) {
  canvas.addEventListener(`mousemove`, onMouseMove);
  canvas.addEventListener(`mousedown`, startPainting);
  canvas.addEventListener(`mouseup`, stopPainting);
  canvas.addEventListener(`mouseleave`, stopPainting);
  canvas.addEventListener(`click`, handleCanvasClick);
  canvas.addEventListener(`contextmenu`, handleCM);
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

colors.forEach(function (color) {
  color.addEventListener(`click`, changeColor);
});

function handleRange(event) {
  const lineWidth = event.target.value;
  ctx.lineWidth = lineWidth;
}

if (range) {
  range.addEventListener(`change`, handleRange);
}

function fillBackground() {
  if (filling === false) {
    filling = true;
    fill.innerText = `Paint`;
  } else {
    filling = false;
    fill.innerText = `Fill`;
  }
}

if (fill) {
  fill.addEventListener(`click`, fillBackground);
}

function handleCM(event) {
  event.preventDefault();
}

if (save) {
  save.addEventListener(`click`, saveImg);
}

function saveImg() {
  const img = canvas.toDataURL();
  const link = document.createElement(`a`);
  link.href = img;
  link.download = `PaintJs`;
  link.click();
}
