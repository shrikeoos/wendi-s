import React, { useEffect, useRef, useState } from "react";
import { PeekingMonkeyFace } from "../PixelSprites";
import { Entity, Vec } from "./types";
import { TILE, PEEK_DIST } from "./constants";

type Side = "left" | "right" | "top";

// Something peeks from behind the nearest solid when the player gets close,
// sliding out from behind it and retracting when the player leaves.
// Returns the peek node (or null). Mirrors the original monkey-peek behavior.
export function usePeek(solids: Entity[], pos: Vec, active: boolean): React.ReactNode {
  const [config, setConfig] = useState<{ idx: number; side: Side } | null>(null);
  const [view, setView] = useState<{ idx: number; side: Side; phase: "in" | "out" } | null>(null);
  const timerRef = useRef<number>(0);

  // proximity → which solid (if any)
  useEffect(() => {
    if (!active) { setConfig(null); return; }
    const px = pos.x + TILE / 2;
    const py = pos.y + TILE / 2;
    let closest: number | null = null;
    let closestDist = Infinity;
    solids.forEach((s, i) => {
      const fw = s.footprint?.w ?? s.w;
      const fh = s.footprint?.h ?? s.h;
      const dist = Math.hypot(px - (s.x + fw / 2), py - (s.y + fh / 2));
      if (dist < PEEK_DIST && dist < closestDist) { closestDist = dist; closest = i; }
    });
    if (closest === null) { setConfig(null); return; }
    const newIdx = closest;
    setConfig(prev => {
      if (prev?.idx === newIdx) return prev;
      const sides: Side[] = ["left", "right", "top"];
      return { idx: newIdx, side: sides[Math.floor(Math.random() * sides.length)] };
    });
  }, [pos, active, solids]);

  // config → enter / exit animation, staying mounted through the retract
  useEffect(() => {
    if (config) {
      clearTimeout(timerRef.current);
      setView({ idx: config.idx, side: config.side, phase: "in" });
    } else {
      setView(prev => (prev && prev.phase !== "out" ? { ...prev, phase: "out" } : prev));
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setView(null), 300);
    }
  }, [config]);

  if (!view) return null;
  const s = solids[view.idx];
  if (!s) return null;

  const fw = s.footprint?.w ?? s.w;
  const left =
    view.side === "right" ? s.x + fw - 6
    : view.side === "left" ? s.x - 18
    : s.x + Math.floor(fw / 2) - 12;
  const top = view.side === "top" ? s.y - 18 : s.y + 8;
  const inAnim = view.side === "right" ? "peekIn" : view.side === "left" ? "peekInLeft" : "peekInTop";
  const outAnim = view.side === "right" ? "peekOut" : view.side === "left" ? "peekOutLeft" : "peekOutTop";
  const anim = view.phase === "out" ? `${outAnim} 0.3s ease-in forwards` : `${inAnim} 0.3s ease-out`;

  return (
    <div className="absolute" style={{ left, top, zIndex: 3, animation: anim }}>
      <PeekingMonkeyFace flipped={view.side === "left"} />
    </div>
  );
}
