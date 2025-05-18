import React, { useRef } from 'react';
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

  // 新增：Y軸相關計算提升到組件作用域，供下方標籤渲染使用
  const gridLines = 5;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const minPrice = data.length ? Math.min(...data.map(d => d.low)) : 0;
  const maxPrice = data.length ? Math.max(...data.map(d => d.high)) : 1;
  const priceRange = maxPrice - minPrice || 1;

  const drawChart = (g: PIXI.Graphics) => {
    if (!data.length) return;

    g.clear();
    
    // Draw background
    g.rect(0, 0, width, height)
      .fill(0x232326);

    // Draw grid lines
    for (let i = 0; i <= gridLines; i++) {
      const y = 40 + ((height - 80) / gridLines) * i;
      g.moveTo(40, y)
        .lineTo(width - 40, y)
        .stroke({ width: 1, color: 0x444444, alpha: 0.7 });
    }

    // Calculate scales
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
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
      const x = padding + index * (chartWidth / data.length);
      const isBull = candle.close >= candle.open;
      const color = isBull ? 0x4caf50 : 0xf44336;

      // Draw candle body
      const bodyHeight = Math.max(2, Math.abs(candle.close - candle.open) * priceScale);
      const bodyY = height - padding - (Math.max(candle.open, candle.close) - minPrice) * priceScale;
      
      g.rect(x, bodyY, chartWidth / data.length, bodyHeight)
        .fill({ color, alpha: 0.9 })
        .stroke({ width: 1, color });

      // Draw wicks
      const wickX = x + (chartWidth / data.length) * 0.5;
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
      {/* Y軸價格標籤 */}
      {
        Array.from({ length: gridLines + 1 }).map((_, i) => {
          const y = padding + (chartHeight / gridLines) * i;
          const price = maxPrice - (priceRange / gridLines) * i;
          return (
            <pixiText
              key={i}
              text={price.toFixed(2)}
              x={8}
              y={y - 10}
              style={{
                fill: '#cccccc',
                fontSize: 14,
                fontFamily: 'monospace',
                align: 'right',
              }}
            />
          );
        })
      }
      
      {
        Array.from({ length: data.length }).map((_, i) => {
          const x = padding + i * (chartWidth / data.length);
          const date = new Date(data[i].timestamp);
          const labelStr = `${date.getMonth() + 1}/${date.getDate()}`;
          return (
            <pixiText 
              key={i} 
              text={labelStr} 
              x={x} 
              y={height - padding + 5} 
              style={{
                fill: '#cccccc',
                fontSize: 14,
                fontFamily: 'monospace',
                align: 'center',
              }}
            />
          );
        })
      }
    </pixiContainer>
  );
};

export default Chart;