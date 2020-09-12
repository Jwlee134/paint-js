const canvas = document.querySelector(`#jsCanvas`),
  range = document.querySelector(`.range`),
  paint = document.querySelector(`#paint`),
  save = document.querySelector(`#save`),
  clear = document.querySelector(`#clear`),
  color = document.querySelectorAll(`.color`);

const ctx = canvas.getContext("2d");
ctx.fillStyle = `white`;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 2.5;
ctx.strokeStyle = `#2c2c2c`;
ctx.fillStyle = `#2c2c2c`;

let painting = false;
let fill = false;

function clearPainting() {
  ctx.fillStyle = `white`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveImg() {
  const imgValue = canvas.toDataURL();
  var link = document.createElement("a");
  link.download = `Good Job!`;
  link.href = imgValue;
  document.body.appendChild(link);
  link.click();
}

function fillBackground() {
  if (fill === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function changePaintFill(event) {
  if (fill === false) {
    event.target.innerText = `FILL`;
    fill = true;
  } else {
    event.target.innerText = `PAINT`;
    fill = false;
  }
}

function changeLineWidth(event) {
  const lineWidth = event.target.value;
  ctx.lineWidth = lineWidth;
}

function changeColor(event) {
  const colorStyle = event.target.style.backgroundColor;
  ctx.strokeStyle = colorStyle;
  ctx.fillStyle = colorStyle;
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function mouseMove(event) {
  const x = event.offsetX,
    y = event.offsetY;
  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function init() {
  canvas.addEventListener(`mousemove`, mouseMove);
  canvas.addEventListener(`mousedown`, startPainting);
  canvas.addEventListener(`mouseup`, stopPainting);
  range.addEventListener(`change`, changeLineWidth);
  paint.addEventListener(`click`, changePaintFill);
  canvas.addEventListener(`click`, fillBackground);
  save.addEventListener(`click`, saveImg);
  clear.addEventListener(`click`, clearPainting);
  canvas.addEventListener(`contextmenu`, (e) => {
    e.preventDefault();
  });
  color.forEach(function (color) {
    color.addEventListener(`click`, changeColor);
  });
}
init();
