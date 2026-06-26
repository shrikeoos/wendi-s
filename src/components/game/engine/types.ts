import React from "react";

export type RoomId = "room1" | "room2";
export type Direction = "down" | "up" | "left" | "right";

// Screen = top-level mode. "play" means a room is active.
export type Screen = "play" | "yes-ending" | "no-ending";

// Read-only context passed to entity sprite renderers so a sprite can react to
// game state (e.g. the NPC shrugging) without holding any setters.
export interface RenderCtx {
  dialogueNode: string | null;
  nearInteractId: string | null;
  dir: Direction;
}

// Action IDs are carried by data (entities, dialogue choices) and resolved to
// real behavior by the orchestrator. This keeps room/dialogue files declarative.
export type ActionId =
  | "talk"
  | "choseYes"
  | "choseNo"
  | "closeDialogue";

export type Vec = { x: number; y: number };

export interface Interactable {
  type: "space" | "click";
  prompt?: string; // bottom-of-screen hint shown while in range (space type)
  action: ActionId;
}

export interface Entity {
  id: string;
  x: number;
  y: number;
  w: number; // collision width
  h: number; // collision height
  // Visual footprint used by the peek system (defaults to w/h). Wardrobes
  // collide as 40×48 but render wider/taller, so the peek aligns to this.
  footprint?: { w: number; h: number };
  solid?: boolean;
  zIndex?: number;
  // Static node, or a function of read-only context.
  sprite: React.ReactNode | ((ctx: RenderCtx) => React.ReactNode);
  interact?: Interactable;
}

export interface Exit {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  to: RoomId;
  spawn: Vec; // where the player appears in the destination room
  sprite?: React.ReactNode;
  zIndex?: number;
  random?: boolean; // re-place (avoiding solids) each time this room is entered
}

export interface RoomSystems {
  wander?: boolean; // cat
  peek?: boolean; // monkey behind nearest solid
}

export interface Room {
  id: RoomId;
  viewportBg: string;
  floor: React.CSSProperties;
  walls: React.ReactNode;
  entities: Entity[];
  exits: Exit[];
  spawn: Vec; // default spawn (used when no incoming exit specifies one)
  hint?: string; // always-on bottom instruction
  systems?: RoomSystems;
}

export interface DialogueChoice {
  label: string;
  variant?: "primary" | "secondary" | "plain";
  to?: string; // next node id
  action?: ActionId;
}

export interface DialogueNode {
  id: string;
  text: string; // supports \n line breaks
  variant?: "normal" | "shout";
  choices?: DialogueChoice[];
}
