import {Bar} from "./Bar";
import {Grid} from "./Grid";
import {ChunkBar} from "../services/chartDataService/types";
import dayjs from "dayjs";
import {IChart} from "./Chart";

export class ChartView {
    private readonly chart: IChart;
    private readonly bars: Bar[];
    private readonly grid: Grid;
    public readonly startIndex: number;
    private readonly barWidth: number;
    private readonly highestPrice: number;
    private readonly lowestPrice: number;

    constructor(chart: IChart,
                startIndex: number,
                barWidth: number,
                data: ChunkBar[],
                highestPrice: number,
                lowestPrice: number) {
        this.startIndex = startIndex;
        this.barWidth = barWidth;
        this.chart = chart;
        this.highestPrice = highestPrice;
        this.lowestPrice = lowestPrice;

        this.grid = this.createGrid();

        const endIndex = startIndex + chart.view.width / (barWidth + 2);
        this.bars = data.slice(startIndex, endIndex).map((bar, index) => {
            const x = chart.view.x + index * (this.barWidth + 2);
            return new Bar(this.chart.ctx, this.chart.view, x, barWidth, bar);
        });

    }

    private createGrid(): Grid {
        const verticalLines = 10 * this.chart.scale;
        const horizontalLines = 10 * this.chart.scale;

        return new Grid(this.chart.ctx, this.chart.view, verticalLines, horizontalLines);
    }

    draw() {
        this.grid.draw();

        this.bars.forEach(bar => bar.draw(this.highestPrice, this.lowestPrice, this.chart.scale));

        this.drawDateLabels();
        this.drawPriceScale();
    }

    private drawDateLabels(): void {
        const maxLabelWidth = 100;
        const ctx = this.chart.ctx;
        ctx.fillStyle = "#000";
        ctx.font = "12px Arial";

        let lastDrawnLabelX = -Infinity;
        for (let i = 0; i < this.bars.length; i++) {
            const bar = this.bars[i];

            if (lastDrawnLabelX + maxLabelWidth < bar.x) {
                const dateLabel = dayjs(bar.data.Time).format("DD MMM HH:mm");
                ctx.fillText(dateLabel, bar.x, this.chart.view.y + this.chart.view.height + 20);
                lastDrawnLabelX = bar.x;
            }
        }
    }

    private drawPriceScale(): void {
        const scaledPriceLevels = Math.max(3, Math.min(10, Math.floor(10 / this.chart.scale)));

        const priceRange = this.highestPrice - this.lowestPrice;
        const priceStep = priceRange / scaledPriceLevels;

        const view = this.chart.view;
        for (let i = 0; i <= scaledPriceLevels; i++) {
            const price = this.lowestPrice + priceStep * i;
            const y = view.height - ((price - this.lowestPrice) / priceRange) * view.height;

            this.chart.ctx.fillText(`${price.toFixed(5)}`, view.x + view.width + 10, view.y + y);
        }
    }

}