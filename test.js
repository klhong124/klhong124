console.clear();


const { useEffect, useMemo, useState, useRef, useContext } = React;
const { render } = ReactDOM;
const { Stage, Sprite, Graphics, Container, useTick, useApp } = ReactPixi;

const width = 800;
const height = 500;

const xy = (vertice) => [vertice.x, vertice.y];

const EngineContext = React.createContext();
const useEngine = () => useContext(EngineContext);

// create a world component
const World = ({ children }) => {
  const [engine] = useState(() => Matter.Engine.create());
  useTick((delta) => Matter.Engine.update(engine, delta * (1000 / 60)));

  return <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>;
};

// a generic shape component
// registers to Matter
const Shape = ({
  type,
  config,
  options = {},
  lineStyle = [1, 0xff0000, 1],
  fillStyle = [0xff0000, 0]
}) => {
  const engine = useEngine();
  const body = useRef();
  const graphics = useRef();

  useTick((delta) => {
    const g = graphics.current;
    const b = body.current;

    g.clear();

    g.lineStyle(...lineStyle);
    g.beginFill(...fillStyle);

    g.moveTo(...xy(b.vertices[0]));
    for (var j = 1; j < b.vertices.length; j += 1) g.lineTo(...xy(b.vertices[j]));
    g.lineTo(...xy(b.vertices[0]));

    if (/Circle/.test(b.label)) {
     g.moveTo(b.position.x, b.position.y) ;
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
const Mouse = ({ children, constraint = { stiffness: 0.2 } }) => {
  const app = useApp();
  const engine = useEngine();

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

  return <React.Fragment>{children}</React.Fragment>;
};

// the complete app
const App = () => {
  return (
    <Stage
      width={width}
      height={height}
      options={{
        backgroundColor: 0xf0d143,
        antialias: true,
      }}
    >
      <World>
        <Mouse>
          <React.Fragment>
            <Container name="bounds">
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
                config={{ x: -50, y: height/2, width: 100, height }}
                options={{ isStatic: true }}
                />
              <Shape
                name="right"
                type="rectangle"
                config={{ x: width + 50, y: height/2, width: 100, height }}
                options={{ isStatic: true }}
                />
            </Container>

            <Shape
              type="circle"
              fillStyle={[0x383838, 0.5]}
              config={{ x: 400, y: 20, radius: 20 + Math.random() * 100 }}
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
              config={{ x: 400, y: 20, radius: 20 + Math.random() * 100 }}
              options={{
                friction: 0.8,
                  density: 0.001,
                    restitution: 0.5,
                      stiffness: 0.4
              }}
              />
            <Shape
              type="circle"
              fillStyle={[0xfe66a5, 0.5]}
              config={{ x: 20, y: 20, radius: 20 + Math.random() * 100 }}
              options={{
                friction: 0.8,
                  density: 0.00001,
                    restitution: 0.4,
                      stiffness: 1
              }}
              />
            <Shape
              type="circle"
              fillStyle={[0xff544d, 0.7]}
              config={{ x: 80, y: 20, radius: 20 + Math.random() * 100 }}
              options={{
                friction: 0.8,
                  density: 0.00001,
                    restitution: 0.4,
                      stiffness: 1
              }}
              />
          </React.Fragment>
        </Mouse>
      </World>
    </Stage>
  );
};

render(<App />, document.getElementById("root"));
