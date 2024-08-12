"use client";
import React, { useRef, createContext, useEffect, useState, useCallback, useContext } from "react";
import { cn } from "@/utils/cn";
import throttle from "@/utils/throttle";
import Matter from 'matter-js';

import { Stage, Sprite, Graphics, Container, useTick, useApp } from '@pixi/react';

const xy = (vertice: any) => [vertice.x, vertice.y];



const tags = [
    "Quick Learner",
    "Self-Motivated",
    "Problem Solver",
    "Critical Thinker",
    "Methodical",
    "Team Player",
    "Meticulous",
    "Adaptable",
    "Innovative",
    "Analytical",
]


// create a world component
const EngineContext = createContext(null);
const useEngine = () => useContext(EngineContext);

const World = ({ children }: any) => {
    const [engine] = useState(() => Matter.Engine.create());
    useTick((delta) => Matter.Engine.update(engine, delta * (1000 / 60)));

    return <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>;
};

const Shape = ({
    type,
    config,
    options = {},
    lineStyle = [1, 0xff0000, 1],
    fillStyle = [0xff0000, 0]
}: any) => {
    const engine: any = useEngine();
    const body: any = useRef();
    const graphics: any = useRef();

    useTick((delta) => {
        const g: any = graphics.current;
        const b: any = body.current;

        g.clear();

        g.lineStyle(...lineStyle);
        g.beginFill(...fillStyle);

        g.moveTo(...xy(b.vertices[0]));
        for (var j = 1; j < b.vertices.length; j += 1) g.lineTo(...xy(b.vertices[j]));
        g.lineTo(...xy(b.vertices[0]));

        if (/Circle/.test(b.label)) {
            g.moveTo(b.position.x, b.position.y);
            g.lineTo(b.position.x + Math.cos(b.angle) * config.radius, b.position.y + Math.sin(b.angle) * config.radius);
        }
    });

    useEffect(() => {
        const args = Object.keys(config).reduce((a, c) => [...a, config[c]], []);
        body.current = Matter.Bodies[type](...args, options);

        Matter.World.add(engine.world, body.current);

        return () => {
            Matter.World.remove(engine.world, body.current);
        };
    }, []);

    return <Graphics ref={graphics} />;
};

// enable mouse constraint
const Mouse = ({ children, constraint = { stiffness: 0.2 } }: any) => {
    const app = useApp();
    const engine: any = useEngine();

    useEffect(() => {
        const mouse = Matter.Mouse.create(app.view);
        const mouseConstraint = Matter.MouseConstraint.create(engine, { mouse, constraint });

        const scale = 1 / window.devicePixelRatio;
        Matter.Mouse.setScale(mouse, { x: scale, y: scale });

        Matter.World.add(engine.world, mouseConstraint);

        return () => {
            Matter.World.remove(engine.world, mouseConstraint);
        };
    }, []);

    return <>{children}</>;
};


export function Hashtag() {
    const [app, setApp] = useState<any>();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const canvas = useCallback((node: HTMLDivElement | null) => {
        const onResize = throttle(() => {
            if (!node) return;
            setWidth(node.clientWidth);
            setHeight(node.clientHeight);
            if (app && app.renderer) {
                app.renderer.resize(node.clientWidth, node.clientHeight);
                app.render();
            }
        }, 100);
        onResize();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [app]);



    const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';

    return (
        <div className={cn("w-full h-full overflow-hidden")} ref={canvas}>

            <Stage
                width={0} height={0}
                renderOnComponentChange={true}
                options={{ backgroundAlpha: 0 }}
                onMount={setApp}

            >
                <World>
                    <Mouse>
                        <Shape
                            type="circle"
                            fillStyle={[0xff544d, 0.7]}
                            config={{ x: 80, y: 10, radius: 15 + Math.random() * 20 }}
                            options={{
                                friction: 0.8,
                                density: 0.00001,
                                restitution: 0.4,
                                stiffness: 1
                            }}
                        />
                        <Shape
                            type="circle"
                            fillStyle={[0x53ce91, 0.5]}
                            config={{ x: 60, y: 15, radius: 20 + Math.random() * 20 }}
                            options={{
                                friction: 0.8,
                                density: 0.001,
                                restitution: 0.5,
                                stiffness: 0.4
                            }}
                        />
                        <Container>
                            <Shape
                                name="bottom"
                                type="rectangle"
                                config={{ x: width / 2, y: height + 50, width, height: 100 }}
                                options={{ isStatic: true }}
                            />
                            <Shape
                                name="top"
                                type="rectangle"
                                config={{ x: width / 2, y: -50, width, height: 100 }}
                                options={{ isStatic: true }}
                            />
                            <Shape
                                name="left"
                                type="rectangle"
                                config={{ x: -50, y: height / 2, width: 100, height }}
                                options={{ isStatic: true }}
                            />
                            <Shape
                                name="right"
                                type="rectangle"
                                config={{ x: width + 50, y: height / 2, width: 100, height }}
                                options={{ isStatic: true }}
                            />
                        </Container>

                    </Mouse>
                </World>
            </Stage>
        </div >
    );

}

export default Hashtag;