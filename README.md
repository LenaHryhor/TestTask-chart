# TestTask-chart

### Task
Forex market historical data is available. It is necessary to download this data and display it in a browser as a chart. An example of the chart can be viewed on any trading platform or in the desktop application ForexTester (downloadable here: forextester.com). The chart should only display bars, the price scale, and dates.

When building and rendering the chart, you can only use TypeScript OOP. Only native canvas may be used for drawing, without any libraries. The chart should be scrollable and zoomable using the mouse (for example, zooming could be click and drag, and scrolling could be done with the mouse wheel). When designing the classes, consider that there might be multiple charts and the historical data they display could differ (although the data structure is the same).

#### Data can be downloaded from links such as: 
https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=EURUSD&Timeframe=1&Start=57674&End=59113&UseMessagePack=false \
https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=USDJPY&Timeframe=1&Start=57674&End=59113&UseMessagePack=false \

#### Comments
The data is stored in JSON format. \
ChunkStart is the time in Unix seconds when the requested data segment begins.\
All subsequent entries are minute bars, where Time indicates the time of the bar and is expressed as the offset in seconds from ChunkStart (in this specific link, the offset is 60 seconds, as the timeframe M1 – one minute is used). 
There might be gaps between bars for various reasons; these gaps should not be shown on the chart. 
Open, High, Low, Close are the prices that each specific bar should be drawn at. 
TickVolume – the trading volume for the current bar (displayed below the chart under each bar; displaying volume can be optional).
