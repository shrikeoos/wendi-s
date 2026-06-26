# wendi-s — Project Context

A pixel art browser game built as a birthday surprise for Wendi. Deployed on GitHub Pages.

**Live URL**: https://shrikeoos.github.io/wendi-s/

## Tech stack

- React 18 + TypeScript, Vite, Tailwind CSS, shadcn/ui
- Routing: React Router v6
- Deploy: `npm run deploy` → gh-pages branch

## Project structure

```
src/
  components/game/
    ValentineGame.tsx   # All game logic, state, rooms, dialogue, animations
    PixelSprites.tsx    # All sprite components (pure CSS divs, no image files)
  pages/
    Index.tsx           # Route / → renders ValentineGame
```

All graphics are programmatic React components — no external image assets.

## Game overview

### Room 1 (wardrobe room)
- White floor with pink polka-dot pattern
- 13 cabinets (wardrobes) with overflowing clothes, 6 style variants
- Flowers scattered around: tulips, lilies, hydrangeas (`FLOWERS` array)
- A random door spawns each visit; walking into it enters Room 2
- Orange cat "Poulet" wanders around; click it → speech bubble "My name is Poulet!"
- Baby orangutan peeks from behind the nearest cabinet when player gets within 100px (`PEEK_DIST`)

### Room 2 (NPC room)
- Pink walls, checkerboard floor
- Male NPC stands in the center; approach + press Space to talk
- Back door on the left wall returns to Room 1

### Dialogue flow
1. NPC asks: *"Hey Etoile, do you know what's special about today?"*
2. **Yes** → NPC says "HEHE!!" → transparent blob with tulip appears → flash transition → birthday ending
3. **No** → *"Oh too bad. I guess today is just like any other day"* + Close button (does NOT reset player position)

### Birthday ending (yes-ending)
- Animated red/pink gradient (`flashyGradient`)
- Fireworks + bouncing & swinging baby orangutans
- Message: "Happy birthday princess! 24 years old (:"

## Key constants (ValentineGame.tsx)

| Constant | Value | Purpose |
|---|---|---|
| `TILE` | 32 | Player sprite size (px) |
| `ROOM_W / ROOM_H` | 1024 / 768 | Room dimensions |
| `SPEED` | 1 | Player movement speed |
| `INTERACT_DIST` | 50 | Distance to trigger NPC "!" indicator |
| `PEEK_DIST` | 100 | Radius for monkey-peek trigger |

## Sprite components (PixelSprites.tsx)

| Export | Description |
|---|---|
| `FemaleSprite` | Player character, 4-directional |
| `MaleSprite` | NPC, has `collapsed` variant |
| `Wardrobe` | 6 variants (wide/tall/normal, different wood colors) |
| `Door` | Brown rounded door, 28×44px |
| `Firework` | Particle burst |
| `MonkeySprite` | Baby orangutan, `swinging` prop for vine mode |
| `PeekingMonkeyFace` | Partial orangutan head for cabinet peek |
| `CatSprite` | Front-facing orange cat, `facing` prop flips via scaleX |
| `BouquetSprite` | Flower bouquet (used in no-ending only now) |
| `FlowerSprite` | `type`: tulip / lily / hydrangea |
| `RainCloud` | Animated rain, used in no-ending |

## CSS animations (defined inline in ValentineGame.tsx `<style>`)

`rainDrop`, `bounceText`, `floatExclaim`, `npcCollapse`, `nyaShake`, `monkeySwing`, `spiderSwing`, `flashyGradient`, `peekIn`, `flashIn`, `bouquetPop`, `catWalk`

## Notes

- Game scales to fill window via `Math.min(innerWidth/ROOM_W, innerHeight/ROOM_H)`
- Player position is NOT reset when closing dialogue (only resets on room transitions)
- `doorPosRef` mirrors `doorPos` state so the game loop can read it without stale closures
- Cat movement uses `catDxRef` / `catDyRef` refs to avoid stale closure in setInterval
