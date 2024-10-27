export interface ChunkBar {
    Time: number;
    Open: number;
    High: number;
    Low: number;
    Close: number;
    TickVolume: number;
}

export interface ChartChunk {
    ChunkStart: number;
    Bars: ChunkBar[];
}

export type ChartData = Array<ChartChunk>

export interface IChartDataService {
    getChartData(): Promise<ChartData>;
}