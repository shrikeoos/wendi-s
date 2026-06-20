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

// Baby orangutan sprite
export const MonkeySprite: React.FC<{ style?: React.CSSProperties; swinging?: boolean }> = ({ style, swinging }) => (
  <div className="absolute" style={{
    width: 32, height: 32, imageRendering: "pixelated",
    ...(swinging ? { animation: "monkeySwing 0.8s ease-in-out infinite", transformOrigin: "top center" } : {}),
    ...style,
  }}>
    {/* Fluffy cheek puffs */}
    <div className="absolute" style={{ top: 4, left: 0, width: 9, height: 9, background: "#C86420", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 4, left: 23, width: 9, height: 9, background: "#C86420", borderRadius: "50%" }} />
    {/* Head (large & round — baby orangutan) */}
    <div className="absolute" style={{ top: 0, left: 4, width: 24, height: 20, background: "#C86420", borderRadius: "50% 50% 40% 40%" }} />
    {/* Face disk (light) */}
    <div className="absolute" style={{ top: 5, left: 8, width: 16, height: 13, background: "#FFB87A", borderRadius: "40% 40% 50% 50%" }} />
    {/* Big baby eyes */}
    <div className="absolute" style={{ top: 7, left: 10, width: 5, height: 5, background: "#111", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 7, left: 17, width: 5, height: 5, background: "#111", borderRadius: "50%" }} />
    {/* Eye highlights */}
    <div className="absolute" style={{ top: 8, left: 11, width: 2, height: 2, background: "#FFF", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 8, left: 18, width: 2, height: 2, background: "#FFF", borderRadius: "50%" }} />
    {/* Nose */}
    <div className="absolute" style={{ top: 13, left: 13, width: 6, height: 3, background: "#8B4513", borderRadius: "50%" }} />
    {/* Mouth */}
    <div className="absolute" style={{ top: 16, left: 12, width: 8, height: 2, background: "#7A2E00", borderRadius: "0 0 4px 4px" }} />
    {/* Body */}
    <div className="absolute" style={{ top: 20, left: 7, width: 18, height: 10, background: "#C86420", borderRadius: "0 0 6px 6px" }} />
    {/* Belly patch */}
    <div className="absolute" style={{ top: 22, left: 10, width: 12, height: 7, background: "#D4885E", borderRadius: "50%" }} />
    {/* Long orangutan arms */}
    {swinging ? (
      <>
        <div className="absolute" style={{ top: 0, left: 9, width: 4, height: 22, background: "#C86420", borderRadius: 3, transform: "rotate(-12deg)" }} />
        <div className="absolute" style={{ top: 0, left: 19, width: 4, height: 22, background: "#C86420", borderRadius: 3, transform: "rotate(12deg)" }} />
      </>
    ) : (
      <>
        <div className="absolute" style={{ top: 20, left: 1, width: 4, height: 10, background: "#C86420", borderRadius: 2, transform: "rotate(-20deg)" }} />
        <div className="absolute" style={{ top: 20, left: 27, width: 4, height: 10, background: "#C86420", borderRadius: 2, transform: "rotate(20deg)" }} />
      </>
    )}
    {/* Tail */}
    <div className="absolute" style={{ top: 24, left: 26, width: 7, height: 4, background: "#C86420", borderRadius: "0 4px 4px 0" }} />
  </div>
);

