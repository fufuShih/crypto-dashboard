import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

interface PriceData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ChartProps {
  data: PriceData[];
  width?: number;
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ 
  data = [], 
  width = 800, 
  height = 400 
}) => {
  const graphicsRef = useRef<PIXI.Graphics>(null);

  const drawChart = (g: PIXI.Graphics) => {
    if (!data.length) return;

    g.clear();
    g.setStrokeStyle({ width: 1, color: 0x000000 });

    // Calculate scales
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const minPrice = Math.min(...data.map(d => d.low));
    const maxPrice = Math.max(...data.map(d => d.high));
    const priceRange = maxPrice - minPrice;

    const candleWidth = chartWidth / data.length;
    const priceScale = chartHeight / priceRange;

    // Draw price scale
    g.setStrokeStyle({ width: 1, color: 0xcccccc });
    g.moveTo(padding, padding);
    g.lineTo(padding, height - padding);
    g.lineTo(width - padding, height - padding);

    // Draw candlesticks
    data.forEach((candle, index) => {
      const x = padding + index * candleWidth;
      const y = height - padding - (candle.close - minPrice) * priceScale;
      
      // Draw candle body
      g.lineStyle(1, candle.close >= candle.open ? 0x00ff00 : 0xff0000);
      g.beginFill(candle.close >= candle.open ? 0x00ff00 : 0xff0000);
      g.drawRect(
        x + candleWidth * 0.1,
        height - padding - (Math.max(candle.open, candle.close) - minPrice) * priceScale,
        candleWidth * 0.8,
        Math.abs(candle.close - candle.open) * priceScale
      );
      g.endFill();

      // Draw wicks
      g.lineStyle(1, candle.close >= candle.open ? 0x00ff00 : 0xff0000);
      g.moveTo(x + candleWidth * 0.5, height - padding - (candle.high - minPrice) * priceScale);
      g.lineTo(x + candleWidth * 0.5, height - padding - (candle.low - minPrice) * priceScale);
    });
  };

  return (
    <pixiContainer>
    <pixiGraphics draw={drawChart} ref={graphicsRef} />
    </pixiContainer>
  );
};

export default Chart;