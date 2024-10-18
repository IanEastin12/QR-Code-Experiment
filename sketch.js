let cells = [21];
let dim = 21;
let saveFile;
let defaultFile;
let button;
let saveButton;
let clearButton;
let dropDown;
let markAsFormatBit = false;

function preload() {
   defaultFile = loadJSON('Ver1.json');
}

function setup() {
    createCanvas(420, 420);
    background(0);
    clearStorage();
    button = createButton("Mark as format bits: off");
    saveButton = createButton("Save progress");
    clearButton = createButton("Clear");
    saveFile = getItem("QR_Code");
    dropDown = createSelect();
    dropDown.option("Version 1");

    for (let i = 0; i < dim; i++) {
        cells[i] = [dim];
        for (let j = 0; j < dim; j++) {

            if (saveFile != null) {
                cells[i][j] = new Cell(saveFile[i][j].x, saveFile[i][j].y, saveFile[i][j].w);
                cells[i][j].col = saveFile[i][j].col;
                cells[i][j].isFormatBit = saveFile[i][j].isFormatBit;
            } else {
                cells[i][j] = new Cell(defaultFile[i][j].x, defaultFile[i][j].y, defaultFile[i][j].w);
                cells[i][j].col = defaultFile[i][j].col;
                cells[i][j].isFormatBit = defaultFile[i][j].isFormatBit;
            }

        }
    }

    console.log(cells);
}

function mouseDragged() {
    let cellSize = width/dim;
    let x = floor(mouseX/cellSize);
    let y = floor(mouseY/cellSize);

    if (!(mouseY > width)) {
        cells[x][y].col = 0;

        if (markAsFormatBit) {
            cells[x][y].isFormatBit = true;
        }
    }
}

function mousePressed() {
    let cellSize = width/dim;
    let x = floor(mouseX/cellSize);
    let y = floor(mouseY/cellSize);

    if (!(mouseY > width)) {
        if (cells[x][y].col == 255) {
            cells[x][y].col = 0;
        } else {
            cells[x][y].col = 255;
        }

        if (markAsFormatBit) {
            cells[x][y].isFormatBit = true;
        }
    }
}

function draw() {
    background(0);

    button.mousePressed(markFormatBits);
    saveButton.mousePressed(saveData);
    clearButton.mousePressed(clearGrid);

    switch (dropDown.selected()) {
        case "Version 1":
            versionSelect(21, defaultFile);
            break;
        default:
            versionSelect(21, defaultFile);
    }

    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
        cells[i][j].show();
        }
    }
}

/* function keyPressed() {
    saveJSON(cells, 'qrcode.json');
} */

function Cell(x, y, w) {
    this.col = 255;
    this.x = x;
    this.y = y;
    this.w = w;
    this.isFormatBit = false;
}

Cell.prototype.show = function () {
    fill(this.col);
    square(this.x, this.y, this.w);
}

function markFormatBits() {
    markAsFormatBit = true;
    button.html("Mark as format bits: on");
    console.log("hi");
}

function clearGrid() {
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            if(!cells[i][j].isFormatBit)
                cells[i][j].col = 255;
        }
    }
    console.log("hi");
}

function versionSelect(dimension, version) {
    dim = dimension;
    for (let i = 0; i < dim; i++) {
        cells[i] = [dim];
        for (let j = 0; j < dim; j++) {

            cells[i][j] = new Cell(version[i][j].x, version[i][j].y, version[i][j].w);
            cells[i][j].col = version[i][j].col;
            cells[i][j].isFormatBit = version[i][j].isFormatBit;
        }
    }
}

function saveData() {
    storeItem("QR_Code", cells);
}