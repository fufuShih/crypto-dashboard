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
    // 畫背景
    g.beginFill(0x232326);
    g.drawRect(0, 0, width, height);
    g.endFill();

    // 畫網格線
    g.lineStyle(1, 0x444444, 0.7);
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = 40 + ((height - 80) / gridLines) * i;
      g.moveTo(40, y);
      g.lineTo(width - 40, y);
    }

    // Calculate scales
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const minPrice = Math.min(...data.map(d => d.low));
    const maxPrice = Math.max(...data.map(d => d.high));
    const priceRange = maxPrice - minPrice;

    // 蠟燭圖間距
    const candleGap = 2;
    const candleWidth = (chartWidth / data.length) - candleGap;
    const priceScale = chartHeight / priceRange;

    // Draw price scale (Y 軸)
    g.lineStyle(1, 0xcccccc);
    g.moveTo(padding, padding);
    g.lineTo(padding, height - padding);
    g.lineTo(width - padding, height - padding);

    // 畫價格標籤
    g.lineStyle(0);
    g.beginFill(0x232326);
    for (let i = 0; i <= gridLines; i++) {
      const price = maxPrice - (priceRange / gridLines) * i;
      const y = padding + (chartHeight / gridLines) * i;
      g.drawRect(0, y - 10, padding, 20);
      g.endFill();
      g.lineStyle(0);
      g.beginFill(0x232326);
      g.endFill();
      g.lineStyle(0);
      // 這裡可用 PIXI.Text 實現文字，暫略
    }

    // Draw candlesticks
    data.forEach((candle, index) => {
      const x = padding + index * (candleWidth + candleGap);
      const y = height - padding - (candle.close - minPrice) * priceScale;
      const isBull = candle.close >= candle.open;
      const color = isBull ? 0x4caf50 : 0xf44336; // 柔和綠/紅

      // Draw candle body
      g.lineStyle(1, color);
      g.beginFill(color, 0.9);
      g.drawRect(
        x,
        height - padding - (Math.max(candle.open, candle.close) - minPrice) * priceScale,
        candleWidth,
        Math.max(2, Math.abs(candle.close - candle.open) * priceScale)
      );
      g.endFill();

      // Draw wicks
      g.lineStyle(1, color);
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