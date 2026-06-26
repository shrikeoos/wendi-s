import { Entity, Exit, Vec } from "./types";
import { ROOM_W, ROOM_H, DOOR_W, DOOR_H, DOOR_PAD } from "./constants";

export function rectsOverlap(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number
): boolean {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

// Pick a random position for a "random" exit (the room1 door) that doesn't
// overlap any solid entity. Mirrors the original randomDoorPosition().
export function randomExitPosition(solids: Entity[]): Vec {
  const maxAttempts = 200;
  const gap = 10;
  for (let i = 0; i < maxAttempts; i++) {
    const x = DOOR_PAD + Math.random() * (ROOM_W - DOOR_W - DOOR_PAD * 2);
    const y = DOOR_PAD + Math.random() * (ROOM_H - DOOR_H - DOOR_PAD * 2);
    const overlaps = solids.some(s =>
      rectsOverlap(x - gap, y - gap, DOOR_W + gap * 2, DOOR_H + gap * 2, s.x, s.y, s.w, s.h)
    );
    if (!overlaps) return { x, y };
  }
  return { x: ROOM_W - 32, y: ROOM_H / 2 - 22 };
}

// Resolve the live position of an exit, re-placing random ones.
export function placeExits(exits: Exit[], solids: Entity[]): Exit[] {
  return exits.map(e => (e.random ? { ...e, ...randomExitPosition(solids) } : e));
}
