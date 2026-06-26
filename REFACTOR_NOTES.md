# Data-driven engine refactor — behavior checklist

Captured from the pre-refactor `ValentineGame.tsx` (commit 1c8822e). Every item must
still hold after the refactor. Reference = the just-deployed live site.
**Delete this file before merging to main.**

## Constants (must stay identical)
- TILE 32, ROOM_W 1024, ROOM_H 768, SPEED 1, INTERACT_DIST 50, PEEK_DIST 100
- Wardrobe collision box: **40×48** (fixed, ignores variant)
- Wardrobe footprint for peek/door-avoid: w = `variant%3===1?52:40`, h = `variant%3===2?56:48`
- Door collision: 28×44; DOOR_PAD 40
- Outer bg `#1a1a2e`; font `'Press Start 2P'`
- Viewport bg: room1 `#FFF5F8`, else `#FFF0F5`

## Movement / collision
- Player spawn room1 = center {496,368}; arriving in room2 via door = {80,368}
- Collision reverts **both axes** on overlap (NO wall-sliding) — keep this
- Player clamped to [0, ROOM_W-TILE] × [0, ROOM_H-TILE]
- Movement frozen while in dialogue

## Rooms / transitions
- room1 → room2: random door, re-placed each room1 entry, avoids wardrobes (40×48 + 10px gap), 200-attempt fallback {ROOM_W-32, ROOM_H/2-22}
- room2 → room1: fixed back-door at {4,362}, 28×44
- Player position **preserved** on dialogue close; **reset to center** on entering room1; door re-randomized on each room1 entry

## room1 contents
- Floor: white + pink radial-dot pattern (24px). Walls: top pink 6px, bottom/left/right gray 4px
- 13 wardrobes (positions/variants in WARDROBES), zIndex 4
- 13 flowers (tulip/lily/hydrangea), zIndex 2
- Bottom hint always: "Arrow keys to move → Find the door!"
- **Cat (Poulet)**: start {400,350}; moves every 30ms; clamp x[30,ROOM_W-60] y[30,ROOM_H-60]; bounce reverses; new random heading every 2200ms (×1.5 speed); facing right if dx≥0; catWalk anim; zIndex 7; click → "My name is Poulet!" bubble for 2500ms
- **Peek monkey**: appears from behind nearest wardrobe within 100px of player center; side random left/right/top; zIndex 3 (behind wardrobe); slides out (peekIn*) and retracts (peekOut*, 300ms) when leaving. left = w.x-18 / right = w.x+ww-6 / top x=w.x+floor(ww/2)-12; top y=w.y-18 else w.y+8

## room2 contents
- Floor: pink checkerboard conic 32px. All 4 walls pink 4px
- Hearts row at x[60,160,280,380] top 10, opacity 0.3
- NPC at {496,368}, collision 32×32, zIndex 5
- "!" floats above NPC when `nearNpc && room2`; bottom hint "Press SPACE to talk!" when near
- NPC **shrug** pose only while showing the no-response line

## Dialogue (NPC, trigger = Space when near in room2)
- question: "Hey Etoile, do you\nknow what's special\nabout today?" + Yes/No
- Yes → hehe "HEHE!!" (big pink bounce) after **1500ms** → bouquet node "For you! 🌸" + bouquet blob (transparent blob w/ tulip at NPC.x+34,NPC.y-8, zIndex6, bouquetPop) after **1800ms** → flash overlay (flashIn 0.7s, **700ms**) → yes-ending
- No → no-response "AAAEEHGG too bad. I guess\ntoday is just like\nany other day." + Close → back to room2 (pos preserved)
- Bubble: white, 3px pink border, radius 12, tail triangle at bottom

## yes-ending
- Animated flashy gradient bg
- Fireworks every 200ms, 10 at a time, accumulation `slice(-50)`
- 6 bouncers (id 0-5): vy0 = -(rand*3+2), gravity +0.3/30ms, floor ROOM_H-40 → bounce -(rand*4+3)
- 5 swingers (id 100-104): x = 80+i*(ROOM_W-160)/4, spiderSwing 1.5s, delay (id%5)*0.3s, 120px vine, monkey offset left -13
- expr: swinging `id%5`, bouncing `(id+2)%5`
- Message "🎂 Happy birthday princess! 🎂 / 24 years old (:" + 🎉🐵🎂🐵🎉 + Play Again → room1 reset

## no-ending (currently UNREACHABLE — preserve as-is, don't add/remove)
- Gray bg, collapsed NPC (npcCollapse), 2 rain clouds, "NYA!" (nyaShake), "💔 Heartbroken... 💔", Try Again → room2

## Other
- Mobile arrow buttons feed keysRef (pointer down/up)
- Scale-to-fit on window resize: min(innerW/ROOM_W, innerH/ROOM_H)
- All @keyframes currently in ValentineGame `<style>` block must remain available to all scenes
