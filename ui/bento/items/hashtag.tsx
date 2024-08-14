"use client";
import React, { useRef, createContext, useEffect, useState, useCallback, useContext } from "react";
import { cn } from "@/utils/cn";
import throttle from "@/utils/throttle";
import Matter from 'matter-js';

import { Stage, Graphics, Text, Container, useTick, useApp } from '@pixi/react';
import { TextStyle } from 'pixi.js';

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
}: {
    text: string,
    width: number,
    height: number
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
        { chamfer: { radius: 20 } }
    ));

    useTick(() => {
        if (pillRef.current) {
            pillRef.current.clear();
            pillRef.current.lineStyle(2, 0xffffff, 1);
            pillRef.current.moveTo(...xy(body.current.vertices[0]));
            for (let j = 1; j < body.current.vertices.length; j += 1) {
                pillRef.current.lineTo(...xy(body.current.vertices[j]));
            }
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
                    fill: 'white',
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
                        tags.map((tag, index) => (
                            <Pill key={index} text={tag} width={width} height={height} />
                        ))
                    }
                </World>
            </Stage>
        </div >
    );

}

export default Hashtag;