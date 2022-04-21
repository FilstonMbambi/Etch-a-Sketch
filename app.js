// Etch-a-Sketch

// DOM elements
let grid = document.querySelector(".grid");
let color = document.querySelector("#color");
let sizeDisplay = document.querySelector("#sizeDisplay");
let gridSize = document.querySelector("#sizeSlider");
const eraser = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");
const rainbow = document.querySelector("#rainbow");
const newGridBtn = document.querySelector("#new");

// Create a 16 x 16 grid of square divs
function createGrid(squareNum) {
    for (let i = 0; i < squareNum * squareNum; i++) {
        let cell = document.createElement("div");
        grid.style.gridTemplateColumns = `repeat(${squareNum}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${squareNum}, 1fr)`;
        cell.className = "cell";
        grid.appendChild(cell);
    }   
}
gridSize.onmousemove = () => {sizeDisplay.textContent = `${gridSize.value} x ${gridSize.value}`};
createGrid(gridSize.value);

// Enable user to draw on the grid and change the pen's color
let cellDivs = document.querySelectorAll(".cell");
let cells = Array.from(cellDivs);

function draw() {
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", () => {
            cell.style.background = color.value;
        })
    })
}
draw();

// allow a random selection of colors
rainbow.addEventListener("click", () => {
    rainbow.classList.toggle("active");
    cells.forEach(cell => {
        cell.addEventListener("mouseover", () => {
            if (rainbow.classList.contains("active")) {
                let randSelect = Math.floor(Math.random() * 0xFFFFFF);
                let randColor = randSelect.toString(16).padStart(6,"0").toUpperCase();
                cell.style.background = `#${randColor}`;
            }
        }) 
    });
})

// create an eraser function
function erase() {
    eraser.classList.toggle("active");
    if (eraser.classList.contains("active")) {
        cells.forEach((cell) => {
            cell.addEventListener("mouseover", () => {
                cell.style.background = "#f2e4ea";
            })
        })
    } else draw()  
}
eraser.addEventListener("click", erase);

// clears the grid
clearBtn.addEventListener("click", () =>{
    cells.forEach((cell) => {
        cell.style.background = "#f2e4ea";
    })
})
// enable to user to change the grid size
newGridBtn.addEventListener("click",() => {
    grid.innerHTML = "";
    createGrid(gridSize.value);
    // New cell array for new grid
    let cellDivs = document.querySelectorAll(".cell");
    let cells = Array.from(cellDivs);
    cells.forEach(cell => {
        cell.addEventListener("mouseover", () => {
            cell.style.background = color.value;
            if (eraser.classList.contains("active")) {
                cell.style.background = "#f2e4ea";
            } else if (rainbow.classList.contains("active")) {
                let randSelect = Math.floor(Math.random() * 0xFFFFFF);
                let randColor = randSelect.toString(16).padStart(6,"0").toUpperCase();
                cell.style.background = `#${randColor}`;
            }
        })
        clearBtn.addEventListener("click", () =>{
                cell.style.background = "#f2e4ea";
        })
    });
})
