class UI {
    constructor() {
    }

    static downloadCode() {
        saveJSON(cells, 'qrcode.json');
    }
    
    static markFormatBits() {
        if (markAsFormatBit) {
            markAsFormatBit = false;
            button.html("Mark as format bits: off");
        } else {
            markAsFormatBit = true;
            button.html("Mark as format bits: on");
        }
    }
    
    static clearGrid() {
        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                if(!cells[i][j].isFormatBit)
                    cells[i][j].col = 255;
            }
        }
    
        removeItem("QR_Code");
    
    }
    
    static versionSelect() {
    
        let version;
    
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
                version = version1;
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
    
    static applyMask() {

        let mask;

        switch (maskSelect.selected()) {
            case 0:
                mask = (i, j) => (j + i) % 2;
                break;
            case 1:
                mask = (i, j) => (floor(j/2) + floor(i/3)) % 2;
                break;
            case 2:
                mask = (i, j) => i % 3;
                break;
            case 3:
                mask = (i, j) => (((j * i) % 2) + ((j * i) % 3)) % 2;
                break;
            case 4:
                mask = (i, j) => j % 2;
                break;
            case 5:
                mask = (i, j) => ((j * i) % 2) + ((j * i) % 3);
                break;
            case 6:
                mask = (i, j) => (j + i) % 3;
                break;
            case 7:
                mask = (i, j) => (((j + i) % 2) + ((j * i) % 3)) % 2;
                break;
            default:
               mask = (i, j) => 1;
        }

        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                if (mask(i, j) == 0 && !cells[i][j].isFormatBit) {
                    if (cells[i][j].col == 0) cells[i][j].col = 255;
                    else cells[i][j].col = 0;
                }
            }
        }
    }
    
    static saveData() {
        storeItem("QR_Code", cells);
        console.log("file saved");
    }
}