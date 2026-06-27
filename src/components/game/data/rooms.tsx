import React from "react";
import { Wardrobe, Door, FlowerSprite, MaleSprite } from "../PixelSprites";
import { Entity, Exit, Room, RoomId, RenderCtx } from "../engine/types";
import {
  ROOM_W, ROOM_H, TILE, WARDROBE_W, WARDROBE_H, DOOR_W, DOOR_H,
} from "../engine/constants";

type FlowerType = "tulip" | "lily" | "hydrangea";

// ---- room1: wardrobe room ----------------------------------------------------

const WARDROBE_LAYOUT = [
  { x: 60, y: 40, variant: 0 },
  { x: 220, y: 50, variant: 1 },
  { x: 420, y: 80, variant: 2 },
  { x: 700, y: 40, variant: 3 },
  { x: 880, y: 100, variant: 4 },
  { x: 120, y: 280, variant: 5 },
  { x: 350, y: 320, variant: 0 },
  { x: 580, y: 260, variant: 1 },
  { x: 800, y: 350, variant: 2 },
  { x: 60, y: 520, variant: 3 },
  { x: 300, y: 560, variant: 4 },
  { x: 550, y: 520, variant: 5 },
  { x: 780, y: 580, variant: 3 },
];

const FLOWER_LAYOUT: { x: number; y: number; type: FlowerType }[] = [
  { x: 158, y: 52, type: "tulip" },
  { x: 340, y: 50, type: "lily" },
  { x: 592, y: 50, type: "hydrangea" },
  { x: 825, y: 52, type: "tulip" },
  { x: 18, y: 175, type: "hydrangea" },
  { x: 975, y: 190, type: "lily" },
  { x: 248, y: 200, type: "tulip" },
  { x: 495, y: 165, type: "hydrangea" },
  { x: 230, y: 455, type: "lily" },
  { x: 680, y: 455, type: "tulip" },
  { x: 185, y: 680, type: "hydrangea" },
  { x: 660, y: 680, type: "lily" },
  { x: 880, y: 680, type: "tulip" },
];

const wardrobes: Entity[] = WARDROBE_LAYOUT.map((w, i) => ({
  id: `wardrobe-${i}`,
  x: w.x,
  y: w.y,
  w: WARDROBE_W,
  h: WARDROBE_H,
  footprint: {
    w: w.variant % 3 === 1 ? 52 : 40,
    h: w.variant % 3 === 2 ? 56 : 48,
  },
  solid: true,
  zIndex: 4,
  sprite: <Wardrobe variant={w.variant} />,
}));

const flowers: Entity[] = FLOWER_LAYOUT.map((f, i) => ({
  id: `flower-${i}`,
  x: f.x,
  y: f.y,
  w: 0,
  h: 0,
  zIndex: 2,
  sprite: <FlowerSprite type={f.type} />,
}));

const room1Exit: Exit = {
  id: "room1-door",
  x: ROOM_W - 32,
  y: ROOM_H / 2 - 22,
  w: DOOR_W,
  h: DOOR_H,
  to: "room2",
  spawn: { x: 200, y: ROOM_H / 2 - 16 },
  sprite: <Door />,
  random: true,
};

const room1: Room = {
  id: "room1",
  viewportBg: "#FFF5F8",
  floor: {
    backgroundColor: "#FFFBFC",
    backgroundImage: "radial-gradient(circle, #FFD6E8 1.5px, transparent 1.5px)",
    backgroundSize: "24px 24px",
  },
  walls: (
    <>
      <div className="absolute top-0 left-0 right-0" style={{ height: 6, background: "#FF69B4" }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 4, background: "#999" }} />
      <div className="absolute top-0 left-0 bottom-0" style={{ width: 4, background: "#999" }} />
      <div className="absolute top-0 right-0 bottom-0" style={{ width: 4, background: "#999" }} />
    </>
  ),
  entities: [...flowers, ...wardrobes],
  exits: [room1Exit],
  spawn: { x: ROOM_W / 2 - 16, y: ROOM_H / 2 - 16 },
  systems: { wander: true, peek: true },
};

// ---- room2: NPC room ---------------------------------------------------------

export const NPC_POS = { x: ROOM_W / 2 - 16, y: ROOM_H / 2 - 16 };

const npc: Entity = {
  id: "npc",
  x: NPC_POS.x,
  y: NPC_POS.y,
  w: TILE,
  h: TILE,
  solid: true,
  zIndex: 5,
  sprite: (ctx: RenderCtx) => {
    // Glance toward the player along whichever axis dominates — one of
    // left / right / up / down only (with a small deadzone when very close).
    const dx = ctx.playerPos.x - NPC_POS.x;
    const dy = ctx.playerPos.y - NPC_POS.y;
    const AMT = 2;
    let look = { x: 0, y: 0 };
    if (Math.hypot(dx, dy) > 8) {
      if (Math.abs(dx) >= Math.abs(dy)) look = { x: dx > 0 ? AMT : -AMT, y: 0 };
      else look = { x: 0, y: dy > 0 ? AMT : -AMT };
    }
    return <MaleSprite shrug={ctx.dialogueNode === "no-response"} look={look} />;
  },
  interact: { type: "space", prompt: "Press SPACE to talk!", action: "talk" },
};

const hearts: Entity[] = [60, 160, 280, 380].map((x, i) => ({
  id: `heart-${i}`,
  x,
  y: 10,
  w: 0,
  h: 0,
  zIndex: 1,
  sprite: <div style={{ fontSize: 16, opacity: 0.3 }}>💕</div>,
}));

const room2Exit: Exit = {
  id: "room2-backdoor",
  x: 4,
  y: ROOM_H / 2 - 22,
  w: DOOR_W,
  h: DOOR_H,
  to: "room1",
  spawn: { x: ROOM_W / 2 - 16, y: ROOM_H / 2 - 16 },
  sprite: <Door />,
};

const room2: Room = {
  id: "room2",
  viewportBg: "#FFF0F5",
  floor: {
    background: "repeating-conic-gradient(#FFE4E1 0% 25%, #FFF0F5 0% 50%) 0 0 / 32px 32px",
  },
  walls: (
    <>
      <div className="absolute top-0 left-0 right-0" style={{ height: 4, background: "#FF69B4" }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 4, background: "#FF69B4" }} />
      <div className="absolute top-0 left-0 bottom-0" style={{ width: 4, background: "#FF69B4" }} />
      <div className="absolute top-0 right-0 bottom-0" style={{ width: 4, background: "#FF69B4" }} />
    </>
  ),
  entities: [...hearts, npc],
  exits: [room2Exit],
  spawn: { x: 200, y: ROOM_H / 2 - 16 },
};

export const ROOMS: Record<RoomId, Room> = { room1, room2 };
