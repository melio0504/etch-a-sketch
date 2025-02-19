const colorPicker = document.querySelector('#colorPicker');
const colorBtn = document.querySelector('#color-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const clearBtn = document.querySelector('#clear-btn');
const sizeValue = document.querySelector('#sizeValue');
const sizeSlider = document.querySelector('#size-slider');
const grid = document.querySelector('#grid');

const defaultColor = '#333333';
const defaultMode = 'color';
const defaultSize = 16;

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function setCurrentColor(newColor) {
  currentColor = newColor
};

function setCurrentMode(newMode) {
  activateButton(newMode)
  currentMode = newMode
};

function setCurrentSize(newSize) {
  currentSize = newSize
};

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
  setCurrentSize(value)
  updateSizeValue(value)
  reloadGrid()
};

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`
};

function reloadGrid() {
  clearGrid()
  setupGrid(currentSize)
};

function clearGrid() {
  grid.innerHTML = ''
};

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div')
    gridElement.classList.add('grid-element')
    gridElement.addEventListener('mouseover', changeColor)
    gridElement.addEventListener('mousedown', changeColor)
    grid.appendChild(gridElement)
  }
};

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#faf8f6'
    }
};

function activateButton(newMode) {
    if (currentMode === 'color') {
        colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
    }

     if (newMode === 'color') {
        colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
    }
};

window.onload = () => {
  setupGrid(defaultSize)
  activateButton(defaultMode)
};
