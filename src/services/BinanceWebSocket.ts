interface KlineData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

class BinanceWebSocket {
  private ws: WebSocket | null = null;
  private symbol: string;
  private interval: string;
  private onDataCallback: ((data: KlineData[]) => void) | null = null;
  private dataBuffer: KlineData[] = [];

  constructor(symbol: string = 'btcusdt', interval: string = '1m') {
    this.symbol = symbol.toLowerCase();
    this.interval = interval;
  }

  private async fetchHistoricalData(): Promise<KlineData[]> {
    try {
      const endTime = Date.now();
      const startTime = endTime - (60 * 60 * 1000); // 1 hour ago

      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${this.symbol.toUpperCase()}&interval=${this.interval}&startTime=${startTime}&endTime=${endTime}&limit=30`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch historical data');
      }

      const data = await response.json();
      return data.map((kline: any[]) => ({
        timestamp: kline[0],
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4])
      }));
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }
  }

  public async connect() {
    // First fetch historical data
    const historicalData = await this.fetchHistoricalData();
    this.dataBuffer = historicalData;

    // Notify listeners with historical data
    if (this.onDataCallback) {
      this.onDataCallback([...this.dataBuffer]);
    }

    // Then connect to WebSocket for real-time updates
    const wsUrl = `wss://stream.binance.com:9443/ws/${this.symbol}@kline_${this.interval}`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.k) {
        const klineData: KlineData = {
          timestamp: data.k.t,
          open: parseFloat(data.k.o),
          high: parseFloat(data.k.h),
          low: parseFloat(data.k.l),
          close: parseFloat(data.k.c)
        };

        // Update or add new data point
        const existingIndex = this.dataBuffer.findIndex(d => d.timestamp === klineData.timestamp);
        if (existingIndex >= 0) {
          this.dataBuffer[existingIndex] = klineData;
        } else {
          this.dataBuffer.push(klineData);
        }

        // Keep only last 30 data points
        if (this.dataBuffer.length > 30) {
          this.dataBuffer = this.dataBuffer.slice(-30);
        }

        // Notify listeners
        if (this.onDataCallback) {
          this.onDataCallback([...this.dataBuffer]);
        }
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket Disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connect(), 5000);
    };
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  public onData(callback: (data: KlineData[]) => void) {
    this.onDataCallback = callback;
  }
}

export default BinanceWebSocket;