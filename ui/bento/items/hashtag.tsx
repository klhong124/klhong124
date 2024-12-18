"use client";
import React, { useRef, createContext, useLayoutEffect, useState, useCallback, useContext } from "react";
import { cn } from "@/utils/cn";
import throttle from "@/utils/throttle";
import Matter from 'matter-js';

import { Stage, Graphics, Text, Container, useTick, useApp } from '@pixi/react';
import { TextStyle, TextMetrics } from 'pixi.js';

const title = "HASHTAG"
const tags = [
    {
        text: "Quick Learner",
        color: "#3b82f6"  // Bright blue
    },
    {
        text: "Self-Motivated",
        color: "#f97316"  // Orange
    },
    {
        text: "Problem Solver",
        color: "#06b6d4"  // Cyan
    },
    {
        text: "Critical Thinker",
        color: "#8b5cf6"  // Purple
    },
    {
        text: "Methodical",
        color: "#10b981"  // Emerald
    },
    {
        text: "Meticulous",
        color: "#eab308"  // Yellow
    },
    {
        text: "Adaptable",
        color: "#ec4899"  // Pink
    },
    {
        text: "Innovative",
        color: "#14b8a6"  // Teal
    },
    {
        text: "Analytical",
        color: "#f43f5e"  // Rose
    },
    {
        text: "Detail-Oriented",
        color: "#6366f1"  // Indigo
    },
    {
        text: "Collaborative",
        color: "#06b6d4"  // Cyan
    },
    {
        text: "Passionate",
        color: "#22c55e"  // Green
    },
    {
        text: "Creative",
        color: "#f97316"  // Orange
    },
    {
        text: "Team Player",
        color: "#22c55e"  // Green
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
    const constraint = { stiffness: 1, damping: 1 }
    useLayoutEffect(() => {
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

    useLayoutEffect(() => {
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
    color,
    index,
    totalPills
}: {
    text: string,
    width: number,
    height: number,
    color: string,
    index: number,
    totalPills: number
}) => {
    const engine: any = useEngine();
    const pillRef = useRef<any>(null);
    const textRef = useRef<any>(null);
    const pillWidth = text.length * 6 + 48;
    const pillHeight = 40;

    const startPosition = {
        x: (index + 1) * (width / (totalPills + 1)),
        y: Math.random() * height + 40
    }

    const body = useRef(Matter.Bodies.rectangle(
        startPosition.x,
        startPosition.y,
        pillWidth,
        pillHeight,
        {
            chamfer: { radius: 20 },
            restitution: 0,
        }
    ));

    useTick(() => {
        if (pillRef.current && textRef.current && body.current) {
            // Check if the pill is outside the zone
            if (body.current.position.y > height || body.current.position.y < 0 ||
                body.current.position.x > width || body.current.position.x < 0) {
                // Reset position
                Matter.Body.setPosition(body.current, startPosition);
                Matter.Body.setVelocity(body.current, { x: 0, y: 0 });
            }

            // Update pill position and rotation
            pillRef.current.position.set(body.current.position.x, body.current.position.y);
            pillRef.current.rotation = body.current.angle;

            // Update text position and rotation
            textRef.current.position.set(body.current.position.x, body.current.position.y);
            textRef.current.rotation = body.current.angle;
        }
    });

    useLayoutEffect(() => {
        Matter.World.add(engine.world, body.current);
        return () => {
            Matter.World.remove(engine.world, body.current);
        };
    }, [engine, body]);

    return (
        <Container>
            <Graphics
                ref={pillRef}
                draw={g => {
                    const padding = 3;
                    g.clear();
                    g.lineStyle(2, color, 1);
                    g.beginFill(0, 0); // Transparent fill
                    g.drawRoundedRect(
                        -pillWidth / 2 + padding / 2,
                        -pillHeight / 2 + padding / 2,
                        pillWidth - padding,
                        pillHeight - padding,
                        20
                    );
                    g.endFill();
                }}
            />
            <Text
                ref={textRef}
                text={text}
                anchor={0.5}
                x={200}
                y={100}
                style={new TextStyle({
                    fill: '#cbd5e1', //var(--slate-300)
                    fontSize: 14,
                })}
            />
        </Container>
    );
};

const Title = ({ width, height }: { width: number; height: number }) => {
    const engine: any = useEngine();
    const textRef = useRef<any>(null);
    const titleText = title;
    const titleStyle = new TextStyle({
        fill: 'transparent',
        fontWeight: 'bold',
        fontSize: 64,
        stroke: '#d1d5db30', //var(--gray-300)
        strokeThickness: 2,

    });
    const titleWidth = Math.ceil(TextMetrics.measureText(titleText, titleStyle).width) + 5;
    const titleHeight = Math.ceil(TextMetrics.measureText(titleText, titleStyle).height) - 16;

    const startPosition = {
        x: width / 3,
        y: titleHeight
    }

    const body = useRef(Matter.Bodies.rectangle(
        startPosition.x,
        startPosition.y,
        titleWidth,
        titleHeight,
        {
            chamfer: { radius: titleHeight / 2 },
        }
    ));

    useTick(() => {
        if (textRef.current && body.current) {
            // Check if the body is outside the zone
            if (body.current.position.y > height || body.current.position.y < 0 ||
                body.current.position.x > width || body.current.position.x < 0) {
                // Reset position to start position
                Matter.Body.setPosition(body.current, startPosition);
                Matter.Body.setVelocity(body.current, { x: 0, y: 0 });
            }

            textRef.current.position.set(body.current.position.x, body.current.position.y);
            textRef.current.rotation = body.current.angle;
        }
    });

    useLayoutEffect(() => {
        Matter.World.add(engine.world, body.current);
        return () => {
            Matter.World.remove(engine.world, body.current);
        };
    }, [engine]);

    return (
        <Container>
            <Text
                ref={textRef}
                text={title}
                anchor={0.5}
                style={titleStyle}
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
        <div className={cn("size-full overflow-hidden")} ref={canvas}>

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
                    <Title width={width} height={height} />
                    {
                        tags.map(({ text, color }, index) => (
                            <Pill key={index} text={text} width={width} height={height} color={color} index={index} totalPills={tags.length} />
                        ))
                    }
                </World>
            </Stage>
        </div >
    );

}

export default Hashtag;