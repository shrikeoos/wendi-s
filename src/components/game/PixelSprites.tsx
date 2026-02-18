import React from "react";

// Female character sprite (4 directions)
export const FemaleSprite: React.FC<{ direction: string }> = ({ direction }) => {
  // 16x16 pixel grid character
  return (
    <div className="relative" style={{ width: 32, height: 32, imageRendering: "pixelated" }}>
      {/* Tiara */}
      <div className="absolute" style={{ top: -4, left: 6, width: 20, height: 8, zIndex: 2 }}>
        {/* Base band */}
        <div className="absolute" style={{ bottom: 0, left: 0, width: 20, height: 3, background: "#FFD700" }} />
        {/* Points */}
        <div className="absolute" style={{ bottom: 3, left: 2, width: 3, height: 4, background: "#FFD700" }} />
        <div className="absolute" style={{ bottom: 3, left: 8, width: 4, height: 6, background: "#FFD700" }} />
        <div className="absolute" style={{ bottom: 3, left: 15, width: 3, height: 4, background: "#FFD700" }} />
        {/* Gems */}
        <div className="absolute" style={{ bottom: 5, left: 9, width: 2, height: 2, background: "#FF69B4" }} />
        <div className="absolute" style={{ bottom: 4, left: 3, width: 2, height: 2, background: "#00CED1" }} />
        <div className="absolute" style={{ bottom: 4, left: 15, width: 2, height: 2, background: "#00CED1" }} />
      </div>
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
  const clothesPalettes = [
    ["#FF69B4", "#FFD700", "#00CED1", "#FF6347"],
    ["#FF6347", "#9370DB", "#32CD32", "#FF1493"],
    ["#FF1493", "#00BFFF", "#FFA500", "#7B68EE"],
    ["#E74C3C", "#2ECC71", "#F1C40F", "#9B59B6"],
    ["#1ABC9C", "#E91E63", "#FF5722", "#3F51B5"],
    ["#FF4081", "#FFEB3B", "#00E5FF", "#76FF03"],
  ];
  const colors = clothesPalettes[variant % 6];

  // Different wardrobe wood colors
  const woodColors = ["#8B6914", "#5D4037", "#A0522D", "#6B3A2A", "#8B7355", "#4E342E"];
  const wood = woodColors[variant % 6];
  const woodDark = "#3E2723";

  // Different wardrobe styles based on variant
  const isWide = variant % 3 === 1;
  const isTall = variant % 3 === 2;
  const w = isWide ? 52 : 40;
  const h = isTall ? 56 : 48;

  return (
    <div className="relative" style={{ width: w, height: h, imageRendering: "pixelated" }}>
      {/* Wardrobe body */}
      <div className="absolute" style={{ top: 8, left: 2, width: w - 4, height: h - 8, background: wood, border: `2px solid ${woodDark}`, borderRadius: isTall ? "4px 4px 0 0" : 0 }} />
      {/* Door line(s) */}
      {isWide ? (
        <>
          <div className="absolute" style={{ top: 10, left: Math.floor(w / 3), width: 2, height: h - 12, background: woodDark }} />
          <div className="absolute" style={{ top: 10, left: Math.floor(w * 2 / 3), width: 2, height: h - 12, background: woodDark }} />
        </>
      ) : (
        <div className="absolute" style={{ top: 10, left: Math.floor(w / 2), width: 2, height: h - 12, background: woodDark }} />
      )}
      {/* Knobs */}
      <div className="absolute" style={{ top: Math.floor(h / 2), left: Math.floor(w / 2) - 6, width: 3, height: 3, background: "#FFD700", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: Math.floor(h / 2), left: Math.floor(w / 2) + 4, width: 3, height: 3, background: "#FFD700", borderRadius: "50%" }} />

      {/* Overflowing clothes - top */}
      <div className="absolute" style={{ top: 0, left: 3, width: 14, height: 10, background: colors[0], borderRadius: "4px 4px 0 0", transform: "rotate(-12deg)" }} />
      <div className="absolute" style={{ top: -2, left: w - 18, width: 12, height: 12, background: colors[1], borderRadius: "4px 4px 0 0", transform: "rotate(8deg)" }} />
      <div className="absolute" style={{ top: 2, left: Math.floor(w / 2) - 5, width: 10, height: 8, background: colors[2], borderRadius: "3px 3px 0 0", transform: "rotate(-5deg)" }} />

      {/* Sleeve/cloth hanging out sides */}
      <div className="absolute" style={{ top: Math.floor(h * 0.6), left: -6, width: 10, height: 5, background: colors[3], borderRadius: 2, transform: "rotate(-18deg)" }} />
      <div className="absolute" style={{ top: Math.floor(h * 0.4), left: w - 4, width: 12, height: 4, background: colors[0], borderRadius: 2, transform: "rotate(12deg)" }} />

      {/* Dangling item from bottom */}
      <div className="absolute" style={{ top: h - 4, left: 6, width: 8, height: 8, background: colors[1], borderRadius: "0 0 4px 4px", transform: "rotate(5deg)" }} />

      {/* Extra scarf/sock hanging */}
      {variant % 2 === 0 && (
        <div className="absolute" style={{ top: -4, left: w - 8, width: 6, height: 14, background: colors[3], borderRadius: 3, transform: "rotate(20deg)" }} />
      )}
      {variant % 2 === 1 && (
        <>
          <div className="absolute" style={{ top: h - 2, left: w - 14, width: 14, height: 5, background: colors[2], borderRadius: 2, transform: "rotate(-8deg)" }} />
          <div className="absolute" style={{ top: Math.floor(h * 0.7), left: -4, width: 6, height: 10, background: colors[1], borderRadius: "2px 0 0 2px" }} />
        </>
      )}
    </div>
  );
};

// Door sprite
export const Door: React.FC = () => (
  <div className="relative" style={{ width: 28, height: 44, imageRendering: "pixelated" }}>
    <div className="absolute inset-0" style={{ background: "#654321", border: "2px solid #4A2F15", borderRadius: "8px 8px 0 0" }} />
    <div className="absolute" style={{ top: 20, right: 4, width: 4, height: 4, background: "#FFD700", borderRadius: "50%" }} />
  </div>
);

// Firework burst with multiple particles
export const Firework: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => {
  const particles = [
    { dx: 0, dy: -14 }, { dx: 10, dy: -10 }, { dx: 14, dy: 0 }, { dx: 10, dy: 10 },
    { dx: 0, dy: 14 }, { dx: -10, dy: 10 }, { dx: -14, dy: 0 }, { dx: -10, dy: -10 },
    { dx: 7, dy: -16 }, { dx: -7, dy: -16 }, { dx: 16, dy: 7 }, { dx: -16, dy: 7 },
  ];
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <div className="animate-ping" style={{ position: "absolute", left: -5, top: -5, width: 10, height: 10, background: "white", borderRadius: "50%", opacity: 0.8 }} />
      {particles.map((p, i) => (
        <div key={i} className="animate-ping" style={{ position: "absolute", left: p.dx - 3, top: p.dy - 3, width: 6, height: 6, background: color, borderRadius: "50%", animationDelay: `${i * 0.04}s` }} />
      ))}
      {particles.slice(0, 8).map((p, i) => (
        <div key={`t${i}`} style={{ position: "absolute", left: p.dx * 0.5 - 1, top: p.dy * 0.5 - 1, width: 3, height: 3, background: color, borderRadius: "50%", opacity: 0.5 }} />
      ))}
    </div>
  );
};

