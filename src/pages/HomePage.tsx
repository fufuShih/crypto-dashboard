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
                    { timestamp: 3, open: 105, high: 108, low: 104, close: 106 }
                  ]} />
                </layoutContainer>
            </LayoutResizer>
        </Application>
    );
}