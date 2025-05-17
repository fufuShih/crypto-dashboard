import '@pixi/layout/react';
import '@pixi/layout';
import { LayoutContainer, Sprite } from '@pixi/layout/components';
import React, { useRef } from 'react';
import { Container } from 'pixi.js';
import { extend, useApplication, Application } from '@pixi/react';
import { BunnySprite } from './components/Bunny';

extend({
    Container,
    LayoutContainer,
    Sprite
});

const LayoutResizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const layoutRef = useRef<Container>(null);
    const { app } = useApplication();

    app.renderer.on('resize', () => {
        if (layoutRef.current) {
            layoutRef.current.layout = {
                width: app.screen.width,
                height: app.screen.height,
            };
        }
    });

    return (
        <pixiContainer ref={layoutRef} layout={{}}>
            {children}
        </pixiContainer>
    );
};


function App() {

  return (
    <Application resizeTo={window} background={'#1C1C1D'}>
        <LayoutResizer>
            <layoutContainer
                layout={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#2C2C2E' }}
            >
                <layoutContainer layout={{ width: '80%', height: '80%', backgroundColor: '#FF3B30' }}>
                    <BunnySprite />
                </layoutContainer>
            </layoutContainer>
        </LayoutResizer>
    </Application>
  )
}

export default App
