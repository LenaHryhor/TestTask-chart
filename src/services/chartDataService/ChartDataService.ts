import {IDataFetcher} from "../../lib/DataFetcher";
import {ChartData, IChartDataService} from "./types";

const FOREX_TESTER_DATA_URL = 'https://beta.forextester.com/data/api/Metadata/bars/chunked';

export class ChartDataService implements IChartDataService {
    private readonly dataFetcher: IDataFetcher;

    constructor(fetcher: IDataFetcher) {
        this.dataFetcher = fetcher;
    }

    public async getChartData(): Promise<ChartData> {
        const params = {
            Broker: 'Advanced',
            Symbol: 'EURUSD',
            Timeframe: '1',
            Start: '57674',
            End: '59113',
            UseMessagePack: 'false'
        };

        return this.dataFetcher.fetchData(FOREX_TESTER_DATA_URL, params);
    }
}