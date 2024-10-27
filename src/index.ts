import {ChartDataService} from "./services/chartDataService/ChartDataService";
import {Chart} from "./chart/Chart";
import {DataFetcher} from "./lib/DataFetcher";


async function main(): Promise<void> {
    const canvas = document.getElementById('chartCanvas') as HTMLCanvasElement;
    const chartDataService = new ChartDataService(new DataFetcher());

    const data = await chartDataService.getChartData();
    const chart = new Chart(canvas, data);
    chart.renderChart();
}

main().then(() => {
    console.log("done")
});

