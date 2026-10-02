"use client";

import type { ReactNode } from "react";
import { GlyphField } from "./items/glyph-field";
import { InkText } from "./items/ink-text";
import { MagneticButton } from "./items/magnetic-button";
import { Odometer } from "./items/odometer";
import { SpotlightCard } from "./items/spotlight-card";

export type Value = number | string | boolean;
export type Values = Record<string, Value>;

export type Control = { name: string; label: string } & (
  | { type: "range"; min: number; max: number; step: number; initial: number }
  | { type: "color"; initial: string }
  | { type: "text"; initial: string; maxLength?: number }
  | { type: "toggle"; initial: boolean }
);

export type Demo = {
  controls: Control[];
  /** The preview. `set` lets a demo drive its own controls, e.g. a "random" button. */
  render: (values: Values, set: (name: string, value: Value) => void) => ReactNode;
  /** The JSX a visitor would write to get what they see. */
  usage: (values: Values) => string;
};

/** The `/r` mark from public/logo.svg, cropped to its drawn area. */
const LOGO_PATH =
  "M430 138.291V204.469C411.384 203.753 392.741 204.252 374.19 205.962C359.848 207.285 346.269 213.021 335.326 222.381C324.382 231.74 316.612 244.262 313.087 258.221C310.469 268.588 309.144 279.239 309.144 289.931V393H233.1V138.291H309.521V193.156C313.475 184.904 318.256 177.073 323.79 169.784C331.221 159.997 340.817 152.061 351.826 146.597C362.836 141.134 374.961 138.291 387.253 138.291H430ZM219.642 32L131.662 223.756H61.8883L150.53 32H219.642ZM130.226 249.207L64.6484 393H-4.00002L62.6486 249.207H130.226Z";
const LOGO_VIEWBOX = "-4 32 434 361";

/** One JSX attribute: strings quoted, `true` bare, everything else in braces. */
const attr = (name: string, value: Value) =>
  typeof value === "string" ? `${name}=${JSON.stringify(value)}` : value === true ? name : `${name}={${value}}`;

const attrs = (values: Values, names: string[]) => names.map((name) => attr(name, values[name]));

/** Prints a JSX element with one attribute per line. */
function jsx(tag: string, attributes: string[], children?: string) {
  const head = attributes.length > 0 ? `<${tag}\n${attributes.map((a) => `  ${a}`).join("\n")}\n` : `<${tag} `;
  return children === undefined ? `${head}/>` : `${head.trimEnd()}>${children}</${tag}>`;
}

