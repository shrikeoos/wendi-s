import React, { useState, useEffect, useCallback, useRef } from "react";
import { FemaleSprite, MaleSprite, Wardrobe, Door, Firework, MonkeySprite, RainCloud, FlowerSprite, PeekingMonkeyFace, CatSprite } from "./PixelSprites";

type GameState = "room1" | "room2" | "dialogue" | "yes-ending" | "no-ending";
type Direction = "down" | "up" | "left" | "right";

const TILE = 32;
const ROOM_W = 1024;
const ROOM_H = 768;
const SPEED = 1;

// Wardrobe positions in room 1
const WARDROBES = [
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

// Flower positions in room 1
type FlowerType = 'tulip' | 'lily' | 'hydrangea';
const FLOWERS: { x: number; y: number; type: FlowerType }[] = [
  { x: 158, y: 52, type: 'tulip' },
  { x: 340, y: 50, type: 'lily' },
  { x: 592, y: 50, type: 'hydrangea' },
  { x: 825, y: 52, type: 'tulip' },
  { x: 18, y: 175, type: 'hydrangea' },
  { x: 975, y: 190, type: 'lily' },
  { x: 248, y: 200, type: 'tulip' },
  { x: 495, y: 165, type: 'hydrangea' },
  { x: 230, y: 455, type: 'lily' },
  { x: 680, y: 455, type: 'tulip' },
  { x: 185, y: 680, type: 'hydrangea' },
  { x: 660, y: 680, type: 'lily' },
  { x: 880, y: 680, type: 'tulip' },
];

// Door dimensions for collision
const DOOR_W = 28;
const DOOR_H = 44;
const DOOR_PAD = 40; // padding from room edges

// NPC position in room 2
const NPC = { x: ROOM_W / 2 - 16, y: ROOM_H / 2 - 16 };

// Door on the left wall of room 2 (leads back to room 1)
const ROOM2_DOOR = { x: 4, y: ROOM_H / 2 - 22 };

const INTERACT_DIST = 50;

function rectsOverlap(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number
) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

// Generate a random door position that doesn't overlap any wardrobes
function randomDoorPosition(): { x: number; y: number } {
  const maxAttempts = 200;
  for (let i = 0; i < maxAttempts; i++) {
    const x = DOOR_PAD + Math.random() * (ROOM_W - DOOR_W - DOOR_PAD * 2);
    const y = DOOR_PAD + Math.random() * (ROOM_H - DOOR_H - DOOR_PAD * 2);
    // Check overlap with every wardrobe (with a 10px gap)
    const gap = 10;
    const overlaps = WARDROBES.some(w =>
      rectsOverlap(x - gap, y - gap, DOOR_W + gap * 2, DOOR_H + gap * 2, w.x, w.y, 40, 48)
    );
    if (!overlaps) return { x, y };
  }
  // Fallback if no valid spot found (unlikely)
  return { x: ROOM_W - 32, y: ROOM_H / 2 - 22 };
}

const ValentineGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("room1");
  const [pos, setPos] = useState({ x: ROOM_W / 2 - 16, y: ROOM_H / 2 - 16 });
  const [dir, setDir] = useState<Direction>("down");
  const [nearNpc, setNearNpc] = useState(false);
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [monkeys, setMonkeys] = useState<{ id: number; x: number; y: number; vy: number; swinging?: boolean }[]>([]);
  const [doorPos, setDoorPos] = useState(() => randomDoorPosition());
  const doorPosRef = useRef(doorPos);
  const keysRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);
  const fwIntervalRef = useRef<number>(0);
  const [scale, setScale] = useState(1);
  const [peekConfig, setPeekConfig] = useState<{ idx: number; side: "left" | "right" | "top" } | null>(null);
  const [dialoguePage, setDialoguePage] = useState<"question" | "no-response" | "hehe" | "bouquet">("question");
  const [catPos, setCatPos] = useState({ x: 400, y: 350 });
  const [catFacing, setCatFacing] = useState<"left" | "right">("right");
  const [showCatSpeech, setShowCatSpeech] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const peekTimerRef = useRef<number>(0);
  const catDxRef = useRef(1.5);
  const catDyRef = useRef(0);

  // Compute scale to fill window
  useEffect(() => {
    const updateScale = () => {
      const sx = window.innerWidth / ROOM_W;
      const sy = window.innerHeight / ROOM_H;
      setScale(Math.min(sx, sy));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Reset position when changing rooms
  useEffect(() => {
    if (gameState === "room1") {
      setPos({ x: ROOM_W / 2 - 16, y: ROOM_H / 2 - 16 });
      const newDoor = randomDoorPosition();
      setDoorPos(newDoor);
      doorPosRef.current = newDoor;
    }
  }, [gameState]);

  // Keyboard input
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (e.key === " " && nearNpc && gameState === "room2") {
        e.preventDefault();
        setDialoguePage("question");
        setGameState("dialogue");
      }
    };
    const onUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [nearNpc, gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== "room1" && gameState !== "room2") return;

    const loop = () => {
      const keys = keysRef.current;
      let dx = 0, dy = 0;
      if (keys.has("ArrowUp") || keys.has("w")) { dy = -SPEED; setDir("up"); }
      if (keys.has("ArrowDown") || keys.has("s")) { dy = SPEED; setDir("down"); }
      if (keys.has("ArrowLeft") || keys.has("a")) { dx = -SPEED; setDir("left"); }
      if (keys.has("ArrowRight") || keys.has("d")) { dx = SPEED; setDir("right"); }

      if (dx !== 0 || dy !== 0) {
        setPos(prev => {
          let nx = Math.max(0, Math.min(ROOM_W - TILE, prev.x + dx));
          let ny = Math.max(0, Math.min(ROOM_H - TILE, prev.y + dy));

          // Wardrobe collision (room1 only)
          if (gameState === "room1") {
            for (const w of WARDROBES) {
              if (rectsOverlap(nx, ny, TILE, TILE, w.x, w.y, 40, 48)) {
                nx = prev.x;
                ny = prev.y;
                break;
              }
            }
            // Door transition
            if (rectsOverlap(nx, ny, TILE, TILE, doorPosRef.current.x, doorPosRef.current.y, DOOR_W, DOOR_H)) {
              setGameState("room2");
              return { x: 80, y: ROOM_H / 2 - 16 };
            }
          }

          // NPC collision (room2)
          if (gameState === "room2") {
            if (rectsOverlap(nx, ny, TILE, TILE, NPC.x, NPC.y, TILE, TILE)) {
              nx = prev.x;
              ny = prev.y;
            }
            // Back-door to room 1
            if (rectsOverlap(nx, ny, TILE, TILE, ROOM2_DOOR.x, ROOM2_DOOR.y, DOOR_W, DOOR_H)) {
              setGameState("room1");
              return prev;
            }
          }

          return { x: nx, y: ny };
        });
      }

      // Check NPC proximity
      if (gameState === "room2") {
        setPos(prev => {
          const dist = Math.hypot(prev.x - NPC.x, prev.y - NPC.y);
          setNearNpc(dist < INTERACT_DIST);
          return prev;
        });
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameState]);

  // Fireworks effect
  useEffect(() => {
    if (gameState !== "yes-ending") return;
    const colors = ["#FF1493", "#FFD700", "#FF4500", "#00FF7F", "#1E90FF", "#FF69B4", "#FFA500", "#FF00FF", "#00FFFF"];
    const id = window.setInterval(() => {
      setFireworks(prev => [
        ...prev.slice(-50),
        ...Array.from({ length: 10 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * ROOM_W,
          y: Math.random() * ROOM_H,
          color: colors[Math.floor(Math.random() * colors.length)],
        })),
      ]);
    }, 200);
    fwIntervalRef.current = id;

    // Bouncing monkeys + swinging monkeys (from top like Spider-Man)
    const bouncers = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * (ROOM_W - 28),
      y: Math.random() * (ROOM_H - 60) + 30,
      vy: -(Math.random() * 3 + 2),
      swinging: false,
    }));
    const swingers = Array.from({ length: 5 }, (_, i) => ({
      id: 100 + i,
      x: 80 + i * (ROOM_W - 160) / 4,
      y: 0,
      vy: 0,
      swinging: true,
    }));
    setMonkeys([...bouncers, ...swingers]);

    return () => clearInterval(id);
  }, [gameState]);

  // Monkey bounce animation (only for non-swinging)
  useEffect(() => {
    if (gameState !== "yes-ending") return;
    const id = setInterval(() => {
      setMonkeys(prev =>
        prev.map(m => {
          if (m.swinging) return m; // swinging handled by CSS
          let ny = m.y + m.vy;
          let nvy = m.vy + 0.3;
          if (ny > ROOM_H - 40) {
            ny = ROOM_H - 40;
            nvy = -(Math.random() * 4 + 3);
          }
          return { ...m, y: ny, vy: nvy };
        })
      );
    }, 30);
    return () => clearInterval(id);
  }, [gameState]);

  // Monkey peeks from behind the nearest cabinet when player gets close
  useEffect(() => {
    if (gameState !== "room1") { setPeekConfig(null); return; }
    const PEEK_DIST = 100;
    const px = pos.x + TILE / 2;
    const py = pos.y + TILE / 2;
    let closest: number | null = null;
    let closestDist = Infinity;
    WARDROBES.forEach((w, i) => {
      const ww = w.variant % 3 === 1 ? 52 : 40;
      const wh = w.variant % 3 === 2 ? 56 : 48;
      const dist = Math.hypot(px - (w.x + ww / 2), py - (w.y + wh / 2));
      if (dist < PEEK_DIST && dist < closestDist) { closestDist = dist; closest = i; }
    });
    if (closest === null) { setPeekConfig(null); return; }
    const newIdx = closest;
    setPeekConfig(prev => {
      if (prev?.idx === newIdx) return prev;
      const sides: Array<"left" | "right" | "top"> = ["left", "right", "top"];
      return { idx: newIdx, side: sides[Math.floor(Math.random() * sides.length)] };
    });
  }, [pos, gameState]);

  // Cat wanders around room 1
  useEffect(() => {
    if (gameState !== "room1") return;
    const moveId = setInterval(() => {
      setCatPos(prev => {
        const nx = prev.x + catDxRef.current;
        const ny = prev.y + catDyRef.current;
        const cx = Math.max(30, Math.min(ROOM_W - 60, nx));
        const cy = Math.max(30, Math.min(ROOM_H - 60, ny));
        if (cx !== nx) {
          catDxRef.current = -catDxRef.current;
          setCatFacing(catDxRef.current > 0 ? "right" : "left");
        }
        if (cy !== ny) catDyRef.current = -catDyRef.current;
        return { x: cx, y: cy };
      });
    }, 30);
    const dirId = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;
      catDxRef.current = Math.cos(angle) * 1.5;
      catDyRef.current = Math.sin(angle) * 1.5;
      setCatFacing(catDxRef.current >= 0 ? "right" : "left");
    }, 2200);
    return () => { clearInterval(moveId); clearInterval(dirId); };
  }, [gameState]);

  const handleCatClick = () => {
    setShowCatSpeech(true);
    setTimeout(() => setShowCatSpeech(false), 2500);
  };

  const handleChoice = (choice: "yes" | "no") => {
    if (choice === "yes") {
      setDialoguePage("hehe");
      setTimeout(() => {
        setDialoguePage("bouquet");
        setTimeout(() => {
          setShowTransition(true);
          setTimeout(() => {
            setGameState("yes-ending");
            setShowTransition(false);
            setDialoguePage("question");
          }, 700);
        }, 1800);
      }, 1500);
    } else {
      setDialoguePage("no-response");
    }
  };

  const handleRetry = () => {
    setGameState("room2");
    setFireworks([]);
    setMonkeys([]);
    setShowTransition(false);
    setDialoguePage("question");
  };

  const handleRestart = () => {
    setGameState("room1");
    setFireworks([]);
    setMonkeys([]);
    setShowTransition(false);
    setDialoguePage("question");
  };

  return (
    <div className="flex items-center justify-center" style={{ background: "#1a1a2e", fontFamily: "'Press Start 2P', monospace", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @keyframes rainDrop {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        @keyframes bounceText {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatExclaim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes npcCollapse {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(0.3) translateY(10px); }
        }
        @keyframes nyaShake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes monkeySwing {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes spiderSwing {
          0% { transform: rotate(-35deg); }
          50% { transform: rotate(35deg); }
          100% { transform: rotate(-35deg); }
        }
        @keyframes flashyGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes peekIn {
          0% { opacity: 0; transform: translateX(10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes peekInLeft {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes peekInTop {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes flashIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes bouquetPop {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes catWalk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
      `}</style>


      {/* Game viewport */}
      <div
        className="relative overflow-hidden"
        style={{
          width: ROOM_W,
          height: ROOM_H,
          background: gameState === "room1" ? "#FFF5F8" : gameState === "room2" ? "#FFF0F5" : "#FFF0F5",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        tabIndex={0}
      >
        {/* Room 1 */}
        {gameState === "room1" && (
          <>
            {/* Floor — white tiles with soft pink dot pattern */}
            <div className="absolute inset-0" style={{
              backgroundColor: "#FFFBFC",
              backgroundImage: "radial-gradient(circle, #FFD6E8 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }} />
            {/* Walls */}
            <div className="absolute top-0 left-0 right-0" style={{ height: 6, background: "#FF69B4" }} />
            <div className="absolute bottom-0 left-0 right-0" style={{ height: 4, background: "#999" }} />
            <div className="absolute top-0 left-0 bottom-0" style={{ width: 4, background: "#999" }} />
            <div className="absolute top-0 right-0 bottom-0" style={{ width: 4, background: "#999" }} />

            {/* Flowers */}
            {FLOWERS.map((f, i) => (
              <div key={`flower-${i}`} className="absolute" style={{ left: f.x, top: f.y, zIndex: 2 }}>
                <FlowerSprite type={f.type} />
              </div>
            ))}

            {/* Peeking monkey behind cabinet */}
            {peekConfig !== null && (() => {
              const w = WARDROBES[peekConfig.idx];
              const wardrobeW = w.variant % 3 === 1 ? 52 : 40;
              const left = peekConfig.side === "right"
                ? w.x + wardrobeW - 6
                : peekConfig.side === "left"
                ? w.x - 18
                : w.x + Math.floor(wardrobeW / 2) - 12;
              const top = peekConfig.side === "top" ? w.y - 18 : w.y + 8;
              const anim = peekConfig.side === "right" ? "peekIn" : peekConfig.side === "left" ? "peekInLeft" : "peekInTop";
              return (
                <div className="absolute" style={{ left, top, zIndex: 3, animation: `${anim} 0.3s ease-out` }}>
                  <PeekingMonkeyFace flipped={peekConfig.side === "left"} />
                </div>
              );
            })()}

            {/* Wardrobes */}
            {WARDROBES.map((w, i) => (
              <div key={i} className="absolute" style={{ left: w.x, top: w.y, zIndex: 4 }}>
                <Wardrobe variant={w.variant} />
              </div>
            ))}

            {/* Door */}
            <div className="absolute" style={{ left: doorPos.x, top: doorPos.y }}>
              <Door />
            </div>

            {/* Player */}
            <div className="absolute transition-none" style={{ left: pos.x, top: pos.y, zIndex: 10 }}>
              <FemaleSprite direction={dir} />
            </div>

            {/* Cat — Poulet */}
            <div
              className="absolute"
              style={{ left: catPos.x, top: catPos.y, zIndex: 7, cursor: "pointer", animation: "catWalk 0.4s ease-in-out infinite" }}
              onClick={handleCatClick}
            >
              <CatSprite facing={catFacing} />
              {showCatSpeech && (
                <div className="absolute" style={{
                  bottom: "110%", left: "50%", transform: "translateX(-50%)",
                  background: "white", border: "2px solid #FF8C00",
                  borderRadius: 8, padding: "4px 8px",
                  fontSize: 7, fontFamily: "'Press Start 2P', monospace",
                  color: "#333", whiteSpace: "nowrap", zIndex: 20,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}>
                  My name is Poulet!
                  <div style={{
                    position: "absolute", bottom: -7, left: "50%", transform: "translateX(-50%)",
                    width: 0, height: 0,
                    borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
                    borderTop: "7px solid #FF8C00",
                  }} />
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2" style={{ color: "#666", fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}>
              Arrow keys to move → Find the door!
            </div>
          </>
        )}

        {/* Room 2 */}
        {(gameState === "room2" || gameState === "dialogue") && (
          <>
            {/* Floor */}
            <div className="absolute inset-0" style={{ background: "repeating-conic-gradient(#FFE4E1 0% 25%, #FFF0F5 0% 50%) 0 0 / 32px 32px" }} />
            {/* Pink walls */}
            <div className="absolute top-0 left-0 right-0" style={{ height: 4, background: "#FF69B4" }} />
            <div className="absolute bottom-0 left-0 right-0" style={{ height: 4, background: "#FF69B4" }} />
            <div className="absolute top-0 left-0 bottom-0" style={{ width: 4, background: "#FF69B4" }} />
            <div className="absolute top-0 right-0 bottom-0" style={{ width: 4, background: "#FF69B4" }} />

            {/* Hearts decoration on walls */}
            {[60, 160, 280, 380].map((x, i) => (
              <div key={i} className="absolute" style={{ left: x, top: 10, fontSize: 16, opacity: 0.3 }}>💕</div>
            ))}

            {/* Back door (to room 1) */}
            <div className="absolute" style={{ left: ROOM2_DOOR.x, top: ROOM2_DOOR.y }}>
              <Door />
            </div>

            {/* NPC */}
            <div className="absolute" style={{ left: NPC.x, top: NPC.y, zIndex: 5 }}>
              <MaleSprite />
              {/* Interaction indicator */}
              {nearNpc && gameState === "room2" && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2" style={{ animation: "floatExclaim 1s ease-in-out infinite", color: "#FFD700", fontSize: 16, fontWeight: "bold" }}>
                  !
                </div>
              )}
            </div>

            {/* Player */}
            <div className="absolute" style={{ left: pos.x, top: pos.y, zIndex: 10 }}>
              <FemaleSprite direction={dir} />
            </div>

            {/* Bouquet — appears when NPC pulls it out */}
            {dialoguePage === "bouquet" && (
              <div className="absolute" style={{
                left: NPC.x + 34, top: NPC.y - 8, zIndex: 6,
                animation: "bouquetPop 0.5s cubic-bezier(0.36,0.07,0.19,0.97) forwards",
              }}>
                {/* Transparent blob with a single tulip inside */}
                <div style={{ position: "relative", width: 48, height: 58 }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "rgba(220, 245, 255, 0.22)",
                    border: "2px solid rgba(180, 220, 255, 0.55)",
                    borderRadius: "58% 42% 52% 48% / 48% 56% 44% 52%",
                    boxShadow: "inset 0 0 14px rgba(255,255,255,0.45), 0 3px 10px rgba(160,210,255,0.25)",
                  }} />
                  <div style={{ position: "absolute", top: 10, left: 14 }}>
                    <FlowerSprite type="tulip" />
                  </div>
                </div>
              </div>
            )}

            {/* Dialogue */}
            {gameState === "dialogue" && (
              <div className="absolute left-1/2 -translate-x-1/2" style={{ top: NPC.y - 120, zIndex: 20 }}>
                <div className="relative" style={{
                  background: "white",
                  border: "3px solid #FF69B4",
                  borderRadius: 12,
                  padding: "12px 16px",
                  minWidth: 260,
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(255,105,180,0.3)",
                }}>
                  {dialoguePage === "question" && (
                    <>
                      <p style={{ fontSize: 9, fontFamily: "'Press Start 2P', monospace", color: "#333", lineHeight: 1.8, marginBottom: 12 }}>
                        Hey Etoile, do you<br />know what's special<br />about today?
                      </p>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleChoice("yes")}
                          className="px-3 py-2 cursor-pointer hover:scale-110 transition-transform"
                          style={{ background: "#FF69B4", color: "white", border: "2px solid #FF1493", borderRadius: 6, fontSize: 9, fontFamily: "'Press Start 2P', monospace" }}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => handleChoice("no")}
                          className="px-3 py-2 cursor-pointer hover:scale-110 transition-transform"
                          style={{ background: "#999", color: "white", border: "2px solid #777", borderRadius: 6, fontSize: 9, fontFamily: "'Press Start 2P', monospace" }}
                        >
                          No
                        </button>
                      </div>
                    </>
                  )}
                  {dialoguePage === "no-response" && (
                    <>
                      <p style={{ fontSize: 9, fontFamily: "'Press Start 2P', monospace", color: "#666", lineHeight: 1.8, marginBottom: 10 }}>
                        Oh too bad. I guess<br />today is just like<br />any other day.
                      </p>
                      <button
                        onClick={() => { setGameState("room2"); setDialoguePage("question"); }}
                        className="px-3 py-1 cursor-pointer hover:scale-110 transition-transform"
                        style={{ background: "#eee", color: "#555", border: "2px solid #ccc", borderRadius: 6, fontSize: 9, fontFamily: "'Press Start 2P', monospace" }}
                      >
                        ✕ Close
                      </button>
                    </>
                  )}
                  {dialoguePage === "hehe" && (
                    <p style={{ fontSize: 18, fontFamily: "'Press Start 2P', monospace", color: "#FF1493", lineHeight: 1.6, animation: "bounceText 0.5s ease-in-out infinite" }}>
                      HEHE!!
                    </p>
                  )}
                  {dialoguePage === "bouquet" && (
                    <p style={{ fontSize: 9, fontFamily: "'Press Start 2P', monospace", color: "#333", lineHeight: 1.8 }}>
                      For you! 🌸
                    </p>
                  )}
                  {/* Speech bubble tail */}
                  <div className="absolute left-1/2 -translate-x-1/2" style={{
                    bottom: -10, width: 0, height: 0,
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: "10px solid #FF69B4",
                  }} />
                </div>
              </div>
            )}

            {/* Hint text */}
            {nearNpc && gameState === "room2" && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2" style={{ color: "#FF69B4", fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}>
                Press SPACE to talk!
              </div>
            )}
          </>
        )}

        {/* Yes ending */}
        {gameState === "yes-ending" && (
          <>
            <div className="absolute inset-0" style={{
              background: "linear-gradient(-45deg, #FF0000, #FF1493, #FF69B4, #FF0055)",
              backgroundSize: "400% 400%",
              animation: "flashyGradient 3s ease infinite",
            }} />

            {/* Fireworks */}
            {fireworks.map(fw => (
              <Firework key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
            ))}

            {/* Monkeys */}
            {monkeys.map(m =>
              m.swinging ? (
                <div key={m.id} className="absolute" style={{ left: m.x, top: 0, zIndex: 15, animation: `spiderSwing 1.5s ease-in-out infinite`, animationDelay: `${(m.id % 5) * 0.3}s`, transformOrigin: "top center" }}>
                  {/* Vine/web line */}
                  <div style={{ width: 2, height: 120, background: "#556B2F", margin: "0 auto" }} />
                  <MonkeySprite swinging style={{ position: "relative", left: -13 }} />
                </div>
              ) : (
                <MonkeySprite key={m.id} style={{ left: m.x, top: m.y }} />
              )
            )}

            {/* Message */}
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 20 }}>
              <div style={{
                fontSize: 16,
                fontFamily: "'Press Start 2P', monospace",
                color: "white",
                textShadow: "2px 2px 0 #CC0044, -2px -2px 0 #CC0044",
                animation: "bounceText 1s ease-in-out infinite",
                textAlign: "center",
                lineHeight: 2,
              }}>
                🎂 Happy birthday<br />princess! 🎂
                <div style={{ fontSize: 12, marginTop: 8 }}>24 years old (:</div>
              </div>
              <div className="mt-4" style={{ fontSize: 28 }}>🎉🐵🎂🐵🎉</div>
              <button
                onClick={handleRestart}
                className="mt-6 px-3 py-2 cursor-pointer hover:scale-110 transition-transform"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.5)",
                  borderRadius: 6,
                  fontSize: 8,
                  fontFamily: "'Press Start 2P', monospace",
                  backdropFilter: "blur(4px)",
                }}
              >
                🔄 Play Again
              </button>
            </div>
          </>
        )}

        {/* No ending */}
        {gameState === "no-ending" && (
          <>
            <div className="absolute inset-0" style={{ background: "#E8E8E8" }} />

            {/* Collapsed NPC */}
            <div className="absolute" style={{ left: NPC.x, top: NPC.y + 10, zIndex: 5, animation: "npcCollapse 0.5s ease-out forwards" }}>
              <MaleSprite collapsed />
            </div>

            {/* Rain clouds */}
            <div className="absolute" style={{ left: NPC.x - 20, top: NPC.y - 30, zIndex: 10 }}>
              <RainCloud x={0} />
              <RainCloud x={30} />
            </div>

            {/* NYA! text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 20 }}>
              <div style={{
                fontSize: 32,
                fontFamily: "'Press Start 2P', monospace",
                color: "#FF4444",
                textShadow: "3px 3px 0 #000",
                animation: "nyaShake 0.3s ease-in-out infinite",
              }}>
                NYA!
              </div>
              <p className="mt-4" style={{ fontSize: 8, fontFamily: "'Press Start 2P', monospace", color: "#666" }}>
                💔 Heartbroken... 💔
              </p>
              <button
                onClick={handleRetry}
                className="mt-6 px-4 py-2 cursor-pointer hover:scale-110 transition-transform"
                style={{
                  background: "#FF69B4",
                  color: "white",
                  border: "2px solid #FF1493",
                  borderRadius: 6,
                  fontSize: 9,
                  fontFamily: "'Press Start 2P', monospace",
                }}
              >
                Try Again? 🔄
              </button>
            </div>
          </>
        )}

        {/* Transition flash overlay */}
        {showTransition && (
          <div className="absolute inset-0" style={{
            background: "linear-gradient(-45deg, #FF0000, #FF1493, #FF69B4)",
            zIndex: 200,
            animation: "flashIn 0.7s ease-in forwards",
          }} />
        )}
      </div>

      {/* Mobile controls */}
      <div className="mt-4 flex flex-col items-center gap-1 md:hidden">
        <button onPointerDown={() => keysRef.current.add("ArrowUp")} onPointerUp={() => keysRef.current.delete("ArrowUp")} className="w-10 h-10 flex items-center justify-center" style={{ background: "#333", color: "#fff", border: "2px solid #555", borderRadius: 4, fontSize: 16 }}>▲</button>
        <div className="flex gap-1">
          <button onPointerDown={() => keysRef.current.add("ArrowLeft")} onPointerUp={() => keysRef.current.delete("ArrowLeft")} className="w-10 h-10 flex items-center justify-center" style={{ background: "#333", color: "#fff", border: "2px solid #555", borderRadius: 4, fontSize: 16 }}>◀</button>
          <button onPointerDown={() => keysRef.current.add("ArrowDown")} onPointerUp={() => keysRef.current.delete("ArrowDown")} className="w-10 h-10 flex items-center justify-center" style={{ background: "#333", color: "#fff", border: "2px solid #555", borderRadius: 4, fontSize: 16 }}>▼</button>
          <button onPointerDown={() => keysRef.current.add("ArrowRight")} onPointerUp={() => keysRef.current.delete("ArrowRight")} className="w-10 h-10 flex items-center justify-center" style={{ background: "#333", color: "#fff", border: "2px solid #555", borderRadius: 4, fontSize: 16 }}>▶</button>
        </div>
      </div>
    </div>
  );
};

export default ValentineGame;
