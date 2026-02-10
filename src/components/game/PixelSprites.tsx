import React from "react";

// Female character sprite (4 directions)
export const FemaleSprite: React.FC<{ direction: string }> = ({ direction }) => {
  // 16x16 pixel grid character
  return (
    <div className="relative" style={{ width: 32, height: 32, imageRendering: "pixelated" }}>
      {/* Hair */}
      <div className="absolute" style={{ top: 0, left: 4, width: 24, height: 10, background: "#8B4513", borderRadius: "6px 6px 0 0" }} />
      <div className="absolute" style={{ top: 6, left: 2, width: 4, height: 12, background: "#8B4513" }} />
      <div className="absolute" style={{ top: 6, left: 26, width: 4, height: 12, background: "#8B4513" }} />
      {/* Face */}
      <div className="absolute" style={{ top: 6, left: 6, width: 20, height: 12, background: "#FDBCB4" }} />
      {/* Eyes */}
      {direction !== "up" && (
        <>
          <div className="absolute" style={{ top: 10, left: direction === "left" ? 8 : 10, width: 3, height: 3, background: "#333" }} />
          <div className="absolute" style={{ top: 10, left: direction === "left" ? 18 : 20, width: 3, height: 3, background: "#333" }} />
        </>
      )}
      {/* Mouth */}
      {direction !== "up" && (
        <div className="absolute" style={{ top: 14, left: 13, width: 6, height: 2, background: "#E8838A", borderRadius: 2 }} />
      )}
      {/* Body / Dress */}
      <div className="absolute" style={{ top: 18, left: 6, width: 20, height: 10, background: "#FF69B4", borderRadius: "0 0 4px 4px" }} />
      {/* Dress detail */}
      <div className="absolute" style={{ top: 20, left: 10, width: 12, height: 2, background: "#FF1493" }} />
      {/* Legs */}
      <div className="absolute" style={{ top: 28, left: 9, width: 4, height: 4, background: "#FDBCB4" }} />
      <div className="absolute" style={{ top: 28, left: 19, width: 4, height: 4, background: "#FDBCB4" }} />
    </div>
  );
};

// Male NPC sprite
export const MaleSprite: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => {
  if (collapsed) {
    // Melted/collapsed version
    return (
      <div className="relative" style={{ width: 32, height: 32, imageRendering: "pixelated" }}>
        <div className="absolute" style={{ top: 20, left: 2, width: 28, height: 12, background: "#4169E1", borderRadius: "50%", opacity: 0.7 }} />
        <div className="absolute" style={{ top: 16, left: 8, width: 16, height: 8, background: "#FDBCB4", borderRadius: "50%" }} />
        {/* Crying eyes */}
        <div className="absolute" style={{ top: 18, left: 11, width: 3, height: 4, background: "#66B2FF", borderRadius: "0 0 2px 2px" }} />
        <div className="absolute" style={{ top: 18, left: 19, width: 3, height: 4, background: "#66B2FF", borderRadius: "0 0 2px 2px" }} />
      </div>
    );
  }
  return (
    <div className="relative" style={{ width: 32, height: 32, imageRendering: "pixelated" }}>
      {/* Hair */}
      <div className="absolute" style={{ top: 0, left: 6, width: 20, height: 8, background: "#2F1B14", borderRadius: "6px 6px 0 0" }} />
      {/* Face */}
      <div className="absolute" style={{ top: 6, left: 6, width: 20, height: 12, background: "#FDBCB4" }} />
      {/* Eyes */}
      <div className="absolute" style={{ top: 10, left: 10, width: 3, height: 3, background: "#333" }} />
      <div className="absolute" style={{ top: 10, left: 20, width: 3, height: 3, background: "#333" }} />
      {/* Smile */}
      <div className="absolute" style={{ top: 14, left: 13, width: 6, height: 2, background: "#C0392B", borderRadius: 2 }} />
      {/* Body / Shirt */}
      <div className="absolute" style={{ top: 18, left: 6, width: 20, height: 10, background: "#4169E1", borderRadius: "0 0 4px 4px" }} />
      {/* Tie */}
      <div className="absolute" style={{ top: 18, left: 14, width: 4, height: 8, background: "#DC143C" }} />
      {/* Legs */}
      <div className="absolute" style={{ top: 28, left: 9, width: 4, height: 4, background: "#2C3E50" }} />
      <div className="absolute" style={{ top: 28, left: 19, width: 4, height: 4, background: "#2C3E50" }} />
    </div>
  );
};

