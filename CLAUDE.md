# wendi-s — Project Context

A pixel art browser game built as a birthday surprise for Wendi. Deployed on GitHub Pages.

**Live URL**: https://shrikeoos.github.io/wendi-s/

## Tech stack

- React 18 + TypeScript, Vite, Tailwind CSS, shadcn/ui
- Routing: React Router v6
- Deploy: `npm run deploy` → gh-pages branch

All graphics are programmatic React components (pure CSS divs) — no external image assets.

## Project structure

```
src/
  components/game/
    ValentineGame.tsx       # Thin orchestrator: screen/room state, game loop, actions, layout, <style>
    PixelSprites.tsx        # All sprite components (pure CSS divs)
    engine/
      types.ts              # Room, Entity, Exit, DialogueNode, ActionId, RenderCtx, Screen…
      constants.ts          # TILE, ROOM_W/H, SPEED, INTERACT_DIST, PEEK_DIST, door/wardrobe sizes
      geometry.ts           # rectsOverlap, randomExitPosition, placeExits
      RoomView.tsx          # Renders ANY room from data (floor, walls, entities, exits, prompts)
      DialogueBox.tsx       # Renders ANY dialogue node (text + choices + bubble)
      useWander.ts          # Reusable "wandering creature" system (the cat)
      usePeek.tsx           # Reusable "peek from behind nearest solid" system (the monkey)
    data/
      rooms.tsx             # room1 & room2 defined as DATA (entities, exits, systems)
      dialogue.ts           # NPC conversation as a node graph
    scenes/
      YesEnding.tsx         # Self-contained birthday ending (owns its fireworks + monkeys)
      NoEnding.tsx          # Self-contained "NYA!" ending (currently unreachable, kept for parity)
  pages/
    Index.tsx               # Route / → renders ValentineGame
```

## Architecture (data-driven engine)

The game is a small engine that renders **rooms described as data**. Content lives in
`data/` and `scenes/`; mechanics live in `engine/`; the orchestrator wires them together.

### State model
The orchestrator (`ValentineGame.tsx`) holds three orthogonal axes (no more giant `gameState` union):
- `screen: "play" | "yes-ending" | "no-ending"` — top-level mode
- `roomId: "room1" | "room2"` — which room is active during `play`
- `dialogueNode: string | null` — dialogue overlay (movement freezes while non-null)

Refs (`posRef`, `roomIdRef`, `exitsRef`, `dialogueRef`, `nearInteractRef`) mirror state so the
single `requestAnimationFrame` loop and the once-bound key handler avoid stale closures.

### Data model (`engine/types.ts`)
- **Entity** `{ id, x, y, w, h, footprint?, solid?, zIndex?, sprite, interact? }`
  - `sprite` is a `ReactNode` **or** `(ctx: RenderCtx) => ReactNode` (read-only ctx → e.g. NPC shrug).
  - `footprint` is the *visual* size used by the peek system; `w/h` is the *collision* box
    (wardrobes collide as 40×48 but render wider/taller).
  - `interact: { type: "space" | "click", prompt?, action: ActionId }`.
- **Exit** `{ id, x, y, w, h, to, spawn, sprite?, random? }` — `random: true` re-places it
  (avoiding solids) each time the room is entered (the room1 door).
- **Room** `{ id, viewportBg, floor, walls, entities, exits, spawn, hint?, systems? }`
  - `systems: { wander?, peek? }` opts a room into the reusable creature systems.

### Actions are data, resolved by the orchestrator
Entities and dialogue choices carry an **`ActionId` string** (`"talk" | "choseYes" | "choseNo" |
"closeDialogue"`), never a closure. `runAction(id)` in the orchestrator maps each to real behavior.
This keeps room/dialogue files declarative and serializable.

## How to extend

- **Add a room**: add a `Room` object to `data/rooms.tsx`, register it in `ROOMS`, point an
  `Exit` at its id. Generic collision/rendering/transitions pick it up automatically.
- **Add a character / prop**: add an `Entity` to a room's `entities`. Make it block movement with
  `solid: true`; make it talkable with `interact: { type: "space", prompt, action: "talk" }`.
