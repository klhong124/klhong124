"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&*+=<>?/";

type Cell = { char: string; heat: number; inShape: boolean };
type Ring = { x: number; y: number; r: number };

type GlyphFieldProps = {
  /** The word hidden in the field. Short words (3 to 6 letters) read best. */
  word?: string;
  /** SVG path data to hide instead of a word, such as a logo. Wins over `word`. */
  path?: string;
  /** The path's viewBox ("minX minY width height"). Crop it tight to the shape. */
  pathViewBox?: string;
  /** Colour of decoded glyphs inside the shape. */
  color?: string;
  /** Colour of the background noise. */
  noiseColor?: string;
  /** Grid cell size in CSS pixels. */
  cellSize?: number;
  /** How far from the cursor glyphs start to decode, in CSS pixels. */
  radius?: number;
  className?: string;
};

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/**
 * Rasterises the hidden shape at grid resolution, one pixel per cell: true
 * where a cell sits inside the word or path.
 */
function shapeMask(cols: number, rows: number, word: string, path?: string, pathViewBox?: string) {
  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d");
  if (!ctx || cols === 0 || rows === 0) return new Array<boolean>(cols * rows).fill(false);

  if (path) {
    const [minX, minY, width, height] = (pathViewBox ?? "0 0 100 100").split(/[\s,]+/).map(Number);
    const scale = Math.min((cols * 0.85) / width, (rows * 0.8) / height);
    ctx.translate(cols / 2, rows / 2);
    ctx.scale(scale, scale);
    ctx.translate(-(minX + width / 2), -(minY + height / 2));
    ctx.fill(new Path2D(path));
  } else {
    let size = rows * 0.75;
    ctx.font = `900 ${size}px sans-serif`;
    const width = ctx.measureText(word).width;
    if (width > cols * 0.85) size *= (cols * 0.85) / width;
    ctx.font = `900 ${size}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(word, cols / 2, rows / 2);
  }

  const { data } = ctx.getImageData(0, 0, cols, rows);
  return Array.from({ length: cols * rows }, (_, i) => data[i * 4 + 3] > 128);
}

/**
 * A field of flickering glyphs hiding a word or a shape. Glyphs near the cursor
 * decode and the shape surfaces out of the noise; a click sends a ripple that
 * decodes everything it crosses.
 */
export function GlyphField({
  word = "PIXEL",
  path,
  pathViewBox,
  color = "#a78bfa",
  noiseColor = "#3a3a40",
  cellSize = 16,
  radius = 140,
  className = "",
}: GlyphFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Colours and radius are read live each frame, so changing them restyles the
  // running field instead of rebuilding the grid and replaying the intro.
  const live = useRef({ color, noiseColor, radius });
  const redraw = useRef<(() => void) | null>(null);

  useEffect(() => {
    live.current = { color, noiseColor, radius };
    // Under reduced motion there is no loop to pick the change up, so draw now.
    redraw.current?.();
  }, [color, noiseColor, radius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1e4, y: -1e4 };
    const rings: Ring[] = [];
    let cells: Cell[] = [];
    let cols = 0;
    let rows = 0;
    let frame = 0;
    let visible = true;

    const centre = (i: number) => ({
      x: (i % cols) * cellSize + cellSize / 2,
      y: Math.floor(i / cols) * cellSize + cellSize / 2,
    });

    const draw = () => {
      const { color, noiseColor } = live.current;
      ctx.clearRect(0, 0, cols * cellSize, rows * cellSize);
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const { x, y } = centre(i);
        // Noise dims as the field decodes, so the shape stands out against it.
        ctx.globalAlpha = cell.inShape ? 1 - cell.heat : 1 - cell.heat * 0.9;
        ctx.fillStyle = noiseColor;
        ctx.fillText(cell.char, x, y);
        if (cell.inShape && cell.heat > 0.01) {
          ctx.globalAlpha = cell.heat;
          ctx.fillStyle = color;
          ctx.fillText(cell.char, x, y);
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // Resizing the canvas resets its context, so text settings go after it.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${Math.round(cellSize * 0.75)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      cells = shapeMask(cols, rows, word, path, pathViewBox).map((inShape) => ({
        char: randomGlyph(),
        // Reduced motion gets the finished state: the shape fully revealed.
        heat: reduced && inShape ? 1 : 0,
        inShape,
      }));
      draw();
    };

    const step = () => {
      frame = requestAnimationFrame(step);
      if (!visible) return;

      const { radius } = live.current;
      const maxRadius = Math.hypot(cols, rows) * cellSize;
      for (const ring of rings) ring.r += 6;
      // Rings are created in order, so the oldest is always the largest.
      while (rings.length > 0 && rings[0].r > maxRadius) rings.shift();

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const { x, y } = centre(i);
        const distance = Math.hypot(x - pointer.x, y - pointer.y);
        let target = distance < radius ? 1 - distance / radius : 0;
        for (const ring of rings) {
          if (Math.abs(Math.hypot(x - ring.x, y - ring.y) - ring.r) < cellSize * 1.5) target = 1;
        }
        // Rise fast and decay slowly, so the reveal lingers behind the cursor.
        cell.heat += (target - cell.heat) * (target > cell.heat ? 0.3 : 0.03);
        // Decoded glyphs hold still; the rest flicker.
        if (cell.heat < 0.5 && Math.random() < 0.02) cell.char = randomGlyph();
      }
      draw();
    };

    const local = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onMove = (event: PointerEvent) => Object.assign(pointer, local(event));
    const onLeave = () => Object.assign(pointer, { x: -1e4, y: -1e4 });
    const onDown = (event: PointerEvent) => rings.push({ ...local(event), r: 0 });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    if (reduced) {
      redraw.current = draw;
      return () => {
        redraw.current = null;
        resizeObserver.disconnect();
      };
    }

    // Pause the loop while the field is offscreen.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    // One ripple from the centre on mount, so the shape is introduced once.
    rings.push({ x: (cols * cellSize) / 2, y: (rows * cellSize) / 2, r: 0 });
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, [word, path, pathViewBox, cellSize]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={path ? "A field of glyphs hiding a logo" : `A field of glyphs hiding the word ${word}`}
      className={`block h-full w-full ${className}`}
    />
  );
}
