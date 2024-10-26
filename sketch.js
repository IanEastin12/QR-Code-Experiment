let cells = [];
let dim;
let saveFile;
let version1;
let version2;
let version3;
let version4;
let currentVersion;
let button;
let saveButton;
let clearButton;
let downloadButton;
let maskButton;
let maskSelect;
let dropDown;
let markAsFormatBit = false;

function preload() {
   version1 = loadJSON('Ver1.json');
   version2 = loadJSON('Ver2.json');
   version3 = loadJSON('Ver3.json');
   version4 = loadJSON('Ver4.json');
   saveFile = getItem("QR_Code");
}

function setup() {
    createCanvas(420, 420);
    background(0);
    
    initialize();

    if (saveFile != null) dim = saveFile[0].length;
    else dim = version1[0].length;

    for (let i = 0; i < dim; i++) {
        cells[i] = [dim];
        for (let j = 0; j < dim; j++) {

            if (saveFile != null) {
                cells[i][j] = new Cell(saveFile[i][j].x, saveFile[i][j].y, saveFile[i][j].w);
                cells[i][j].col = saveFile[i][j].col;
                cells[i][j].isFormatBit = saveFile[i][j].isFormatBit;
            } else {
                cells[i][j] = new Cell(version1[i][j].x, version1[i][j].y, version1[i][j].w);
                cells[i][j].col = version1[i][j].col;
                cells[i][j].isFormatBit = version1[i][j].isFormatBit;
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

    button.mousePressed(UI.markFormatBits);
    saveButton.mousePressed(UI.saveData);
    downloadButton.mousePressed(UI.downloadCode);
    clearButton.mousePressed(UI.clearGrid);
    maskButton.mousePressed(UI.applyMask);

    if(currentVersion != dropDown.selected()) {
        UI.versionSelect();
    }
    currentVersion = dropDown.selected();

    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
        cells[i][j].show();
        }
    }
}

function initialize() {
    button = createButton("Mark as format bits: off");
    saveButton = createButton("Save progress");
    downloadButton = createButton("Download code");
    clearButton = createButton("Clear");
    maskButton = createButton("Apply mask");
    maskSelect = createSelect();
    maskSelect.option("0", 0);
    maskSelect.option("1", 1);
    maskSelect.option("2", 2);
    maskSelect.option("3", 3);
    maskSelect.option("4", 4);
    maskSelect.option("5", 5);
    maskSelect.option("6", 6);
    maskSelect.option("7", 7);
    dropDown = createSelect();
    dropDown.option("Version 1");
    dropDown.option("Version 2");
    dropDown.option("Version 3");
    dropDown.option("Version 4");
    currentVersion = "Version 1";

}