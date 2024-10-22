let cells = [];
let dim;
let saveFile;
let defaultFile;
let version1;
let version2;
let version3;
let version4;
let currentVersion;
let button;
let saveButton;
let clearButton;
let downloadButton;
let dropDown;
let markAsFormatBit = false;

function preload() {
   defaultFile = loadJSON('Ver1.json');
   version1 = loadJSON('Ver1.json');
   version2 = loadJSON('Ver2.json');
   version3 = loadJSON('Ver3.json');
   version4 = loadJSON('Ver4.json');
   saveFile = getItem("QR_Code");
}

function setup() {
    createCanvas(420, 420);
    background(0);
    
    button = createButton("Mark as format bits: off");
    saveButton = createButton("Save progress");
    downloadButton = createButton("Download code");
    clearButton = createButton("Clear");
    dropDown = createSelect();
    dropDown.option("Version 1");
    dropDown.option("Version 2");
    dropDown.option("Version 3");
    dropDown.option("Version 4");
    currentVersion = "Version 1";

    if (saveFile != null) dim = saveFile.length;
    else dim = defaultFile.length;

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
    downloadButton.mousePressed(downloadCode);
    clearButton.mousePressed(clearGrid);

    if(currentVersion != dropDown.selected()) {
        versionSelect();
    }
    currentVersion = dropDown.selected();

    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
        cells[i][j].show();
        }
    }
}

function downloadCode() {
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
    if (markAsFormatBit) {
        markAsFormatBit = false;
        button.html("Mark as format bits: off");
    } else {
        markAsFormatBit = true;
        button.html("Mark as format bits: on");
    }
}

function clearGrid() {
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            if(!cells[i][j].isFormatBit)
                cells[i][j].col = 255;
        }
    }

    removeItem("QR_Code");

}

function versionSelect() {

    let version;
    console.log("version select triggered")

    switch (dropDown.selected()) {
        case "Version 1":
            dim = 21;
            version = version1;
            break;
        case "Version 2":
            dim = 25;
            version = version2;
            break;
        case "Version 3":
            dim = 29;
            version = version3;
            break;
        case "Version 4":
            dim = 33;
            version = version4;
            break;
        default:
            dim = 21;
            version = defaultFile;
    }

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
    console.log("file saved");
}