// Orange cat sprite — front-facing so both eyes are always visible
// facing prop flips the tail side via scaleX
export const CatSprite: React.FC<{ facing?: "left" | "right" }> = ({ facing = "right" }) => (
  <div className="relative" style={{ width: 34, height: 32, imageRendering: "pixelated", transform: facing === "left" ? "scaleX(-1)" : undefined }}>
    {/* Left ear */}
    <div className="absolute" style={{ top: -4, left: 6, width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "10px solid #FF8C00" }} />
    {/* Left inner ear */}
    <div className="absolute" style={{ top: -1, left: 8, width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderBottom: "6px solid #FF69B4" }} />
    {/* Right ear */}
    <div className="absolute" style={{ top: -4, left: 21, width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "10px solid #FF8C00" }} />
    {/* Right inner ear */}
    <div className="absolute" style={{ top: -1, left: 23, width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderBottom: "6px solid #FF69B4" }} />
    {/* Head */}
    <div className="absolute" style={{ top: 1, left: 4, width: 26, height: 18, background: "#FF8C00", borderRadius: "50% 50% 38% 38%" }} />
    {/* Face (lighter centre) */}
    <div className="absolute" style={{ top: 6, left: 9, width: 16, height: 11, background: "#FFB048", borderRadius: "40%" }} />
    {/* Left eye — iris */}
    <div className="absolute" style={{ top: 7, left: 9, width: 6, height: 6, background: "#3DB547", borderRadius: "50%" }} />
    {/* Left eye — pupil */}
    <div className="absolute" style={{ top: 8, left: 11, width: 2, height: 4, background: "#111", borderRadius: "50%" }} />
    {/* Left eye — shine */}
    <div className="absolute" style={{ top: 8, left: 11, width: 1, height: 1, background: "#FFF" }} />
    {/* Right eye — iris */}
    <div className="absolute" style={{ top: 7, left: 20, width: 6, height: 6, background: "#3DB547", borderRadius: "50%" }} />
    {/* Right eye — pupil */}
    <div className="absolute" style={{ top: 8, left: 22, width: 2, height: 4, background: "#111", borderRadius: "50%" }} />
    {/* Right eye — shine */}
    <div className="absolute" style={{ top: 8, left: 22, width: 1, height: 1, background: "#FFF" }} />
    {/* Nose */}
    <div className="absolute" style={{ top: 14, left: 15, width: 5, height: 3, background: "#FF69B4", borderRadius: "50%" }} />
    {/* Mouth — left curve */}
    <div className="absolute" style={{ top: 17, left: 11, width: 5, height: 2, background: "#CC5577", borderRadius: "0 0 4px 0" }} />
    {/* Mouth — right curve */}
    <div className="absolute" style={{ top: 17, left: 18, width: 5, height: 2, background: "#CC5577", borderRadius: "0 0 0 4px" }} />
    {/* Body */}
    <div className="absolute" style={{ top: 18, left: 5, width: 24, height: 12, background: "#FF8C00", borderRadius: "0 0 8px 8px" }} />
    {/* Belly */}
    <div className="absolute" style={{ top: 20, left: 10, width: 14, height: 8, background: "#FFF0C8", borderRadius: "50%" }} />
    {/* Body stripe left */}
    <div className="absolute" style={{ top: 19, left: 5, width: 2, height: 10, background: "#CC6600", opacity: 0.4, borderRadius: 1 }} />
    {/* Body stripe right */}
    <div className="absolute" style={{ top: 19, left: 27, width: 2, height: 10, background: "#CC6600", opacity: 0.4, borderRadius: 1 }} />
    {/* Paw left */}
    <div className="absolute" style={{ bottom: 0, left: 7, width: 7, height: 5, background: "#FF9020", borderRadius: "50% 50% 60% 60%" }} />
    {/* Paw right */}
    <div className="absolute" style={{ bottom: 0, left: 20, width: 7, height: 5, background: "#FF9020", borderRadius: "50% 50% 60% 60%" }} />
    {/* Tail — on the right side, flips with scaleX */}
    <div className="absolute" style={{ bottom: 4, left: 30, width: 10, height: 5, background: "#E07810", borderRadius: "0 50% 50% 0", transform: "rotate(-15deg)" }} />
  </div>
);

// Bouquet of flowers (for NPC gift)
export const BouquetSprite: React.FC = () => (
  <div className="relative" style={{ width: 30, height: 40, imageRendering: "pixelated" }}>
    {/* Paper wrap */}
    <div className="absolute" style={{ top: 24, left: 5, width: 20, height: 16, background: "#FFF5E0", borderRadius: "2px 2px 8px 8px", border: "1px solid #DDD0B0" }} />
    {/* Ribbon */}
    <div className="absolute" style={{ top: 24, left: 3, width: 24, height: 4, background: "#FFB7C5", borderRadius: 2 }} />
    {/* Stems */}
    <div className="absolute" style={{ top: 12, left: 14, width: 2, height: 14, background: "#228B22" }} />
    <div className="absolute" style={{ top: 14, left: 9, width: 2, height: 12, background: "#228B22", transform: "rotate(-12deg)" }} />
    <div className="absolute" style={{ top: 14, left: 19, width: 2, height: 12, background: "#228B22", transform: "rotate(12deg)" }} />
    {/* Left flower */}
    <div className="absolute" style={{ top: 2, left: 1, width: 11, height: 11, background: "#FF3366", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 5, left: 4, width: 5, height: 5, background: "#FFD700", borderRadius: "50%", zIndex: 2 }} />
    {/* Center flower */}
    <div className="absolute" style={{ top: 0, left: 10, width: 12, height: 12, background: "#FF69B4", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 3, left: 13, width: 6, height: 6, background: "#FFD700", borderRadius: "50%", zIndex: 2 }} />
    {/* Right flower */}
    <div className="absolute" style={{ top: 2, left: 19, width: 11, height: 11, background: "#FF1493", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 5, left: 22, width: 5, height: 5, background: "#FFD700", borderRadius: "50%", zIndex: 2 }} />
    {/* Leaves */}
    <div className="absolute" style={{ top: 14, left: 2, width: 8, height: 5, background: "#32CD32", borderRadius: "50%", transform: "rotate(-25deg)" }} />
    <div className="absolute" style={{ top: 14, left: 20, width: 8, height: 5, background: "#32CD32", borderRadius: "50%", transform: "rotate(25deg)" }} />
  </div>
);

