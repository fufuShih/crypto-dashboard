import React, { useRef, useEffect, useState } from 'react';
import { Container, Graphics, Text, Sprite } from 'pixi.js';
import { extend, useApplication, Application } from '@pixi/react';
import Chart from '../components/Chart';
import BinanceWebSocket from '../services/BinanceWebSocket';

extend({
    Container,
    Sprite,
    Graphics,
    Text
});

const ChartContainer = () => {
  const [chartData, setChartData] = useState<Array<{
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }>>([]);
  const [latestPrice, setLatestPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: height - 100 }); // Subtract some height for padding
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    const ws = new BinanceWebSocket('btcusdt', '1m');

    ws.onData((data) => {
      setChartData(data);
      if (data.length > 0) {
        const latest = data[data.length - 1];
        setLatestPrice(latest.close);

        // Calculate price change percentage
        if (data.length > 1) {
          const previous = data[data.length - 2];
          const change = ((latest.close - previous.close) / previous.close) * 100;
          setPriceChange(change);
        }
      }
      setIsLoading(false);
    });

    const initWebSocket = async () => {
      try {
        await ws.connect();
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
        setIsLoading(false);
      }
    };

    initWebSocket();

    return () => {
      ws.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-lg p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black">Bitcoin</h1>
          <p className="text-black opacity-60">BTC/USD</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-black">
            ${latestPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>

          <p className={`font-medium ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-[calc(100%-80px)] overflow-hidden">
        {dimensions.width > 0 && (
          <Application
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor={0xffffff}
            antialias={true}
          >
            <pixiContainer width={dimensions.width} height={dimensions.height}>
              {isLoading ? (
                <pixiText
                  text="Loading..."
                  x={dimensions.width / 2}
                  y={dimensions.height / 2}
                  anchor={0.5}
                  style={{
                    fill: '#cccccc',
                    fontSize: 20,
                    fontFamily: 'monospace',
                    align: 'center',
                  }}
                />
              ) : (
                <Chart
                  data={chartData}
                  width={dimensions.width}
                  height={dimensions.height}
                />
              )}
            </pixiContainer>
          </Application>
        )}
      </div>
    </div>
  );
};

export default ChartContainer;