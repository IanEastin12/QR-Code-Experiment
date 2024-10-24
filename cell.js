class Cell {

    constructor (x, y, w) {
        this.col = 255;
        this.x = x;
        this.y = y;
        this.w = w;
        this.isFormatBit = false;
    }

    show() {
        fill(this.col);
        square(this.x, this.y, this.w);
    }

}