import React, { useRef, useEffect } from 'react';
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

  // Add left and right padding space
  const padding = {
    left: 60,
    right: 40,
    top: 40,
    bottom: 40
  };

  const gridLines = 5;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const minPrice = data.length ? Math.min(...data.map(d => d.low)) : 0;
  const maxPrice = data.length ? Math.max(...data.map(d => d.high)) : 1;
  const priceRange = maxPrice - minPrice || 1;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const drawChart = (graphic: PIXI.Graphics) => {
    if (!data.length) return;

    graphic.clear();

    // Draw background
    graphic.rect(0, 0, width, height)
      .fill(0xffffff);

    // Draw grid lines
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartHeight / gridLines) * i;
      graphic.moveTo(padding.left, y)
        .lineTo(width - padding.right, y)
        .stroke({ width: 1, color: 0xE5E7EB, alpha: 0.7 });
    }

    // Calculate scales
    const priceScale = chartHeight / priceRange;

    // Draw price scale (Y axis)
    graphic.moveTo(padding.left, padding.top)
      .lineTo(padding.left, height - padding.bottom)
      .lineTo(width - padding.right, height - padding.bottom)
      .stroke({ width: 1, color: 0xE5E7EB });

    // Draw candlesticks
    const candleWidth = Math.max(1, (chartWidth / data.length) * 0.8);
    const candleSpacing = chartWidth / data.length;

    data.forEach((candle, index) => {
      const x = padding.left + index * candleSpacing + (candleSpacing - candleWidth) / 2;
      const isBull = candle.close >= candle.open;
      const GREEN = 0x10B981;  // Tailwind green-500
      const RED = 0xEF4444;    // Tailwind red-500
      const color = isBull ? GREEN : RED;

      // Draw candle body
      const bodyHeight = Math.max(2, Math.abs(candle.close - candle.open) * priceScale);
      const bodyY = height - padding.bottom - (Math.max(candle.open, candle.close) - minPrice) * priceScale;

      graphic.rect(x, bodyY, candleWidth, bodyHeight)
        .fill({ color, alpha: 0.9 })
        .stroke({ width: 1, color });

      // Draw wicks
      const wickX = x + candleWidth / 2;
      const highY = height - padding.bottom - (candle.high - minPrice) * priceScale;
      const lowY = height - padding.bottom - (candle.low - minPrice) * priceScale;

      graphic.moveTo(wickX, highY)
        .lineTo(wickX, lowY)
        .stroke({ width: 1, color });
    });
  };

  return (
    <pixiContainer>
      <pixiGraphics draw={drawChart} ref={graphicsRef} />

      {/* X-axis time labels */}
      {data.map((item, i) => {
        const maxLabels = 6;
        const step = Math.max(1, Math.floor(data.length / maxLabels));

        if (i % step !== 0 && i !== 0 && i !== data.length - 1) return null;

        const x = padding.left + i * (chartWidth / data.length) + (chartWidth / data.length) / 2;
        const timeStr = formatTime(item.timestamp);

        return (
          <pixiText
            key={i}
            text={timeStr}
            x={x}
            y={height - padding.bottom + 5}
            style={{
              fill: '#6B7280',  // Tailwind gray-500
              fontSize: 12,
              fontFamily: 'Inter, system-ui, sans-serif',
              align: 'center',
            }}
          />
        );
      })}

      {/* Y-axis price labels */}
      {Array.from({ length: gridLines + 1 }).map((_, i) => {
        const y = padding.top + (chartHeight / gridLines) * i;
        const price = maxPrice - (priceRange / gridLines) * i;
        return (
          <pixiText
            key={i}
            text={price.toFixed(2)}
            x={padding.left - 45}
            y={y - 7}
            style={{
              fill: '#6B7280',  // Tailwind gray-500
              fontSize: 12,
              fontFamily: 'Inter, system-ui, sans-serif',
              align: 'right',
            }}
          />
        );
      })}
    </pixiContainer>
  );
};

export default Chart;