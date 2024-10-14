let cells = [21];
let dim = 21;
let saveFile;
let button;
let markAsFormatBit = false;

/* function preload() {
   //saveFile = loadJSON('https://amber-amelie-28.tiiny.site/qrcode.json');
   saveFile = loadJSON('qrcode.json');
} */

function setup() {
    createCanvas(420, 420);
    background(0);
    button = createButton("Mark as format bits: off");

    for (let i = 0; i < dim; i++) {
        cells[i] = [dim];
        for (let j = 0; j < dim; j++) {

            if (saveFile == !null) {
                cells[i][j] = new Cell(saveFile[i][j].x, saveFile[i][j].y, saveFile[i][j].w);
                cells[i][j].col = saveFile[i][j].col;
                cells[i][j].isFormatBit = saveFile[i][j].isFormatBit;
            } else {
                cells[i][j] = new Cell(i * width/dim, j * width/dim, width/dim);
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

    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
        cells[i][j].show();
        }
    }
}

function keyPressed() {
    saveJSON(cells, 'qrcode.json');
}

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