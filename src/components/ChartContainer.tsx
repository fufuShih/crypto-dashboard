import '@pixi/layout/react';
import '@pixi/layout';
import { LayoutContainer } from '@pixi/layout/components';
import React, { useRef, useEffect, useState } from 'react';
import { Container, Graphics, Text, Sprite, State } from 'pixi.js';
import { extend, useApplication, Application } from '@pixi/react';
import Chart from '../components/Chart';
import BinanceWebSocket from '../services/BinanceWebSocket';

extend({
    Container,
    LayoutContainer,
    Sprite,
    State,
    Graphics,
    Text
});

const LayoutResizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const layoutRef = useRef<Container>(null);
    const { app } = useApplication();

    useEffect(() => {
        if (!app?.renderer) return;

        const handleResize = () => {
            if (layoutRef.current) {
                layoutRef.current.layout = {
                    width: app.screen.width,
                    height: app.screen.height,
                };
            }
        };

        app.renderer.on("resize", handleResize);

        // Initial layout
        handleResize();

        return () => {
            app.renderer.off("resize", handleResize);
        };
    }, [app]);

    return (
        <pixiContainer ref={layoutRef} layout={{}}>
            {children}
        </pixiContainer>
    );
};

const ChartContainer = () => {
  const [chartData, setChartData] = useState<Array<{
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ws = new BinanceWebSocket('btcusdt', '1m');

    ws.onData((data) => {
      setChartData(data);
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
    <Application resizeTo={document.getElementById('main-section') as HTMLElement}>
      <LayoutResizer>
          <layoutContainer
              layout={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#2C2C2E',
                width: '100%',
                height: '100%'
              }}
          >
            {isLoading ? (
              <pixiText
                text="Loading..."
                style={{
                  fill: '#cccccc',
                  fontSize: 20,
                  fontFamily: 'monospace',
                  align: 'center',
                }}
              />
            ) : (
              <Chart data={chartData} />
            )}
          </layoutContainer>
      </LayoutResizer>
  </Application>
  )
}

export default ChartContainer