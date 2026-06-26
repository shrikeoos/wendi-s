import { useEffect, useRef, useState } from "react";
import { ROOM_W, ROOM_H } from "./constants";

// A creature that wanders randomly within the room, bouncing off the bounds.
// Mirrors the original cat behavior. Returns its live position and facing.
export function useWander(active: boolean) {
  const [pos, setPos] = useState({ x: 400, y: 350 });
  const [facing, setFacing] = useState<"left" | "right">("right");
  const dxRef = useRef(1.5);
  const dyRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const moveId = setInterval(() => {
      setPos(prev => {
        const nx = prev.x + dxRef.current;
        const ny = prev.y + dyRef.current;
        const cx = Math.max(30, Math.min(ROOM_W - 60, nx));
        const cy = Math.max(30, Math.min(ROOM_H - 60, ny));
        if (cx !== nx) {
          dxRef.current = -dxRef.current;
          setFacing(dxRef.current > 0 ? "right" : "left");
        }
        if (cy !== ny) dyRef.current = -dyRef.current;
        return { x: cx, y: cy };
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