// Wardrobe with overflowing clothes
export const Wardrobe: React.FC<{ variant?: number }> = ({ variant = 0 }) => {
  const clothesColors = [
    ["#FF69B4", "#FFD700", "#00CED1"],
    ["#FF6347", "#9370DB", "#32CD32"],
    ["#FF1493", "#00BFFF", "#FFA500"],
  ];
  const colors = clothesColors[variant % 3];

  return (
    <div className="relative" style={{ width: 40, height: 48, imageRendering: "pixelated" }}>
      {/* Wardrobe body */}
      <div className="absolute" style={{ top: 8, left: 2, width: 36, height: 40, background: "#8B6914", border: "2px solid #6B4F12" }} />
      {/* Door line */}
      <div className="absolute" style={{ top: 10, left: 19, width: 2, height: 36, background: "#6B4F12" }} />
      {/* Knobs */}
      <div className="absolute" style={{ top: 26, left: 15, width: 3, height: 3, background: "#FFD700", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 26, left: 23, width: 3, height: 3, background: "#FFD700", borderRadius: "50%" }} />
      {/* Overflowing clothes */}
      <div className="absolute" style={{ top: 2, left: 5, width: 14, height: 8, background: colors[0], borderRadius: "4px 4px 0 0", transform: "rotate(-10deg)" }} />
      <div className="absolute" style={{ top: 0, left: 20, width: 12, height: 10, background: colors[1], borderRadius: "4px 4px 0 0", transform: "rotate(8deg)" }} />
      {/* Sleeve hanging out */}
      <div className="absolute" style={{ top: 30, left: -4, width: 8, height: 4, background: colors[2], borderRadius: 2, transform: "rotate(-15deg)" }} />
      <div className="absolute" style={{ top: 38, left: 34, width: 10, height: 4, background: colors[0], borderRadius: 2, transform: "rotate(10deg)" }} />
    </div>
  );
};

// Door sprite
export const Door: React.FC = () => (
  <div className="relative" style={{ width: 28, height: 44, imageRendering: "pixelated" }}>
    <div className="absolute inset-0" style={{ background: "#654321", border: "2px solid #4A2F15", borderRadius: "8px 8px 0 0" }} />
    <div className="absolute" style={{ top: 20, right: 4, width: 4, height: 4, background: "#FFD700", borderRadius: "50%" }} />
    {/* Arrow hint */}
    <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-xs animate-pulse" style={{ color: "#FFD700", fontSize: 10, fontFamily: "monospace" }}>▶</div>
  </div>
);

// Firework particle
export const Firework: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <div
    className="absolute animate-ping"
    style={{
      left: x,
      top: y,
      width: 6,
      height: 6,
      background: color,
      borderRadius: "50%",
    }}
  />
);

// Monkey sprite
export const MonkeySprite: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div className="absolute" style={{ width: 28, height: 28, imageRendering: "pixelated", ...style }}>
    {/* Head */}
    <div className="absolute" style={{ top: 0, left: 4, width: 20, height: 16, background: "#8B4513", borderRadius: "8px 8px 4px 4px" }} />
    {/* Face */}
    <div className="absolute" style={{ top: 4, left: 8, width: 12, height: 10, background: "#DEB887", borderRadius: "4px" }} />
    {/* Eyes */}
    <div className="absolute" style={{ top: 6, left: 10, width: 3, height: 3, background: "#000" }} />
    <div className="absolute" style={{ top: 6, left: 16, width: 3, height: 3, background: "#000" }} />
    {/* Mouth/smile */}
    <div className="absolute" style={{ top: 10, left: 12, width: 5, height: 2, background: "#8B0000", borderRadius: "0 0 3px 3px" }} />
    {/* Ears */}
    <div className="absolute" style={{ top: 4, left: 0, width: 6, height: 6, background: "#DEB887", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 4, left: 22, width: 6, height: 6, background: "#DEB887", borderRadius: "50%" }} />
    {/* Body */}
    <div className="absolute" style={{ top: 16, left: 6, width: 16, height: 10, background: "#8B4513", borderRadius: "0 0 4px 4px" }} />
    {/* Tail */}
    <div className="absolute" style={{ top: 18, left: 22, width: 6, height: 3, background: "#8B4513", borderRadius: "0 4px 4px 0" }} />
  </div>
);

// Rain cloud
export const RainCloud: React.FC<{ x: number }> = ({ x }) => (
  <div className="absolute" style={{ left: x, top: -10 }}>
    <div style={{ width: 40, height: 20, background: "#708090", borderRadius: "10px", position: "relative" }}>
      <div className="absolute" style={{ top: 2, left: 6, width: 8, height: 8, background: "#5F6B7A", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 0, left: 14, width: 12, height: 12, background: "#5F6B7A", borderRadius: "50%" }} />
    </div>
    {/* Rain drops */}
    {[8, 16, 24, 32].map((dx, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          left: dx,
          top: 20,
          width: 2,
          height: 6,
          background: "#4FC3F7",
          animation: `rainDrop 0.6s ease-in infinite`,
          animationDelay: `${i * 0.15}s`,
        }}
      />
    ))}
  </div>
);
