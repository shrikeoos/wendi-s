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
      <div className="absolute" style={{ top: 0, left: 4, width: 24, height: 10, background: "#1A1A1A", borderRadius: "6px 6px 0 0" }} />
      <div className="absolute" style={{ top: 6, left: 2, width: 4, height: 12, background: "#1A1A1A" }} />
      <div className="absolute" style={{ top: 6, left: 26, width: 4, height: 12, background: "#1A1A1A" }} />
      {/* Face */}
      <div className="absolute" style={{ top: 6, left: 6, width: 20, height: 12, background: "#FDBCB4" }} />
      {/* Back of head — hair covers the face when walking away */}
      {direction === "up" && (
        <>
          <div className="absolute" style={{ top: 6, left: 6, width: 20, height: 12, background: "#1A1A1A" }} />
          {/* Hair flowing down her back */}
          <div className="absolute" style={{ top: 16, left: 7, width: 18, height: 8, background: "#1A1A1A", borderRadius: "0 0 6px 6px", zIndex: 1 }} />
        </>
      )}
      {/* Eyes */}
      {direction !== "up" && (
        <>
          <div className="absolute" style={{ top: 10, left: direction === "left" ? 8 : direction === "right" ? 12 : 10, width: 3, height: 3, background: "#333" }} />
          <div className="absolute" style={{ top: 10, left: direction === "left" ? 18 : direction === "right" ? 22 : 20, width: 3, height: 3, background: "#333" }} />
        </>
      )}
      {/* Mouth */}
      {direction !== "up" && (
        <div className="absolute" style={{ top: 14, left: 13, width: 6, height: 2, background: "#E8838A", borderRadius: 2 }} />
      )}
      {/* Body / Dress */}
      <div className="absolute" style={{ top: 18, left: 6, width: 20, height: 10, background: "#D62828", borderRadius: "0 0 4px 4px" }} />
      {/* Dress detail */}
      <div className="absolute" style={{ top: 20, left: 10, width: 12, height: 2, background: "#9A1414" }} />
      {/* Legs */}
      <div className="absolute" style={{ top: 28, left: 9, width: 4, height: 4, background: "#FDBCB4" }} />
      <div className="absolute" style={{ top: 28, left: 19, width: 4, height: 4, background: "#FDBCB4" }} />
    </div>
  );
};

