import '@pixi/layout/react';
import '@pixi/layout';
import { LayoutContainer } from '@pixi/layout/components';
import React, { useRef, useEffect } from 'react';
import { Container, Sprite } from 'pixi.js';
import { extend, useApplication, Application } from '@pixi/react';
import { BunnySprite } from '../components/Bunny';

extend({
    Container,
    LayoutContainer,
    Sprite
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
                  <BunnySprite />
                </layoutContainer>
            </LayoutResizer>
        </Application>
    );
}