- **Add a talking flow**: add nodes to `data/dialogue.ts`; choices use `to` (next node) or
  `action` (an `ActionId`). New verbs = a new `ActionId` + a `case` in `runAction`.
- **Add a behavior** (wandering, peeking, …): write a hook under `engine/` and gate it behind a
  `room.systems` flag, following `useWander` / `usePeek`.
- **Add an ending/cutscene**: a self-contained component in `scenes/`, switched on by `screen`.

## Game content overview

### Room 1 (wardrobe room) — `systems: { wander, peek }`
- White floor w/ pink dot pattern; 13 wardrobes (6 visual variants); 13 flowers (tulip/lily/hydrangea)
- Random door each visit → Room 2. Cat "Poulet" wanders; click → "My name is Poulet!"
- Baby orangutan slides out from behind the nearest wardrobe within `PEEK_DIST`, retracts on leave

### Room 2 (NPC room)
- Pink walls, checkerboard floor. Male NPC center; approach + Space to talk. Back door (left) → Room 1

### Dialogue flow (`data/dialogue.ts`)
1. `question`: *"Hey Etoile, do you know what's special about today?"* → Yes / No
2. **Yes** (`choseYes`): "HEHE!!" → bouquet blob (tulip) → flash transition → yes-ending
   (timings: 1500ms → 1800ms → 700ms)
3. **No** (`choseNo`): NPC shrugs + *"AAAEEHGG too bad. I guess today is just like any other day."*
   → Close (`closeDialogue`, does NOT reset player position)

### Birthday ending (`scenes/YesEnding.tsx`)
- Animated red/pink gradient, fireworks, bouncing + swinging baby orangutans with varied expressions
- Message: "Happy birthday princess! 24 years old (:"

## Key constants (`engine/constants.ts`)

| Constant | Value | Purpose |
|---|---|---|
| `TILE` | 32 | Player sprite size (px) |
| `ROOM_W / ROOM_H` | 1024 / 768 | Room dimensions |
| `SPEED` | 1 | Player movement speed |
| `INTERACT_DIST` | 50 | Distance to trigger the "!" / Space prompt |
| `PEEK_DIST` | 100 | Radius for the peek system trigger |
| `WARDROBE_W / _H` | 40 / 48 | Wardrobe collision box (visual footprint set per-entity) |

## Sprite components (`PixelSprites.tsx`)

| Export | Description |
|---|---|
| `FemaleSprite` | Player character, 4-directional (black hair, red dress) |
| `MaleSprite` | NPC; `collapsed` and `shrug` variants |
| `Wardrobe` | 6 variants (wide/tall/normal, different wood tones) |
| `Door` | Brown rounded door, 28×44px |
| `Firework` | Particle burst |
| `MonkeySprite` | Baby orangutan; `swinging` prop (vine mode); `expr` 0–4 facial expressions |
| `PeekingMonkeyFace` | Partial orangutan head for the cabinet peek |
| `CatSprite` | Front-facing sitting tabby; `facing` prop flips via scaleX |
| `BouquetSprite` | Flower bouquet (unused in current flow) |
| `FlowerSprite` | `type`: tulip / lily / hydrangea |
| `RainCloud` | Animated rain, used in no-ending |

## CSS animations (inline in `ValentineGame.tsx` `<style>`, available to all scenes)

`rainDrop`, `bounceText`, `floatExclaim`, `npcCollapse`, `nyaShake`, `monkeySwing`, `spiderSwing`,
`flashyGradient`, `peekIn`/`peekInLeft`/`peekInTop` + `peekOut`/`peekOutLeft`/`peekOutTop`,
`flashIn`, `bouquetPop`, `catWalk`, `shrug`

## Notes / gotchas

- Game scales to fill the window via `Math.min(innerWidth/ROOM_W, innerHeight/ROOM_H)`
- Movement is frozen while `dialogueNode !== null`
- Collision reverts **both axes** on overlap (no wall-sliding) — intentional, keep it
- Player position is preserved on dialogue close; reset only on room transition (and the room1
  door is re-randomized on each room1 entry)
- The peek system measures distance/offset from an entity's `footprint`, not its collision `w/h`
