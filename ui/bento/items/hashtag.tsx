"use client";
import React, { useRef, createContext, useEffect, useState, useCallback, useContext } from "react";
import { cn } from "@/utils/cn";
import throttle from "@/utils/throttle";
import Matter from 'matter-js';

import { Stage, Sprite, Graphics, Text, Container, useTick, useApp } from '@pixi/react';

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
    const [engine] = useState<any>(() => Matter.Engine.create());
    useTick((delta) => Matter.Engine.update(engine, delta * (1000 / 60)));

    const app: any = useApp();
    const constraint = { stiffness: 0.2 }
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

    return <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>;
};

const Shape = ({
    type,
    config,
    options = {},
    lineStyle = [], // [thickness, color, alpha]
    fillStyle = [] // [color, alpha]
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
        for (let j = 1; j < b.vertices.length; j += 1) g.lineTo(...xy(b.vertices[j]));
        g.lineTo(...xy(b.vertices[0]));
    });

    useEffect(() => {
        const args: any = Object.keys(config).reduce((a, c) => [...a, config[c]] as any, []);
        body.current = (Matter.Bodies as any)[type](...args, options);
        Matter.World.add(engine.world, body.current);

        return () => {
            Matter.World.remove(engine.world, body.current);
        };
    }, []);

    return <Graphics ref={graphics} />

};

const Pill = () => {
    const engine: any = useEngine();
    const body = Matter.Bodies.rectangle(20, 100, 100, 50, {
        chamfer: { radius: 20 },
    })
    const pillRef = useCallback((node: any) => {
        Matter.World.add(engine.world, body);

        const update = () => {
            if (node) {
                node.clear();
                node.lineStyle(2, 0xff00ff, 1);
                node.moveTo(...xy(body.vertices[0]));
                for (let j = 1; j < body.vertices.length; j += 1) node.lineTo(...xy(body.vertices[j]));
                node.lineTo(...xy(body.vertices[0]));
            }
            requestAnimationFrame(update);
        };

        update();
    }, []);

    const textRef = useCallback((node: any) => {
        const update = () => {
            if (node) {
                node.position.set(body.position.x, body.position.y);
                node.rotation = body.angle;
            }
            requestAnimationFrame(update);
        };

        update();

        return () => {
            Matter.World.remove(engine.world, body);
        };
    }, []);

    return (
        <Container>
            <Graphics ref={pillRef} />
            <Text
                ref={textRef}
                text="Hello"
                anchor={0.5}
                x={200}
                y={100}

            />
        </Container>
    )
}


export function Hashtag() {
    const [app, setApp] = useState<any>();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const canvas = useCallback((node: HTMLDivElement | null) => {
        const onResize = throttle(() => {
            if (!node) return;
            setWidth(node.clientWidth);
            setHeight(node.clientHeight);
            if (app?.renderer) {
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



    return (
        <div className={cn("w-full h-full overflow-hidden")} ref={canvas}>

            <Stage
                width={0} height={0}
                renderOnComponentChange={true}
                options={{ backgroundAlpha: 0 }}
                onMount={setApp}

            >
                <World>
                    <Pill />
                    <Shape
                        type="rectangle"
                        fillStyle={[0xff544d, 0.7]}
                        config={{ x: 80, y: 10, width: 120, height: 40 }}
                        options={{
                            chamfer: { radius: 20 },
                            friction: 0.8,
                            density: 0.00001,
                            restitution: 0.4,
                            stiffness: 1
                        }}
                    />
                    <Shape
                        type="rectangle"
                        fillStyle={[0x53ce91, 0.5]}
                        config={{ x: 60, y: 15, width: 120, height: 40 }}
                        options={{
                            chamfer: { radius: 20 },
                            friction: 0.8,
                            density: 0.001,
                            restitution: 0.5,
                            stiffness: 0.4
                        }}
                    />
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

                </World>
            </Stage>
        </div >
    );

}

export default Hashtag;