import React, { useState, useEffect, useCallback, useRef } from "react";
import { FemaleSprite, MaleSprite, Wardrobe, Door, Firework, MonkeySprite, RainCloud } from "./PixelSprites";

type GameState = "room1" | "room2" | "dialogue" | "yes-ending" | "no-ending";
type Direction = "down" | "up" | "left" | "right";

const TILE = 32;
const ROOM_W = 1024;
const ROOM_H = 768;
const SPEED = 4;

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

// Door position (right wall)
const DOOR = { x: ROOM_W - 32, y: ROOM_H / 2 - 22 };

// NPC position in room 2
const NPC = { x: ROOM_W / 2 - 16, y: ROOM_H / 2 - 16 };

const INTERACT_DIST = 50;

function rectsOverlap(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number
) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

const ValentineGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("room1");
  const [pos, setPos] = useState({ x: ROOM_W / 2 - 16, y: ROOM_H / 2 - 16 });
  const [dir, setDir] = useState<Direction>("down");
  const [nearNpc, setNearNpc] = useState(false);
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [monkeys, setMonkeys] = useState<{ id: number; x: number; y: number; vy: number; swinging?: boolean }[]>([]);
  const keysRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);
  const fwIntervalRef = useRef<number>(0);

  // Reset position when changing rooms
  useEffect(() => {
    if (gameState === "room1") {
      setPos({ x: ROOM_W / 2 - 16, y: ROOM_H / 2 - 16 });
    } else if (gameState === "room2") {
      setPos({ x: 40, y: ROOM_H / 2 - 16 });
    }
  }, [gameState]);

  // Keyboard input
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (e.key === " " && nearNpc && gameState === "room2") {
        e.preventDefault();
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
            if (rectsOverlap(nx, ny, TILE, TILE, DOOR.x, DOOR.y, 28, 44)) {
              setGameState("room2");
              return prev;
            }
          }

          // NPC collision (room2)
          if (gameState === "room2") {
            if (rectsOverlap(nx, ny, TILE, TILE, NPC.x, NPC.y, TILE, TILE)) {
              nx = prev.x;
              ny = prev.y;
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

  const handleChoice = (choice: "yes" | "no") => {
    setGameState(choice === "yes" ? "yes-ending" : "no-ending");
  };

  const handleRetry = () => {
    setGameState("room2");
    setFireworks([]);
    setMonkeys([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: "#1a1a2e", fontFamily: "'Press Start 2P', monospace" }}>
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
      `}</style>


      {/* Game viewport */}
      <div
        className="relative overflow-hidden"
        style={{
          width: ROOM_W,
          height: ROOM_H,
          border: "4px solid #333",
          borderRadius: 4,
          background: gameState === "room1" ? "#FFF5F8" : gameState === "room2" ? "#FFF0F5" : "#FFF0F5",
          boxShadow: "0 0 20px rgba(255,105,180,0.3)",
        }}
        tabIndex={0}
      >
        {/* Room 1 */}
        {gameState === "room1" && (
          <>
            {/* Floor pattern */}
            <div className="absolute inset-0" style={{ background: "repeating-conic-gradient(#f0f0f0 0% 25%, #e8e8e8 0% 50%) 0 0 / 32px 32px" }} />
            {/* Walls */}
            <div className="absolute top-0 left-0 right-0" style={{ height: 6, background: "#FF69B4" }} />
            <div className="absolute bottom-0 left-0 right-0" style={{ height: 4, background: "#999" }} />
            <div className="absolute top-0 left-0 bottom-0" style={{ width: 4, background: "#999" }} />
            <div className="absolute top-0 right-0 bottom-0" style={{ width: 4, background: "#999" }} />

            {/* Wardrobes */}
            {WARDROBES.map((w, i) => (
              <div key={i} className="absolute" style={{ left: w.x, top: w.y }}>
                <Wardrobe variant={w.variant} />
              </div>
            ))}

            {/* Door */}
            <div className="absolute" style={{ left: DOOR.x, top: DOOR.y }}>
              <Door />
            </div>

            {/* Player */}
            <div className="absolute transition-none" style={{ left: pos.x, top: pos.y, zIndex: 10 }}>
              <FemaleSprite direction={dir} />
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

            {/* Dialogue */}
            {gameState === "dialogue" && (
              <div className="absolute left-1/2 -translate-x-1/2" style={{ top: NPC.y - 100, zIndex: 20 }}>
                <div className="relative" style={{
                  background: "white",
                  border: "3px solid #FF69B4",
                  borderRadius: 12,
                  padding: "12px 16px",
                  minWidth: 220,
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(255,105,180,0.3)",
                }}>
                  <p style={{ fontSize: 10, fontFamily: "'Press Start 2P', monospace", color: "#333", lineHeight: 1.6, marginBottom: 12 }}>
                    Hey Wendi! Will you<br />be my Valentine? ❤️
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleChoice("yes")}
                      className="px-3 py-2 cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        background: "#FF69B4",
                        color: "white",
                        border: "2px solid #FF1493",
                        borderRadius: 6,
                        fontSize: 9,
                        fontFamily: "'Press Start 2P', monospace",
                      }}
                    >
                      Yes! 💖
                    </button>
                    <button
                      onClick={() => handleChoice("no")}
                      className="px-3 py-2 cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        background: "#999",
                        color: "white",
                        border: "2px solid #777",
                        borderRadius: 6,
                        fontSize: 9,
                        fontFamily: "'Press Start 2P', monospace",
                      }}
                    >
                      No 😅
                    </button>
                  </div>
                  {/* Speech bubble tail */}
                  <div className="absolute left-1/2 -translate-x-1/2" style={{
                    bottom: -10,
                    width: 0,
                    height: 0,
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
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #FF69B4, #FFD700, #FF1493)" }} />

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
                textShadow: "2px 2px 0 #FF1493, -2px -2px 0 #FF1493",
                animation: "bounceText 1s ease-in-out infinite",
                textAlign: "center",
                lineHeight: 2,
              }}>
                🎉 Happy Valentine's Day! 🎉
              </div>
              <div className="mt-4" style={{ fontSize: 28 }}>💕🐵💖🐵💕</div>
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
