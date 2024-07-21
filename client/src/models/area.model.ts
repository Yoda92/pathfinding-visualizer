export class Area {
    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;

    constructor(startX: number, startY: number, endX: number, endY: number) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    public getStartX(): number {
        return this.startX;
    }

    public getStartY(): number {
        return this.startY;  
    }

    public getEndX(): number {
        return this.endX;
    }

    public getEndY(): number {
        return this.endY;
    }

    public getWidth(): number {
        return this.endX - this.startX;
    }

    public getHeight(): number {
        return this.endY- this.startY;
    }
}