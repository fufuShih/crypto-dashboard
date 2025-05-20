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

  // 增加左右padding空間
  const padding = 60;
  const gridLines = 5;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const minPrice = data.length ? Math.min(...data.map(d => d.low)) : 0;
  const maxPrice = data.length ? Math.max(...data.map(d => d.high)) : 1;
  const priceRange = maxPrice - minPrice || 1;

  const drawChart = (graphic: PIXI.Graphics) => {
    if (!data.length) return;

    graphic.clear();
    
    // Draw background
    graphic.rect(0, 0, width, height)
      .fill(0x232326);

    // Draw grid lines
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + ((height - padding * 2) / gridLines) * i;
      graphic.moveTo(padding, y)
        .lineTo(width - padding, y)
        .stroke({ width: 1, color: 0x444444, alpha: 0.7 });
    }

    // Calculate scales
    const priceScale = chartHeight / priceRange;

    // Draw price scale (Y axis)
    graphic.moveTo(padding, padding)
      .lineTo(padding, height - padding)
      .lineTo(width - padding, height - padding)
      .stroke({ width: 1, color: 0xcccccc });

    // Draw candlesticks
    data.forEach((candle, index) => {
      const x = padding + index * (chartWidth / data.length);
      const isBull = candle.close >= candle.open;
      const GREEN = 0x4caf50;
      const RED = 0xf44336;
      const color = isBull ? GREEN : RED;

      // Draw candle body
      const bodyHeight = Math.max(2, Math.abs(candle.close - candle.open) * priceScale);
      const bodyY = height - padding - (Math.max(candle.open, candle.close) - minPrice) * priceScale;
      
      graphic.rect(x, bodyY, chartWidth / data.length, bodyHeight)
        .fill({ color, alpha: 0.9 })
        .stroke({ width: 1, color });

      // Draw wicks
      const wickX = x + (chartWidth / data.length) * 0.5;
      const highY = height - padding - (candle.high - minPrice) * priceScale;
      const lowY = height - padding - (candle.low - minPrice) * priceScale;
      
      graphic.moveTo(wickX, highY)
        .lineTo(wickX, lowY)
        .stroke({ width: 1, color });
    });
  };

  return (
    <pixiContainer>
      <pixiGraphics draw={drawChart} ref={graphicsRef} />
      
      {/* X軸時間標籤 - 修改為每隔N個數據點顯示一個 */}
      {
        data.map((item, i) => {
          // 計算要顯示的標籤數量 (最多顯示8個，避免擁擠)
          const maxLabels = 8;
          const step = Math.max(1, Math.floor(data.length / maxLabels));
          
          // 只顯示每隔step個數據點的標籤，或第一個和最後一個
          if (i % step !== 0 && i !== 0 && i !== data.length - 1) return null;
          
          const x = padding + i * (chartWidth / data.length) + (chartWidth / data.length) / 2;
          const date = new Date(item.timestamp);
          const labelStr = `${date.getMonth() + 1}/${date.getDate()}`;
          
          return (
            <pixiText 
              key={i} 
              text={labelStr} 
              x={x} 
              y={height - padding + 5} 
              style={{
                fill: '#cccccc',
                fontSize: 12,
                fontFamily: 'monospace',
                align: 'center',
              }}
            />
          );
        })
      }

      {/* Y軸價格標籤 - 放在最後確保最高z-index */}
      {
        Array.from({ length: gridLines + 1 }).map((_, i) => {
          const y = padding + (chartHeight / gridLines) * i;
          const price = maxPrice - (priceRange / gridLines) * i;
          return (
            <pixiText
              key={i}
              text={price.toFixed(2)}
              x={padding - 45}
              y={y - 7}
              style={{
                fill: '#cccccc',
                fontSize: 13,
                fontFamily: 'monospace',
                align: 'right',
              }}
            />
          );
        })
      }
    </pixiContainer>
  );
};

export default Chart;