// ponytail: every demo ships with every item page. Fine at a handful of small
// components; switch to next/dynamic per slug once the library grows.
export const demos: Record<string, Demo> = {
  "glyph-field": {
    controls: [
      { name: "color", label: "Glyph colour", type: "color", initial: "#a78bfa" },
      { name: "noiseColor", label: "Noise colour", type: "color", initial: "#3a3a40" },
      { name: "cellSize", label: "Cell size", type: "range", min: 8, max: 28, step: 1, initial: 12 },
      { name: "radius", label: "Reveal radius", type: "range", min: 40, max: 320, step: 10, initial: 160 },
    ],
    render: (v) => (
      <div className="h-80 w-full overflow-hidden rounded-xl bg-black md:h-96">
        <GlyphField
          path={LOGO_PATH}
          pathViewBox={LOGO_VIEWBOX}
          color={String(v.color)}
          noiseColor={String(v.noiseColor)}
          cellSize={Number(v.cellSize)}
          radius={Number(v.radius)}
        />
      </div>
    ),
    usage: (v) =>
      jsx("GlyphField", [
        "path={logoPath}",
        attr("pathViewBox", LOGO_VIEWBOX),
        ...attrs(v, ["color", "noiseColor", "cellSize", "radius"]),
      ]),
  },

  "ink-text": {
    controls: [
      { name: "text", label: "Text", type: "text", initial: "INK", maxLength: 6 },
      { name: "from", label: "Ink from", type: "color", initial: "#c4b5fd" },
      { name: "via", label: "Ink via", type: "color", initial: "#a78bfa" },
      { name: "to", label: "Ink to", type: "color", initial: "#38bdf8" },
      { name: "brush", label: "Brush size", type: "range", min: 6, max: 40, step: 1, initial: 16 },
      { name: "fade", label: "Fade (ms)", type: "range", min: 200, max: 3000, step: 100, initial: 1000 },
    ],
    render: (v) => (
      <InkText
        text={String(v.text) || "INK"}
        colors={[String(v.from), String(v.via), String(v.to)]}
        brush={Number(v.brush)}
        fade={Number(v.fade)}
        className="max-w-xl font-display"
      />
    ),
    usage: (v) =>
      jsx("InkText", [
        attr("text", v.text),
        `colors={${JSON.stringify([v.from, v.via, v.to])}}`,
        ...attrs(v, ["brush", "fade"]),
      ]),
  },

  "magnetic-button": {
    controls: [
      { name: "label", label: "Label", type: "text", initial: "Hover me", maxLength: 24 },
      { name: "strength", label: "Strength", type: "range", min: 0, max: 1, step: 0.05, initial: 0.3 },
      { name: "field", label: "Field (px)", type: "range", min: 0, max: 48, step: 2, initial: 16 },
    ],
    render: (v) => (
      <MagneticButton strength={Number(v.strength)} field={Number(v.field)}>
        {String(v.label) || "Hover me"}
      </MagneticButton>
    ),
    usage: (v) => jsx("MagneticButton", attrs(v, ["strength", "field"]), String(v.label)),
  },

  "spotlight-card": {
    controls: [
      { name: "color", label: "Light colour", type: "color", initial: "#a78bfa" },
      { name: "glowOpacity", label: "Glow strength", type: "range", min: 0, max: 0.5, step: 0.02, initial: 0.14 },
      { name: "size", label: "Light size", type: "range", min: 80, max: 480, step: 10, initial: 220 },
    ],
    render: (v) => (
      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {[
          ["Edge rendering", "Pages render close to the visitor, so the first paint arrives fast."],
          ["Typed end to end", "One schema describes the data from the database to the button."],
          ["Accessible by default", "Keyboard paths, focus rings and reduced motion are built in."],
          ["Observable", "Every request carries a trace, so slow paths are easy to find."],
        ].map(([title, body]) => (
          <SpotlightCard
            key={title}
            color={String(v.color)}
            glowOpacity={Number(v.glowOpacity)}
            size={Number(v.size)}
          >
            <h3 className="font-medium text-white">{title}</h3>
            <p className="mt-2 text-sm text-white/60">{body}</p>
          </SpotlightCard>
        ))}
      </div>
    ),
    usage: (v) => jsx("SpotlightCard", attrs(v, ["color", "glowOpacity", "size"]), "{children}"),
  },

  odometer: {
    controls: [
      { name: "to", label: "Value", type: "range", min: 0, max: 99999, step: 1, initial: 8215 },
      { name: "duration", label: "Duration (s)", type: "range", min: 0.2, max: 3, step: 0.1, initial: 1.2 },
      { name: "stagger", label: "Stagger (s)", type: "range", min: 0, max: 0.3, step: 0.01, initial: 0.06 },
      { name: "delay", label: "Delay (s)", type: "range", min: 0, max: 1, step: 0.05, initial: 0 },
      { name: "prefix", label: "Prefix", type: "text", initial: "£", maxLength: 3 },
      { name: "separator", label: "Separator", type: "text", initial: ",", maxLength: 1 },
    ],
    render: (v, set) => (
      <div className="flex flex-col items-center gap-8">
        <p className="font-display text-6xl font-semibold leading-tight text-white md:text-7xl">
          <Odometer
            to={Number(v.to)}
            from={1500}
            duration={Number(v.duration)}
            stagger={Number(v.stagger)}
            delay={Number(v.delay)}
            separator={String(v.separator)}
            prefix={String(v.prefix)}
          />
        </p>
        <button
          type="button"
          onClick={() => set("to", Math.floor(Math.random() * 100000))}
          className="min-h-11 rounded-full border border-white/20 bg-white/5 px-6 text-sm text-white transition-colors hover:border-white/40 hover:bg-white/10"
        >
          Random value
        </button>
      </div>
    ),
    usage: (v) =>
      jsx("Odometer", [
        ...attrs(v, ["to"]),
        "from={1500}",
        ...attrs(v, ["duration", "stagger", "delay", "separator", "prefix"]),
      ]),
  },
};
