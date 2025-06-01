"use client";
import React, { useRef, createContext, useLayoutEffect, useState, useCallback, useContext } from "react";
import { cn } from "@/utils/cn";
import throttle from "@/utils/throttle";
import Matter from 'matter-js';

import { Stage, Graphics, Text, Container, useTick, useApp } from '@pixi/react';
import { TextStyle, TextMetrics } from 'pixi.js';

const title = "SoftSkills"
const tags = [
    "Quick Learner",
    "Self-Motivated",
    "Problem Solver",
    "Critical Thinker",
    "Methodical",
    "Meticulous",
    "Adaptable",
    "Innovative",
    "Analytical",
    "Detail-Oriented",
    "Collaborative",
    "Passionate",
    "Creative",
    "Team Player"
]
const colors = [
    "#0066ff", // Blue
    "#ff6600", // Orange
    "#00ccff", // Cyan
    "#9933ff", // Purple
    "#33cc33", // Green
    "#ffcc00", // Yellow
    "#ff3399", // Pink
    "#00cc99", // Teal
    "#ff3366", // Rose
    "#6666ff"  // Indigo
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
        engine.gravity.y = 10;
        return engine;
    });
    useTick((delta = 16.666) => Matter.Engine.update(engine, delta));

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
    index,
    totalPills
}: {
    text: string,
    width: number,
    height: number,
    index: number,
    totalPills: number
}) => {
    const engine: any = useEngine();
    const pillRef = useRef<any>(null);
    const textRef = useRef<any>(null);
    const pillWidth = text.length * 6 + 40;
    const pillHeight = 36;

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
            chamfer: { radius: pillHeight / 2 },
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
                    g.lineStyle(2, colors[index % colors.length], 0.5);
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
        stroke: '#d1d5db80', //var(--gray-300)
        strokeThickness: 1,

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

export function SoftSkills() {
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
        }, 1000);
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
                        tags.map((text, index) => (
                            <Pill key={index} text={text} width={width} height={height} index={index} totalPills={tags.length} />
                        ))
                    }
                </World>
            </Stage>
        </div >
    );

}

export default SoftSkills;