import {ChartData, ChunkBar} from "../services/chartDataService/types";
import {ChartView} from "./ChartView";
import dayjs from "dayjs";

export interface IChart {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    scale: number;
    view: Rect;
}

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Chart implements IChart {
    private readonly canvas: HTMLCanvasElement;
    private readonly bars: ChunkBar[];
    private readonly highestPrice: number;
    private readonly lowestPrice: number;

    private currentView: ChartView | null = null;
    private isDragging: boolean = false;
    private lastX: number = -1;

    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    scale: number;
    view: Rect;

    constructor(canvas: HTMLCanvasElement, chartData: ChartData) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.width = canvas.width;
        this.height = canvas.height;
        this.view = {
            x: 20,
            y: 40,
            width: this.width - 100,
            height: this.height - 100
        }
        this.scale = 1;

        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));

        this.bars = chartData.flatMap(chunk => {
            return chunk.Bars.map((bar) => ({
                ...bar,
                Time: dayjs(chunk.ChunkStart * 1000)
                    .add(bar.Time, 'seconds')
                    .valueOf(),
            }));
        });
        this.highestPrice = Math.max(...this.bars.map((bar) => bar.High));
        this.lowestPrice = Math.min(...this.bars.map((bar) => bar.Low));
    }

    private handleMouseDown(event: MouseEvent): void {
        this.isDragging = true;
        this.lastX = event.clientX;
        event.preventDefault();
    }

    private handleMouseUp(event: MouseEvent): void {
        this.isDragging = false;
    }

    private handleMouseMove(event: MouseEvent): void {
        if (this.isDragging) {
            const deltaX = event.clientX - this.lastX;

            const view = this.currentView;
            if (view) {
                if (deltaX > 0)
                    this.draw(view.startIndex + 2);
                else
                    this.draw(view.startIndex - 2);
            }

            event.preventDefault();
        }
    }

    private clear() {
        this.ctx.fillStyle = "#fcfcfc";
        this.ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.drawScale(this.view.x, this.view.y - 15);
    }

    private drawScale(x: number, y: number): void {
        this.ctx.fillStyle = "black";
        this.ctx.font = "16px Arial";
        this.ctx.fillText(`Scale: ${this.scale.toFixed(2)}`, x, y);
    }

    private draw(startIndex: number) {
        if (startIndex < 0 || startIndex > this.bars.length)
            return;

        this.clear();

        this.currentView = new ChartView(this, startIndex, 10, this.bars, this.highestPrice, this.lowestPrice);
        this.currentView.draw();
    }

    renderChart() {
        this.draw(0);
    }
}
