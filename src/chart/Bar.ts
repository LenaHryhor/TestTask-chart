import {ChunkBar} from "../services/chartDataService/types";
import {Rect} from "./Chart";

export  class Bar {
    public readonly data;
    private readonly ctx;
    private readonly barColor: string;
    private readonly width: number;
    private readonly view: Rect;

    public readonly x: number;

    constructor(context: CanvasRenderingContext2D,
                view: Rect,
                x: number,
                width: number, // width * scale;
                barData: ChunkBar) {
        this.x = x;
        this.width = width;
        this.data = barData;
        this.ctx = context;
        this.view = view;
        this.barColor = this.data.Close > this.data.Open ? "green" : "red";
    }

    draw(highestPrice: number, lowestPrice: number, scale: number) {
        const viewHeight = this.view.height;

        const pixelPerPrice =  (this.view.height / (highestPrice - lowestPrice)) * scale;
        const yHigh = viewHeight - (this.data.High - lowestPrice) * pixelPerPrice;
        const yLow = viewHeight - (this.data.Low - lowestPrice) * pixelPerPrice;

        // Draw high-low line
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + this.width / 2, this.view.y + yHigh);
        this.ctx.lineTo(this.x + this.width / 2, this.view.y + yLow);
        this.ctx.strokeStyle = this.barColor;
        this.ctx.stroke();

        const yOpen = viewHeight - (this.data.Open - lowestPrice) * pixelPerPrice;
        const yClose = viewHeight - (this.data.Close - lowestPrice) * pixelPerPrice;

        // Draw open-close rectangle
        this.ctx.fillStyle = this.barColor;
        this.ctx.fillRect(
            this.x,
            this.view.y + Math.min(yOpen, yClose),
            this.width,
            Math.abs(yClose - yOpen)
        );
    }
}