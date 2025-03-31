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


// To enable touch if using smartphones
let ongoingTouches = [];

grid.addEventListener('touchstart', handleTouchStart);
grid.addEventListener('touchmove', handleTouchMove);
grid.addEventListener('touchend', handleTouchEnd);
grid.addEventListener('touchcancel', handleTouchCancel);

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
    gridElement.addEventListener('touchmove', changeColorTouch)
    gridElement.addEventListener('touchstart', changeColorTouch)
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

function changeColorTouch(e) {
    e.preventDefault();
    const rect = grid.getBoundingClientRect();
    
    for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;
        
        if (touchX >= 0 && touchX <= rect.width && touchY >= 0 && touchY <= rect.height) {
            const gridSize = currentSize;
            const cellSize = rect.width / gridSize;
            const cellX = Math.floor(touchX / cellSize);
            const cellY = Math.floor(touchY / cellSize);
            const cellIndex = cellY * gridSize + cellX;
            
            const cells = grid.querySelectorAll('.grid-element');
            if (cellIndex >= 0 && cellIndex < cells.length) {
                const cell = cells[cellIndex];
                if (currentMode === 'color') {
                    cell.style.backgroundColor = currentColor;
                } else if (currentMode === 'eraser') {
                    cell.style.backgroundColor = '#faf8f6';
                }
            }
        }
    }
}

function handleTouchStart(e) {
    changeColorTouch(e);
}

function handleTouchMove(e) {
    changeColorTouch(e);
}

function handleTouchEnd(e) {

}

function handleTouchCancel(e) {

}

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
