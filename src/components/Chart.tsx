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
    
    // Draw background
    g.rect(0, 0, width, height)
      .fill(0x232326);

    // Draw grid lines
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = 40 + ((height - 80) / gridLines) * i;
      g.moveTo(40, y)
        .lineTo(width - 40, y)
        .stroke({ width: 1, color: 0x444444, alpha: 0.7 });
    }

    // Calculate scales
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const minPrice = Math.min(...data.map(d => d.low));
    const maxPrice = Math.max(...data.map(d => d.high));
    const priceRange = maxPrice - minPrice;

    // Candle spacing
    const candleGap = 2;
    const candleWidth = (chartWidth / data.length) - candleGap;
    const priceScale = chartHeight / priceRange;

    // Draw price scale (Y axis)
    g.moveTo(padding, padding)
      .lineTo(padding, height - padding)
      .lineTo(width - padding, height - padding)
      .stroke({ width: 1, color: 0xcccccc });

    // Draw price labels background
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i;
      g.rect(0, y - 10, padding, 20)
        .fill(0x232326);
    }

    // Draw candlesticks
    data.forEach((candle, index) => {
      const x = padding + index * (candleWidth + candleGap);
      const isBull = candle.close >= candle.open;
      const color = isBull ? 0x4caf50 : 0xf44336;

      // Draw candle body
      const bodyHeight = Math.max(2, Math.abs(candle.close - candle.open) * priceScale);
      const bodyY = height - padding - (Math.max(candle.open, candle.close) - minPrice) * priceScale;
      
      g.rect(x, bodyY, candleWidth, bodyHeight)
        .fill({ color, alpha: 0.9 })
        .stroke({ width: 1, color });

      // Draw wicks
      const wickX = x + candleWidth * 0.5;
      const highY = height - padding - (candle.high - minPrice) * priceScale;
      const lowY = height - padding - (candle.low - minPrice) * priceScale;
      
      g.moveTo(wickX, highY)
        .lineTo(wickX, lowY)
        .stroke({ width: 1, color });
    });
  };

  return (
    <pixiContainer>
      <pixiGraphics draw={drawChart} ref={graphicsRef} />
    </pixiContainer>
  );
};

export default Chart;