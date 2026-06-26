import React, { useEffect, useState } from "react";
import { Firework, MonkeySprite } from "../PixelSprites";
import { ROOM_W, ROOM_H } from "../engine/constants";

interface Fw { id: number; x: number; y: number; color: string; variant: number }
interface Monkey { id: number; x: number; y: number; vy: number; swinging: boolean }

const YesEnding: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  const [fireworks, setFireworks] = useState<Fw[]>([]);
  const [monkeys, setMonkeys] = useState<Monkey[]>([]);

  // Spawn fireworks + monkeys
  useEffect(() => {
    // Flashy, high-contrast colors that pop against the red/pink ending bg
    // (pinks/magentas omitted — they blend into the background).
    const colors = [
      "#00FFFF", // cyan
      "#39FF14", // neon green
      "#FFFF00", // yellow
      "#FFFFFF", // white
      "#00E5FF", // bright sky
      "#7CFC00", // lawn green
      "#1E90FF", // dodger blue
      "#BF00FF", // electric purple
      "#FFD700", // gold
      "#00FF7F", // spring green
      "#CCFF00", // chartreuse
      "#FFA500", // orange
    ];
    const fwId = window.setInterval(() => {
      setFireworks(prev => [
        // Retain enough that the longer bursts finish before being culled
        ...prev.slice(-80),
        ...Array.from({ length: 6 }, (_, i) => ({
          id: Date.now() + i,
          x: 40 + Math.random() * (ROOM_W - 80),
          y: 40 + Math.random() * (ROOM_H - 160),
          color: colors[Math.floor(Math.random() * colors.length)],
          variant: Math.floor(Math.random() * 5),
        })),
      ]);
    }, 220);

    const bouncers: Monkey[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * (ROOM_W - 28),
      y: Math.random() * (ROOM_H - 60) + 30,
      vy: -(Math.random() * 3 + 2),
      swinging: false,
    }));
    const swingers: Monkey[] = Array.from({ length: 5 }, (_, i) => ({
      id: 100 + i,
      x: 80 + (i * (ROOM_W - 160)) / 4,
      y: 0,
      vy: 0,
      swinging: true,
    }));
    setMonkeys([...bouncers, ...swingers]);

    return () => clearInterval(fwId);
  }, []);

  // Bounce physics for the non-swinging monkeys
  useEffect(() => {
    const id = window.setInterval(() => {
      setMonkeys(prev =>
        prev.map(m => {
          if (m.swinging) return m;
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
  }, []);

  return (
    <>
      <div className="absolute inset-0" style={{
        background: "linear-gradient(-45deg, #FF0000, #FF1493, #FF69B4, #FF0055)",
        backgroundSize: "400% 400%",
        animation: "flashyGradient 3s ease infinite",
      }} />

      {/* Fireworks */}
      {fireworks.map(fw => (
        <Firework key={fw.id} x={fw.x} y={fw.y} color={fw.color} variant={fw.variant} />
      ))}

      {/* Monkeys */}
      {monkeys.map(m =>
        m.swinging ? (
          <div key={m.id} className="absolute" style={{ left: m.x, top: 0, zIndex: 15, animation: "spiderSwing 1.5s ease-in-out infinite", animationDelay: `${(m.id % 5) * 0.3}s`, transformOrigin: "top center" }}>
            <div style={{ width: 2, height: 120, background: "#556B2F", margin: "0 auto" }} />
            <MonkeySprite swinging expr={m.id % 5} style={{ position: "relative", left: -13 }} />
          </div>
        ) : (
          <MonkeySprite key={m.id} expr={(m.id + 2) % 5} style={{ left: m.x, top: m.y }} />
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
          onClick={onRestart}
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
  );
};

export default YesEnding;