// Male NPC sprite. `look` shifts the pupils (range ~[-1,1]) so the NPC can
// track the player around the room.
export const MaleSprite: React.FC<{ collapsed?: boolean; shrug?: boolean; look?: { x: number; y: number } }> = ({ collapsed, shrug, look }) => {
  if (shrug) {
    // "I dunno" shrug — raised shoulders, bent arms, palms up
    return (
      <div className="relative" style={{ width: 32, height: 32, imageRendering: "pixelated", animation: "shrug 1.6s ease-in-out infinite" }}>
        {/* Hair */}
        <div className="absolute" style={{ top: 0, left: 6, width: 20, height: 8, background: "#2F1B14", borderRadius: "6px 6px 0 0" }} />
        {/* Face */}
        <div className="absolute" style={{ top: 6, left: 6, width: 20, height: 12, background: "#FDBCB4" }} />
        {/* Puzzled raised eyebrows */}
        <div className="absolute" style={{ top: 8, left: 9, width: 4, height: 1, background: "#2F1B14", transform: "rotate(-14deg)" }} />
        <div className="absolute" style={{ top: 8, left: 19, width: 4, height: 1, background: "#2F1B14", transform: "rotate(14deg)" }} />
        {/* Eyes */}
        <div className="absolute" style={{ top: 10, left: 10, width: 3, height: 3, background: "#333" }} />
        <div className="absolute" style={{ top: 10, left: 20, width: 3, height: 3, background: "#333" }} />
        {/* Flat 'meh' mouth */}
        <div className="absolute" style={{ top: 15, left: 13, width: 6, height: 2, background: "#C0392B", borderRadius: 1 }} />
        {/* Body / Shirt */}
        <div className="absolute" style={{ top: 18, left: 6, width: 20, height: 10, background: "#4169E1", borderRadius: "0 0 4px 4px" }} />
        {/* Tie */}
        <div className="absolute" style={{ top: 18, left: 14, width: 4, height: 8, background: "#DC143C" }} />
        {/* Raised shoulders */}
        <div className="absolute" style={{ top: 16, left: 3, width: 7, height: 4, background: "#4169E1", borderRadius: "3px 3px 0 0" }} />
        <div className="absolute" style={{ top: 16, left: 22, width: 7, height: 4, background: "#4169E1", borderRadius: "3px 3px 0 0" }} />
        {/* Left arm — upper (sleeve) angles down-out, forearm bends up */}
        <div className="absolute" style={{ top: 18, left: 1, width: 6, height: 3, background: "#4169E1", borderRadius: 2, transform: "rotate(20deg)" }} />
        <div className="absolute" style={{ top: 13, left: -2, width: 3, height: 8, background: "#FDBCB4", borderRadius: 2, transform: "rotate(-25deg)" }} />
        {/* Left hand (palm up) */}
        <div className="absolute" style={{ top: 11, left: -4, width: 5, height: 4, background: "#FDBCB4", borderRadius: "50% 50% 40% 40%" }} />
        {/* Right arm — mirrored */}
        <div className="absolute" style={{ top: 18, left: 25, width: 6, height: 3, background: "#4169E1", borderRadius: 2, transform: "rotate(-20deg)" }} />
        <div className="absolute" style={{ top: 13, left: 31, width: 3, height: 8, background: "#FDBCB4", borderRadius: 2, transform: "rotate(25deg)" }} />
        {/* Right hand (palm up) */}
        <div className="absolute" style={{ top: 11, left: 31, width: 5, height: 4, background: "#FDBCB4", borderRadius: "50% 50% 40% 40%" }} />
        {/* Legs */}
        <div className="absolute" style={{ top: 28, left: 9, width: 4, height: 4, background: "#2C3E50" }} />
        <div className="absolute" style={{ top: 28, left: 19, width: 4, height: 4, background: "#2C3E50" }} />
      </div>
    );
  }
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
      {/* Eyes — solid black, glance toward the player (one cardinal direction) */}
      <div className="absolute" style={{ top: 10 + Math.max(-1, Math.min(1, look?.y ?? 0)), left: 10 + Math.max(-1, Math.min(1, look?.x ?? 0)), width: 3, height: 3, background: "#333" }} />
      <div className="absolute" style={{ top: 10 + Math.max(-1, Math.min(1, look?.y ?? 0)), left: 20 + Math.max(-1, Math.min(1, look?.x ?? 0)), width: 3, height: 3, background: "#333" }} />
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

// Wardrobe (tidy armoire) with a few clothes peeking out
export const Wardrobe: React.FC<{ variant?: number }> = ({ variant = 0 }) => {
  const clothesPalettes = [
    ["#FF69B4", "#FFD700", "#00CED1"],
    ["#FF6347", "#9370DB", "#32CD32"],
    ["#FF1493", "#00BFFF", "#FFA500"],
    ["#E74C3C", "#2ECC71", "#F1C40F"],
    ["#1ABC9C", "#E91E63", "#FF8A65"],
    ["#FF4081", "#FFEB3B", "#26C6DA"],
  ];
  const colors = clothesPalettes[variant % 6];

  // Wood tones: [mid, light highlight, dark shadow/outline]
  const woodSets = [
    ["#9C6B2E", "#B98641", "#5B3A14"],
    ["#6D4C36", "#86614A", "#3E2A1C"],
    ["#A6622F", "#C07C45", "#5C3217"],
    ["#7B4A33", "#96603F", "#452418"],
    ["#9A7B4F", "#B49568", "#5A4327"],
    ["#5E4030", "#785441", "#33211A"],
  ];
  const [wood, woodLight, woodDark] = woodSets[variant % 6];

  // Style variation
  const isWide = variant % 3 === 1;
  const isTall = variant % 3 === 2;
  const w = isWide ? 52 : 40;
  const h = isTall ? 56 : 48;

  const bodyTop = 8;
  const bodyLeft = 2;
  const bodyW = w - 4;
  const bodyH = h - bodyTop - 4; // leave 4px for feet
  const mid = Math.floor(w / 2);
  const doorH = bodyH - 10;

  // panel helper geometry
  const Panel = ({ left, pw }: { left: number; pw: number }) => (
    <>
      <div className="absolute" style={{ top: bodyTop + 6, left, width: pw, height: doorH - 6, background: woodLight, borderRadius: 1 }} />
      <div className="absolute" style={{ top: bodyTop + 8, left: left + 2, width: pw - 4, height: doorH - 10, background: wood, borderRadius: 1 }} />
    </>
  );

  return (
    <div className="relative" style={{ width: w, height: h, imageRendering: "pixelated" }}>
      {/* Feet */}
      <div className="absolute" style={{ top: h - 4, left: 5, width: 6, height: 4, background: woodDark }} />
      <div className="absolute" style={{ top: h - 4, left: w - 11, width: 6, height: 4, background: woodDark }} />

      {/* Body */}
      <div className="absolute" style={{ top: bodyTop, left: bodyLeft, width: bodyW, height: bodyH, background: wood, border: `2px solid ${woodDark}`, borderRadius: 2 }} />

      {/* Cornice (top trim, slight overhang) */}
      <div className="absolute" style={{ top: bodyTop - 2, left: 0, width: w, height: 5, background: woodLight, border: `2px solid ${woodDark}`, borderRadius: 2 }} />

      {/* Recessed door panels */}
      {isWide ? (
        <>
          <Panel left={bodyLeft + 3} pw={Math.floor(bodyW / 3) - 5} />
          <Panel left={bodyLeft + Math.floor(bodyW / 3) + 2} pw={Math.floor(bodyW / 3) - 4} />
          <Panel left={bodyLeft + Math.floor((bodyW * 2) / 3) + 2} pw={Math.floor(bodyW / 3) - 5} />
        </>
      ) : (
        <>
          <Panel left={bodyLeft + 3} pw={Math.floor(bodyW / 2) - 5} />
          <Panel left={bodyLeft + Math.floor(bodyW / 2) + 2} pw={Math.floor(bodyW / 2) - 5} />
        </>
      )}

      {/* Door seam(s) */}
      {isWide ? (
        <>
          <div className="absolute" style={{ top: bodyTop + 4, left: Math.floor(w / 3), width: 1, height: doorH, background: woodDark }} />
          <div className="absolute" style={{ top: bodyTop + 4, left: Math.floor((w * 2) / 3), width: 1, height: doorH, background: woodDark }} />
        </>
      ) : (
        <div className="absolute" style={{ top: bodyTop + 4, left: mid, width: 1, height: doorH, background: woodDark }} />
      )}

      {/* Knobs (around the centre seam) */}
      <div className="absolute" style={{ top: bodyTop + Math.floor(bodyH / 2), left: mid - 4, width: 2, height: 2, background: "#FFD700" }} />
      <div className="absolute" style={{ top: bodyTop + Math.floor(bodyH / 2), left: mid + 3, width: 2, height: 2, background: "#FFD700" }} />

      {/* Folded sweater draped over the top edge */}
      <div className="absolute" style={{ top: 1, left: 5, width: 13, height: 8, background: colors[0], borderRadius: "3px 3px 1px 1px" }} />
      <div className="absolute" style={{ top: 4, left: 5, width: 13, height: 2, background: "rgba(0,0,0,0.18)" }} />
      <div className="absolute" style={{ top: 8, left: 6, width: 5, height: 4, background: colors[0], borderRadius: "0 0 2px 2px" }} />

      {/* Scarf draped over the top-right */}
      <div className="absolute" style={{ top: 0, left: w - 16, width: 9, height: 7, background: colors[2], borderRadius: "3px 3px 1px 1px" }} />
      <div className="absolute" style={{ top: 6, left: w - 12, width: 4, height: 9, background: colors[2], borderRadius: "0 0 2px 2px" }} />

      {/* Sleeve poking from the door gap */}
      <div className="absolute" style={{ top: bodyTop + Math.floor(bodyH * 0.55), left: mid - 1, width: 7, height: 4, background: colors[1], borderRadius: "0 3px 3px 0" }} />
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
// A ring of n particles at radius r
const fwRing = (n: number, r: number, rot = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + rot;
    return { dx: Math.cos(a) * r, dy: Math.sin(a) * r };
  });

// `variant` 0-4 selects a burst pattern. Particles launch outward from the
// center once (fireworkFly keyframe, fill: forwards) so each shell blooms and
// fades like a real firework instead of pulsing in place.
export const Firework: React.FC<{ x: number; y: number; color: string; variant?: number }> = ({ x, y, color, variant = 0 }) => {
  const v = ((variant % 5) + 5) % 5;

  let particles: { dx: number; dy: number }[];
  let size = 5;
  let dur = 1.1;
  switch (v) {
    case 1: // double ring
      particles = [...fwRing(8, 11), ...fwRing(8, 22, Math.PI / 8)];
      size = 4; dur = 1.25; break;
    case 2: // random spray
      particles = Array.from({ length: 14 }, () => {
        const a = Math.random() * Math.PI * 2;
        const r = 8 + Math.random() * 16;
        return { dx: Math.cos(a) * r, dy: Math.sin(a) * r };
      });
      size = 4; dur = 1.0; break;
    case 3: // big sparse star
      particles = fwRing(6, 26);
      size = 7; dur = 1.35; break;
    case 4: // dense ring
      particles = fwRing(16, 19);
      size = 4; dur = 1.15; break;
    default: // classic ring
      particles = fwRing(10, 16);
      size = 5; dur = 1.1;
  }

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {/* Bright center flash */}
      <div style={{ position: "absolute", left: -6, top: -6, width: 12, height: 12, background: "#fff", borderRadius: "50%", boxShadow: `0 0 10px ${color}`, animation: "fireworkFlash 0.45s ease-out forwards" }} />
      {particles.map((p, i) => {
        const pStyle = {
          position: "absolute",
          left: -size / 2,
          top: -size / 2,
          width: size,
          height: size,
          background: color,
          borderRadius: "50%",
          boxShadow: `0 0 ${Math.round(size * 1.6)}px ${color}`,
          "--dx": `${p.dx.toFixed(1)}px`,
          "--dy": `${p.dy.toFixed(1)}px`,
          animation: `fireworkFly ${dur}s ease-out forwards`,
        } as React.CSSProperties;
        return <div key={i} style={pStyle} />;
      })}
    </div>
  );
};

// Baby orangutan sprite
export const MonkeySprite: React.FC<{ style?: React.CSSProperties; swinging?: boolean; expr?: number }> = ({ style, swinging, expr = 0 }) => {
  const fur = "#B5651D";
  const furDark = "#7A3F12";
  const face = "#E8A36A";
  const muzzle = "#F2C79A";
  const tongue = "#E87A8A";
  const e = ((expr % 5) + 5) % 5; // 0:happy 1:grin 2:surprised 3:wink 4:joyful
  return (
    <div className="absolute" style={{
      width: 32, height: 32, imageRendering: "pixelated",
      ...(swinging ? { animation: "monkeySwing 0.8s ease-in-out infinite", transformOrigin: "top center" } : {}),
      ...style,
    }}>
      {/* Long arms (drawn first so they sit behind the body) */}
      {swinging ? (
        <>
          <div className="absolute" style={{ top: 1, left: 8, width: 4, height: 21, background: fur, borderRadius: 3, transform: "rotate(-14deg)" }} />
          <div className="absolute" style={{ top: 1, left: 20, width: 4, height: 21, background: fur, borderRadius: 3, transform: "rotate(14deg)" }} />
          {/* hands gripping up */}
          <div className="absolute" style={{ top: 0, left: 7, width: 5, height: 4, background: furDark, borderRadius: "50%" }} />
          <div className="absolute" style={{ top: 0, left: 20, width: 5, height: 4, background: furDark, borderRadius: "50%" }} />
        </>
      ) : (
        <>
          {/* Arms pivot from the shoulders so they stay attached to the body */}
          <div className="absolute" style={{ top: 19, left: 6, width: 4, height: 11, background: fur, borderRadius: 3, transformOrigin: "top center", transform: "rotate(-18deg)" }} />
          <div className="absolute" style={{ top: 19, left: 22, width: 4, height: 11, background: fur, borderRadius: 3, transformOrigin: "top center", transform: "rotate(18deg)" }} />
          <div className="absolute" style={{ top: 28, left: 2, width: 5, height: 4, background: furDark, borderRadius: "50%" }} />
          <div className="absolute" style={{ top: 28, left: 25, width: 5, height: 4, background: furDark, borderRadius: "50%" }} />
        </>
      )}

      {/* Body */}
      <div className="absolute" style={{ top: 19, left: 8, width: 16, height: 11, background: fur, borderRadius: "6px 6px 7px 7px" }} />
      {/* Belly patch */}
      <div className="absolute" style={{ top: 21, left: 11, width: 10, height: 8, background: muzzle, borderRadius: "50%" }} />
      {/* Feet */}
      <div className="absolute" style={{ top: 29, left: 10, width: 5, height: 3, background: furDark, borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 29, left: 17, width: 5, height: 3, background: furDark, borderRadius: "50%" }} />

      {/* Fluffy head fur (slightly wider halo) */}
      <div className="absolute" style={{ top: 1, left: 3, width: 26, height: 20, background: furDark, borderRadius: "50% 50% 45% 45%" }} />
      {/* Head */}
      <div className="absolute" style={{ top: 2, left: 5, width: 22, height: 18, background: fur, borderRadius: "50% 50% 45% 45%" }} />
      {/* Wispy top tuft */}
      <div className="absolute" style={{ top: 0, left: 14, width: 4, height: 4, background: furDark, borderRadius: "50% 50% 0 0" }} />
      {/* Ears */}
      <div className="absolute" style={{ top: 7, left: 3, width: 5, height: 6, background: fur, borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 7, left: 24, width: 5, height: 6, background: fur, borderRadius: "50%" }} />

      {/* Face disk */}
      <div className="absolute" style={{ top: 5, left: 9, width: 14, height: 13, background: face, borderRadius: "45% 45% 50% 50%" }} />
      {/* Brow line */}
      <div className="absolute" style={{ top: 7, left: 10, width: 12, height: 2, background: "rgba(0,0,0,0.12)", borderRadius: 2 }} />

      {/* Eyes — vary by expression */}
      {e === 4 ? (
        // joyful closed eyes (^ ^)
        <>
          <div className="absolute" style={{ top: 9, left: 10, width: 5, height: 3, borderTop: "2px solid #1A1A1A", borderRadius: "70% 70% 0 0" }} />
          <div className="absolute" style={{ top: 9, left: 17, width: 5, height: 3, borderTop: "2px solid #1A1A1A", borderRadius: "70% 70% 0 0" }} />
        </>
      ) : e === 3 ? (
        // wink — left open, right closed line
        <>
          <div className="absolute" style={{ top: 8, left: 11, width: 4, height: 5, background: "#1A1A1A", borderRadius: "50%" }} />
          <div className="absolute" style={{ top: 9, left: 12, width: 1, height: 2, background: "#FFF" }} />
          <div className="absolute" style={{ top: 11, left: 17, width: 5, height: 2, background: "#1A1A1A", borderRadius: 2 }} />
        </>
      ) : (
        // round eyes (wider for surprised)
        <>
          <div className="absolute" style={{ top: e === 2 ? 7 : 8, left: e === 2 ? 10 : 11, width: e === 2 ? 5 : 4, height: e === 2 ? 6 : 5, background: "#1A1A1A", borderRadius: "50%" }} />
          <div className="absolute" style={{ top: e === 2 ? 7 : 8, left: e === 2 ? 17 : 17, width: e === 2 ? 5 : 4, height: e === 2 ? 6 : 5, background: "#1A1A1A", borderRadius: "50%" }} />
          <div className="absolute" style={{ top: 9, left: 12, width: 1, height: 2, background: "#FFF" }} />
          <div className="absolute" style={{ top: 9, left: 18, width: 1, height: 2, background: "#FFF" }} />
        </>
      )}

      {/* Nose nostrils */}
      <div className="absolute" style={{ top: 13, left: 13, width: 2, height: 2, background: "#7A2E00", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 13, left: 17, width: 2, height: 2, background: "#7A2E00", borderRadius: "50%" }} />

      {/* Light muzzle base */}
      <div className="absolute" style={{ top: 15, left: 11, width: 10, height: 4, background: muzzle, borderRadius: "0 0 50% 50%" }} />

      {/* Mouth — vary by expression */}
      {e === 0 && (
        // happy open smile
        <div className="absolute" style={{ top: 14, left: 11, width: 10, height: 6, borderBottom: "2px solid #7A2E00", borderRadius: "0 0 65% 65%" }} />
      )}
      {e === 1 && (
        // big grin with tongue
        <>
          <div className="absolute" style={{ top: 15, left: 12, width: 8, height: 5, background: "#5A2200", borderRadius: "30% 30% 55% 55%" }} />
          <div className="absolute" style={{ top: 17, left: 14, width: 4, height: 3, background: tongue, borderRadius: "40% 40% 50% 50%" }} />
        </>
      )}
      {e === 2 && (
        // surprised O
        <div className="absolute" style={{ top: 15, left: 13, width: 5, height: 5, background: "#5A2200", borderRadius: "50%" }} />
      )}
      {e === 3 && (
        // cheeky smile, tongue poking out
        <>
          <div className="absolute" style={{ top: 14, left: 12, width: 8, height: 4, borderBottom: "2px solid #7A2E00", borderRadius: "0 0 60% 60%" }} />
          <div className="absolute" style={{ top: 17, left: 16, width: 4, height: 3, background: tongue, borderRadius: "0 0 50% 50%" }} />
        </>
      )}
      {e === 4 && (
        // joyful big smile + rosy cheeks
        <>
          <div className="absolute" style={{ top: 14, left: 11, width: 10, height: 6, borderBottom: "2px solid #7A2E00", borderRadius: "0 0 65% 65%" }} />
          <div className="absolute" style={{ top: 13, left: 7, width: 3, height: 2, background: "rgba(255,120,120,0.5)", borderRadius: "50%" }} />
          <div className="absolute" style={{ top: 13, left: 22, width: 3, height: 2, background: "rgba(255,120,120,0.5)", borderRadius: "50%" }} />
        </>
      )}
    </div>
  );
};

// Orange cat sprite — front-facing sitting tabby so both eyes stay visible
// facing prop flips the curled tail side via scaleX
export const CatSprite: React.FC<{ facing?: "left" | "right" }> = ({ facing = "right" }) => {
  const orange = "#F2913C";
  const orangeDark = "#D9772A";
  const belly = "#FFE7BE";
  const ear = "#FFB3C6";
  return (
    <div className="relative" style={{ width: 34, height: 32, imageRendering: "pixelated", transform: facing === "left" ? "scaleX(-1)" : undefined }}>
      {/* Sitting body */}
      <div className="absolute" style={{ top: 16, left: 7, width: 20, height: 16, background: orange, borderRadius: "45% 45% 40% 40%" }} />
      {/* Chest / belly */}
      <div className="absolute" style={{ top: 18, left: 12, width: 10, height: 13, background: belly, borderRadius: "50% 50% 45% 45%" }} />
      {/* Front paws */}
      <div className="absolute" style={{ bottom: 0, left: 11, width: 5, height: 5, background: orange, borderRadius: "40% 40% 50% 50%" }} />
      <div className="absolute" style={{ bottom: 0, left: 18, width: 5, height: 5, background: orange, borderRadius: "40% 40% 50% 50%" }} />
      {/* Curled tail wrapping the front (right side, flips with scaleX) */}
      <div className="absolute" style={{ bottom: -1, left: 22, width: 11, height: 6, background: orangeDark, borderRadius: "0 50% 50% 50%" }} />
      <div className="absolute" style={{ bottom: 0, left: 26, width: 3, height: 3, background: orange, borderRadius: "50%" }} />

      {/* Ears (symmetric around head centre x=17) */}
      <div className="absolute" style={{ top: -2, left: 7, width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: `9px solid ${orange}` }} />
      <div className="absolute" style={{ top: 2, left: 10, width: 0, height: 0, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderBottom: `5px solid ${ear}` }} />
      <div className="absolute" style={{ top: -2, left: 17, width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: `9px solid ${orange}` }} />
      <div className="absolute" style={{ top: 2, left: 20, width: 0, height: 0, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderBottom: `5px solid ${ear}` }} />

      {/* Head */}
      <div className="absolute" style={{ top: 4, left: 5, width: 24, height: 17, background: orange, borderRadius: "45% 45% 42% 42%" }} />
      {/* Tabby forehead stripes (M) */}
      <div className="absolute" style={{ top: 5, left: 14, width: 2, height: 5, background: orangeDark, borderRadius: 1 }} />
      <div className="absolute" style={{ top: 5, left: 18, width: 2, height: 5, background: orangeDark, borderRadius: 1 }} />
      <div className="absolute" style={{ top: 4, left: 9, width: 2, height: 4, background: orangeDark, borderRadius: 1, transform: "rotate(20deg)" }} />
      <div className="absolute" style={{ top: 4, left: 23, width: 2, height: 4, background: orangeDark, borderRadius: 1, transform: "rotate(-20deg)" }} />
      {/* Muzzle (lighter lower face) */}
      <div className="absolute" style={{ top: 12, left: 10, width: 14, height: 8, background: belly, borderRadius: "40% 40% 50% 50%" }} />

      {/* Eyes */}
      <div className="absolute" style={{ top: 9, left: 10, width: 5, height: 6, background: "#5BBF4A", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 9, left: 19, width: 5, height: 6, background: "#5BBF4A", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 10, left: 12, width: 2, height: 4, background: "#1A1A1A", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 10, left: 21, width: 2, height: 4, background: "#1A1A1A", borderRadius: "50%" }} />
      <div className="absolute" style={{ top: 10, left: 11, width: 1, height: 1, background: "#FFF" }} />
      <div className="absolute" style={{ top: 10, left: 20, width: 1, height: 1, background: "#FFF" }} />

      {/* Nose */}
      <div className="absolute" style={{ top: 15, left: 15, width: 4, height: 3, background: "#E8769A", borderRadius: "0 0 50% 50%" }} />
      {/* Mouth */}
      <div className="absolute" style={{ top: 18, left: 16, width: 2, height: 2, background: orangeDark, borderRadius: 1 }} />
      <div className="absolute" style={{ top: 18, left: 13, width: 3, height: 1, background: orangeDark, borderRadius: 1 }} />
      <div className="absolute" style={{ top: 18, left: 18, width: 3, height: 1, background: orangeDark, borderRadius: 1 }} />

      {/* Whiskers */}
      <div className="absolute" style={{ top: 15, left: 1, width: 8, height: 1, background: "rgba(255,255,255,0.85)", transform: "rotate(-6deg)" }} />
      <div className="absolute" style={{ top: 18, left: 1, width: 8, height: 1, background: "rgba(255,255,255,0.85)", transform: "rotate(6deg)" }} />
      <div className="absolute" style={{ top: 15, left: 25, width: 8, height: 1, background: "rgba(255,255,255,0.85)", transform: "rotate(6deg)" }} />
      <div className="absolute" style={{ top: 18, left: 25, width: 8, height: 1, background: "rgba(255,255,255,0.85)", transform: "rotate(-6deg)" }} />
    </div>
  );
};

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
      <div className="relative" style={{ width: 24, height: 30, imageRendering: "pixelated", filter: "drop-shadow(0 0 1px rgba(150,120,90,0.15))" }}>
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
export const PeekingMonkeyFace: React.FC<{ flipped?: boolean }> = ({ flipped }) => (
  <div style={{ width: 24, height: 22, imageRendering: "pixelated", position: "relative", transform: flipped ? "scaleX(-1)" : undefined }}>
    {/* Fluffy fur halo */}
    <div className="absolute" style={{ top: 0, left: 1, width: 22, height: 19, background: "#7A3F12", borderRadius: "50% 50% 45% 45%" }} />
    {/* Head */}
    <div className="absolute" style={{ top: 1, left: 3, width: 18, height: 17, background: "#B5651D", borderRadius: "50% 50% 45% 45%" }} />
    {/* Ear on visible side */}
    <div className="absolute" style={{ top: 6, left: 1, width: 4, height: 5, background: "#B5651D", borderRadius: "50%" }} />
    {/* Face disk */}
    <div className="absolute" style={{ top: 4, left: 6, width: 13, height: 12, background: "#E8A36A", borderRadius: "45% 45% 50% 50%" }} />
    {/* Big surprised eyes */}
    <div className="absolute" style={{ top: 6, left: 7, width: 5, height: 6, background: "#1A1A1A", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 6, left: 13, width: 5, height: 6, background: "#1A1A1A", borderRadius: "50%" }} />
    {/* Eye highlights */}
    <div className="absolute" style={{ top: 7, left: 8, width: 2, height: 2, background: "#FFF", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 7, left: 14, width: 2, height: 2, background: "#FFF", borderRadius: "50%" }} />
    {/* Nostrils */}
    <div className="absolute" style={{ top: 12, left: 9, width: 2, height: 2, background: "#7A2E00", borderRadius: "50%" }} />
    <div className="absolute" style={{ top: 12, left: 13, width: 2, height: 2, background: "#7A2E00", borderRadius: "50%" }} />
    {/* Surprised mouth (O shape) */}
    <div className="absolute" style={{ top: 15, left: 10, width: 4, height: 4, background: "#7A2E00", borderRadius: "50%" }} />
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