// Monkey sprite with optional swinging animation
export const MonkeySprite: React.FC<{ style?: React.CSSProperties; swinging?: boolean }> = ({ style, swinging }) => (
  <div className="absolute" style={{
    width: 28, height: 28, imageRendering: "pixelated",
    ...(swinging ? { animation: "monkeySwing 0.8s ease-in-out infinite", transformOrigin: "top center" } : {}),
    ...style,
  }}>
    {/* Head */}
    <div className="absolute" style={{ top: 0, left: 4, width: 20, height: 16, background: "#8B4513", borderRadius: "8px 8px 4px 4px" }} />
    {/* Face */}
    <div className="absolute" style={{ top: 4, left: 8, width: 12, height: 10, background: "#DEB887", borderRadius: "4px" }} />
    {/* Eyes */}
    <div className="absolute" style={{ top: 6, left: 10, width: 3, height: 3, background: "#000" }} />
    <div className="absolute" style={{ top: 6, left: 16, width: 3, height: 3, background: "#000" }} />
    {/* Mouth */}
    <div className="absolute" style={{ top: 10, left: 12, width: 5, height: 2, background: "#8B0000", borderRadius: "0 0 3px 3px" }} />
    {/* Ears */}
    <div className="absolute" style={{ top: 4, left: 0, width: 6, height: 6, background: "#DEB887", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 4, left: 22, width: 6, height: 6, background: "#DEB887", borderRadius: "50%" }} />
    {/* Body */}
    <div className="absolute" style={{ top: 16, left: 6, width: 16, height: 10, background: "#8B4513", borderRadius: "0 0 4px 4px" }} />
    {/* Arms (raised if swinging) */}
    {swinging && (
      <>
        <div className="absolute" style={{ top: 2, left: 10, width: 3, height: 16, background: "#8B4513", borderRadius: 2, transform: "rotate(-10deg)" }} />
        <div className="absolute" style={{ top: 2, left: 16, width: 3, height: 16, background: "#8B4513", borderRadius: 2, transform: "rotate(10deg)" }} />
      </>
    )}
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
