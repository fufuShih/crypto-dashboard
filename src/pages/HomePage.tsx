import '@pixi/layout/react';
import '@pixi/layout';
import { LayoutContainer } from '@pixi/layout/components';
import React, { useRef, useEffect } from 'react';
import { Container, Graphics, Sprite, State } from 'pixi.js';
import { extend, useApplication, Application } from '@pixi/react';
import { BunnySprite } from '../components/Bunny';
import Chart from '../components/Chart';

extend({
    Container,
    LayoutContainer,
    Sprite,
    State,
    Graphics
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
                  {/* <BunnySprite /> */}
                  <Chart data={[
                    { timestamp: 1, open: 100, high: 105, low: 98, close: 103 },
                    { timestamp: 2, open: 103, high: 107, low: 102, close: 105 },
                    { timestamp: 3, open: 105, high: 108, low: 104, close: 106 },
                    { timestamp: 4, open: 106, high: 110, low: 105, close: 109 },
                    { timestamp: 5, open: 109, high: 112, low: 108, close: 110 },
                    { timestamp: 6, open: 110, high: 113, low: 109, close: 111 },
                    { timestamp: 7, open: 111, high: 115, low: 110, close: 114 },
                    { timestamp: 8, open: 114, high: 117, low: 113, close: 116 },
                    { timestamp: 9, open: 116, high: 119, low: 115, close: 118 },
                    { timestamp: 10, open: 118, high: 120, low: 117, close: 119 },
                    { timestamp: 11, open: 119, high: 121, low: 118, close: 120 },
                    { timestamp: 12, open: 120, high: 123, low: 119, close: 122 },
                    { timestamp: 13, open: 122, high: 125, low: 121, close: 124 },
                    { timestamp: 14, open: 124, high: 127, low: 123, close: 126 },
                    { timestamp: 15, open: 126, high: 128, low: 125, close: 127 },
                    { timestamp: 16, open: 127, high: 130, low: 126, close: 129 },
                    { timestamp: 17, open: 129, high: 132, low: 128, close: 131 },
                    { timestamp: 18, open: 131, high: 134, low: 130, close: 133 },
                    { timestamp: 19, open: 133, high: 136, low: 132, close: 135 },
                    { timestamp: 20, open: 135, high: 138, low: 134, close: 137 },
                    { timestamp: 21, open: 137, high: 140, low: 136, close: 139 },
                    { timestamp: 22, open: 139, high: 142, low: 138, close: 141 },
                    { timestamp: 23, open: 141, high: 144, low: 140, close: 143 },
                    { timestamp: 24, open: 143, high: 146, low: 142, close: 145 },
                    { timestamp: 25, open: 145, high: 148, low: 144, close: 147 },
                    { timestamp: 26, open: 147, high: 150, low: 146, close: 149 },
                    { timestamp: 27, open: 149, high: 152, low: 148, close: 151 },
                    { timestamp: 28, open: 151, high: 154, low: 150, close: 153 },
                    { timestamp: 29, open: 153, high: 156, low: 152, close: 155 },
                    { timestamp: 30, open: 155, high: 158, low: 154, close: 157 }
                  ]} />
                </layoutContainer>
            </LayoutResizer>
        </Application>
    );
}