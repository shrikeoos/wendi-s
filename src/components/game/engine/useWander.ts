import { useEffect, useRef, useState } from "react";
import { ROOM_W, ROOM_H } from "./constants";
import { Entity } from "./types";
import { rectsOverlap } from "./geometry";

// Cat collision box (slightly inset from the 34×32 sprite so it can nose into gaps).
const CAT_W = 26;
const CAT_H = 22;
const CAT_OFFSET_X = 4;
const CAT_OFFSET_Y = 8;

function hitsSolid(x: number, y: number, solids: Entity[]): boolean {
  return solids.some(s =>
    rectsOverlap(x + CAT_OFFSET_X, y + CAT_OFFSET_Y, CAT_W, CAT_H, s.x, s.y, s.w, s.h)
  );
}

// A creature that wanders randomly within the room, bouncing off the bounds
// and off any solid entities. Returns its live position and facing.
export function useWander(active: boolean, solids: Entity[] = []) {
  const [pos, setPos] = useState({ x: 400, y: 350 });
  const [facing, setFacing] = useState<"left" | "right">("right");
  const dxRef = useRef(1.5);
  const dyRef = useRef(0);
  const solidsRef = useRef(solids);
  solidsRef.current = solids;

  useEffect(() => {
    if (!active) return;
    const moveId = setInterval(() => {
      setPos(prev => {
        const obstacles = solidsRef.current;
        // Move per-axis so the cat can slide along a wardrobe instead of sticking.
        let x = prev.x;
        let y = prev.y;

        const nx = Math.max(30, Math.min(ROOM_W - 60, prev.x + dxRef.current));
        if (nx === prev.x + dxRef.current && !hitsSolid(nx, y, obstacles)) {
          x = nx;
        } else {
          dxRef.current = -dxRef.current;
          setFacing(dxRef.current > 0 ? "right" : "left");
        }

        const ny = Math.max(30, Math.min(ROOM_H - 60, prev.y + dyRef.current));
        if (ny === prev.y + dyRef.current && !hitsSolid(x, ny, obstacles)) {
          y = ny;
        } else {
          dyRef.current = -dyRef.current;
        }

        return { x, y };
      });
    }, 30);
    const dirId = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;
      dxRef.current = Math.cos(angle) * 1.5;
      dyRef.current = Math.sin(angle) * 1.5;
      setFacing(dxRef.current >= 0 ? "right" : "left");
    }, 2200);
    return () => {
      clearInterval(moveId);
      clearInterval(dirId);
    };
  }, [active]);

  return { pos, facing };
}
