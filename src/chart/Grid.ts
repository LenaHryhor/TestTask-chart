import {Rect} from "./Chart";

export class Grid {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly view: Rect;
    readonly verticalLines: number;
    readonly horizontalLines: number;
    private readonly color: string;

    constructor(ctx: CanvasRenderingContext2D, view: Rect, verticalLines: number, horizontalLines: number, color: string = "#ddd") {
        this.ctx = ctx;
        this.view = view;
        this.color = color;
        this.verticalLines = verticalLines;
        this.horizontalLines = horizontalLines;
    }

    draw() {
        const ctx = this.ctx;
        const view = this.view;
        const verticalSpacing = (view.width / this.verticalLines);
        const horizontalSpacing = (view.height / this.horizontalLines);

        ctx.beginPath();
        ctx.setLineDash([5, 5]);

        // vertical
        for (let i = 0; i <= this.verticalLines; i++) {
            const x = view.x + i * verticalSpacing;
            ctx.moveTo(x, view.y);
            ctx.lineTo(x, view.y + view.height);
        }

        // horizontal
        for (let i = 0; i <= this.horizontalLines; i++) {
            const y = view.y + i * horizontalSpacing;
            ctx.moveTo(view.x, y);
            ctx.lineTo(view.x + view.width, y);
        }

        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.setLineDash([]); // Reset to solid lines for other drawings
    }




}