import React from "react";
import { MaleSprite, RainCloud } from "../PixelSprites";
import { ROOM_W, ROOM_H } from "../engine/constants";

const NPC = { x: ROOM_W / 2 - 16, y: ROOM_H / 2 - 16 };

// Currently unreachable from the dialogue flow, but preserved for parity.
const NoEnding: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
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
        onClick={onRetry}
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
);

export default NoEnding;
