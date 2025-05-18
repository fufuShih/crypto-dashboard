import '@pixi/layout/react';
import '@pixi/layout';
import { LayoutContainer } from '@pixi/layout/components';
import React, { useRef, useEffect } from 'react';
import { Container, Graphics, HTMLText, Sprite, State } from 'pixi.js';
import { extend, useApplication, Application } from '@pixi/react';
import Chart from '../components/Chart';

extend({
    Container,
    LayoutContainer,
    Sprite,
    State,
    Graphics,
    Text,
    HTMLText
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

export function HomePage() {
    return (
        <Application resizeTo={window}>
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
                  <Chart data={[
                    { timestamp: 1, open: 100, high: 105, low: 98, close: 103 },
                    { timestamp: 2, open: 103, high: 106, low: 100, close: 101 },
                    { timestamp: 3, open: 101, high: 104, low: 99, close: 103 },
                    { timestamp: 4, open: 103, high: 107, low: 102, close: 105 },
                    { timestamp: 5, open: 105, high: 108, low: 104, close: 102 },
                    { timestamp: 6, open: 102, high: 106, low: 101, close: 104 },
                    { timestamp: 7, open: 104, high: 107, low: 103, close: 103 },
                    { timestamp: 8, open: 103, high: 108, low: 102, close: 107 },
                    { timestamp: 9, open: 107, high: 110, low: 105, close: 106 },
                    { timestamp: 10, open: 106, high: 109, low: 104, close: 108 },
                    { timestamp: 11, open: 108, high: 111, low: 107, close: 109 },
                    { timestamp: 12, open: 109, high: 112, low: 108, close: 107 },
                    { timestamp: 13, open: 107, high: 110, low: 105, close: 108 },
                    { timestamp: 14, open: 108, high: 111, low: 106, close: 106 },
                    { timestamp: 15, open: 106, high: 109, low: 104, close: 108 },
                    { timestamp: 16, open: 108, high: 112, low: 107, close: 110 },
                    { timestamp: 17, open: 110, high: 113, low: 109, close: 108 },
                    { timestamp: 18, open: 108, high: 111, low: 106, close: 109 },
                    { timestamp: 19, open: 109, high: 112, low: 107, close: 107 },
                    { timestamp: 20, open: 107, high: 110, low: 105, close: 108 },
                    { timestamp: 21, open: 108, high: 111, low: 106, close: 110 },
                    { timestamp: 22, open: 110, high: 113, low: 109, close: 109 },
                    { timestamp: 23, open: 109, high: 112, low: 107, close: 111 },
                    { timestamp: 24, open: 111, high: 114, low: 110, close: 112 },
                    { timestamp: 25, open: 112, high: 115, low: 111, close: 110 },
                    { timestamp: 26, open: 110, high: 113, low: 109, close: 111 },
                    { timestamp: 27, open: 111, high: 114, low: 110, close: 113 },
                    { timestamp: 28, open: 113, high: 116, low: 112, close: 112 },
                    { timestamp: 29, open: 112, high: 115, low: 111, close: 114 },
                    { timestamp: 30, open: 114, high: 117, low: 113, close: 113 },
                    { timestamp: 31, open: 113, high: 116, low: 112, close: 115 }
                  ]} />
                </layoutContainer>
            </LayoutResizer>
        </Application>
    );
}