// Flower sprite (tulip, lily, or hydrangea)
export const FlowerSprite: React.FC<{ type: 'tulip' | 'lily' | 'hydrangea' }> = ({ type }) => {
  if (type === 'tulip') {
    return (
      <div className="relative" style={{ width: 20, height: 30, imageRendering: "pixelated" }}>
        <div className="absolute" style={{ top: 14, left: 9, width: 2, height: 16, background: "#228B22" }} />
        <div className="absolute" style={{ top: 20, left: 2, width: 9, height: 4, background: "#32CD32", borderRadius: "50%", transform: "rotate(-25deg)" }} />
        <div className="absolute" style={{ top: 22, left: 9, width: 9, height: 4, background: "#32CD32", borderRadius: "50%", transform: "rotate(25deg)" }} />
        <div className="absolute" style={{ top: 2, left: 3, width: 14, height: 14, background: "#FF3366", borderRadius: "50% 50% 30% 30%" }} />
        <div className="absolute" style={{ top: 4, left: 6, width: 4, height: 8, background: "#FF80AB", borderRadius: "50%", opacity: 0.7 }} />
      </div>
    );
  }
  if (type === 'lily') {
    return (
      <div className="relative" style={{ width: 24, height: 30, imageRendering: "pixelated" }}>
        <div className="absolute" style={{ top: 15, left: 11, width: 2, height: 15, background: "#228B22" }} />
        <div className="absolute" style={{ top: 22, left: 2, width: 10, height: 4, background: "#32CD32", borderRadius: "50%", transform: "rotate(-30deg)" }} />
        <div className="absolute" style={{ top: 1, left: 9, width: 6, height: 12, background: "#FFFDE7", borderRadius: "50%" }} />
        <div className="absolute" style={{ top: 4, left: 14, width: 10, height: 6, background: "#FFFDE7", borderRadius: "50%", transform: "rotate(60deg)" }} />
        <div className="absolute" style={{ top: 10, left: 12, width: 8, height: 8, background: "#FFFDE7", borderRadius: "50%" }} />
        <div className="absolute" style={{ top: 10, left: 4, width: 8, height: 8, background: "#FFFDE7", borderRadius: "50%" }} />
        <div className="absolute" style={{ top: 4, left: 0, width: 10, height: 6, background: "#FFFDE7", borderRadius: "50%", transform: "rotate(-60deg)" }} />
        <div className="absolute" style={{ top: 7, left: 9, width: 6, height: 6, background: "#FFD700", borderRadius: "50%", zIndex: 2 }} />
      </div>
    );
  }
  return (
    <div className="relative" style={{ width: 22, height: 28, imageRendering: "pixelated" }}>
      <div className="absolute" style={{ top: 16, left: 10, width: 2, height: 12, background: "#228B22" }} />
      <div className="absolute" style={{ top: 22, left: 2, width: 10, height: 4, background: "#32CD32", borderRadius: "50%", transform: "rotate(-20deg)" }} />
      <div className="absolute" style={{ top: 0, left: 8, width: 8, height: 8, background: "#9B59B6", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 4, left: 13, width: 7, height: 7, background: "#8E44AD", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 4, left: 2, width: 7, height: 7, background: "#A569BD", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 9, left: 7, width: 8, height: 7, background: "#7D3C98", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 3, left: 11, width: 2, height: 2, background: "#FFF", borderRadius: "50%", zIndex: 2 }} />
      <div className="absolute" style={{ top: 7, left: 15, width: 2, height: 2, background: "#FFF", borderRadius: "50%", zIndex: 2 }} />
      <div className="absolute" style={{ top: 7, left: 4, width: 2, height: 2, background: "#FFF", borderRadius: "50%", zIndex: 2 }} />
      <div className="absolute" style={{ top: 12, left: 10, width: 2, height: 2, background: "#FFF", borderRadius: "50%", zIndex: 2 }} />
    </div>
  );
};

// Peeking baby orangutan face (for behind-cabinet effect)
export const PeekingMonkeyFace: React.FC = () => (
  <div style={{ width: 24, height: 22, imageRendering: "pixelated", position: "relative" }}>
    {/* Fluffy cheek puff on visible side */}
    <div className="absolute" style={{ top: 4, left: -3, width: 9, height: 9, background: "#C86420", borderRadius: "50%" }} />
    {/* Head */}
    <div className="absolute" style={{ top: 0, left: 2, width: 20, height: 18, background: "#C86420", borderRadius: "50% 50% 40% 40%" }} />
    {/* Face disk */}
    <div className="absolute" style={{ top: 4, left: 5, width: 14, height: 12, background: "#FFB87A", borderRadius: "40%" }} />
    {/* Big surprised eyes */}
    <div className="absolute" style={{ top: 6, left: 6, width: 5, height: 5, background: "#111", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 6, left: 13, width: 5, height: 5, background: "#111", borderRadius: "50%" }} />
    {/* Eye highlights */}
    <div className="absolute" style={{ top: 7, left: 7, width: 2, height: 2, background: "#FFF", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 7, left: 14, width: 2, height: 2, background: "#FFF", borderRadius: "50%" }} />
    {/* Nose */}
    <div className="absolute" style={{ top: 12, left: 9, width: 6, height: 3, background: "#8B4513", borderRadius: "50%" }} />
    {/* Surprised mouth (O shape) */}
    <div className="absolute" style={{ top: 15, left: 11, width: 4, height: 3, background: "#7A2E00", borderRadius: "50%" }} />
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
