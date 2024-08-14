"use client";
import React, { useRef, createContext, useEffect, useState, useCallback, useContext } from "react";
import { cn } from "@/utils/cn";
import throttle from "@/utils/throttle";
import Matter from 'matter-js';

import { Stage, Graphics, Text, Container, useTick, useApp } from '@pixi/react';
import { TextStyle } from 'pixi.js';

const xy = (vertices: Matter.Vector) => [vertices.x, vertices.y];

const tags = [
    {
        text: "Quick Learner",
        color: "#f43f5e"
    },
    {
        text: "Self-Motivated",
        color: "#ef4444"
    },
    {
        text: "Problem Solver",
        color: "#0ea5e9"
    },
    {
        text: "Critical Thinker",
        color: "#3b82f6"
    },
    {
        text: "Methodical",
        color: "#6366f1"
    },
    {
        text: "Team Player",
        color: "#8b5cf6"
    },
    {
        text: "Meticulous",
        color: "#eab308"
    },
    {
        text: "Adaptable",
        color: "#f59e0b"
    },
    {
        text: "Innovative",
        color: "#22c55e"
    },
    {
        text: "Analytical",
        color: "#10b981"
    },
]


// create a world component
const EngineContext = createContext(null);
const useEngine = () => useContext(EngineContext);

const World = ({ children }: any) => {
    const [engine] = useState<any>(() => {
        const engine = Matter.Engine.create();
        engine.constraintIterations = 1;
        engine.velocityIterations = 3;
        engine.positionIterations = 2;
        return engine;
    });
    useTick((delta) => Matter.Engine.update(engine, delta * (1000 / 120)));

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

const Walls = ({
    width, height
}: {
    width: number; height: number
}) => {
    const engine: any = useEngine();
    const body: any = useRef();

    const thickness = 100;
    const padding = thickness / 2 - 2;

    useEffect(() => {
        const bodies = [
            { x: width / 2, y: height + padding, width, height: thickness },
            { x: width / 2, y: -padding, width, height: thickness },
            { x: -padding, y: height / 2, width: thickness, height },
            { x: width + padding, y: height / 2, width: thickness, height }
        ].map(({ x, y, width, height }) => Matter.Bodies.rectangle(x, y, width, height, { isStatic: true }));

        bodies.forEach((body) => {
            Matter.World.add(engine.world, body);
        });
        return () => {
            bodies.forEach((body) => {
                Matter.World.remove(engine.world, body);
            });
        };
    }, [engine, body, width, height]);

    return null

};

const Pill = ({
    text,
    width,
    height,
    color
}: {
    text: string,
    width: number,
    height: number
    color: string
}) => {
    const engine: any = useEngine();
    const pillRef = useRef<any>(null);
    const textRef = useRef<any>(null);
    const padding = (text.length * 6 + 48) / 2

    const body = useRef(Matter.Bodies.rectangle(
        padding + Math.random() * (width - padding * 2),
        padding + Math.random() * (height - padding * 2),
        text.length * 6 + 48,
        40,
        {
            chamfer: { radius: 20 },
            restitution: 0.2,
        }
    ));
    useTick(() => {
        if (pillRef.current) {
            pillRef.current.clear();
            pillRef.current.lineStyle(2, color, 1);
            pillRef.current.moveTo(...xy(body.current.vertices[0]));
            body.current.vertices.forEach((vertex) => {
                pillRef.current.lineTo(...xy(vertex));
            });
            pillRef.current.lineTo(...xy(body.current.vertices[0]));
        }

        if (textRef.current) {
            textRef.current.position.set(body.current.position.x, body.current.position.y);
            textRef.current.rotation = body.current.angle;
        }
    });

    useEffect(() => {
        Matter.World.add(engine.world, body.current);
        return () => {
            Matter.World.remove(engine.world, body.current);
        };
    }, [engine, body]);

    return (
        <Container>
            <Graphics ref={pillRef} />
            <Text
                ref={textRef}
                text={text}
                anchor={0.5}
                x={200}
                y={100}
                style={new TextStyle({
                    fill: '#e7e5e4',
                    fontSize: 14,
                })}
            />
        </Container>
    );
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
                options={{
                    backgroundAlpha: 0,
                    antialias: true,

                }}
                onMount={setApp}

            >
                <World>
                    <Walls width={width} height={height} />
                    {
                        tags.map(({ text, color }, index) => (
                            <Pill key={index} text={text} width={width} height={height} color={color} />
                        ))
                    }
                </World>
            </Stage>
        </div >
    );

}

export default Hashtag;