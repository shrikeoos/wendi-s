import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FemaleSprite, CatSprite, FlowerSprite } from "./PixelSprites";
import { ROOMS, NPC_POS, NPC_BOUQUET_POS } from "./data/rooms";
import { DIALOGUE, NPC_DIALOGUE_START } from "./data/dialogue";
import RoomView from "./engine/RoomView";
import DialogueBox from "./engine/DialogueBox";
import { useWander } from "./engine/useWander";
import { usePeek } from "./engine/usePeek";
import { placeExits, rectsOverlap } from "./engine/geometry";
import YesEnding from "./scenes/YesEnding";
import NoEnding from "./scenes/NoEnding";
import { ActionId, DialogueChoice, Exit, RoomId, Screen, Direction, Vec } from "./engine/types";
import { TILE, ROOM_W, ROOM_H, SPEED, INTERACT_DIST } from "./engine/constants";

const ValentineGame: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("play");
  const [roomId, setRoomId] = useState<RoomId>("room1");
  const [pos, setPos] = useState<Vec>({ ...ROOMS.room1.spawn });
  const [dir, setDir] = useState<Direction>("down");
  const [exits, setExits] = useState<Exit[]>(() =>
    placeExits(ROOMS.room1.exits, ROOMS.room1.entities.filter(e => e.solid))
  );
  const [dialogueNode, setDialogueNode] = useState<string | null>(null);
  const [nearInteractId, setNearInteractId] = useState<string | null>(null);
  const [showCatSpeech, setShowCatSpeech] = useState(false);
  const [showBouquet, setShowBouquet] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [scale, setScale] = useState(1);

  const keysRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);
  const posRef = useRef<Vec>(pos);
  const roomIdRef = useRef<RoomId>(roomId);
  const exitsRef = useRef<Exit[]>(exits);
  const dialogueRef = useRef<string | null>(dialogueNode);
  const nearInteractRef = useRef<string | null>(nearInteractId);

  const room = ROOMS[roomId];
  const solids = useMemo(() => room.entities.filter(e => e.solid), [room]);

  // Keep refs in sync for the (once-bound) game loop & key handlers
  useEffect(() => { roomIdRef.current = roomId; }, [roomId]);
  useEffect(() => { exitsRef.current = exits; }, [exits]);
  useEffect(() => { dialogueRef.current = dialogueNode; }, [dialogueNode]);
  useEffect(() => { nearInteractRef.current = nearInteractId; }, [nearInteractId]);

  // Systems
  const catActive = screen === "play" && !!room.systems?.wander;
  const cat = useWander(catActive);
  const peekNode = usePeek(solids, pos, screen === "play" && !!room.systems?.peek);

  // ---- actions (data references these by id) --------------------------------
  const runAction = useCallback((action: ActionId) => {
    switch (action) {
      case "talk":
        setDialogueNode(NPC_DIALOGUE_START);
        break;
      case "choseNo":
        setDialogueNode("no-response");
        break;
      case "closeDialogue":
        setDialogueNode(null); // position intentionally preserved
        break;
      case "choseYes":
        setDialogueNode("hehe");
        setTimeout(() => {
          setDialogueNode("bouquet");
          setShowBouquet(true);
          setTimeout(() => {
            setShowTransition(true);
            setTimeout(() => {
              setScreen("yes-ending");
              setShowTransition(false);
              setShowBouquet(false);
              setDialogueNode(null);
            }, 700);
          }, 1800);
        }, 1500);
        break;
    }
  }, []);

  const handleChoice = (choice: DialogueChoice) => {
    if (choice.action) runAction(choice.action);
    else if (choice.to) setDialogueNode(choice.to);
  };

  const handleCatClick = () => {
    setShowCatSpeech(true);
    setTimeout(() => setShowCatSpeech(false), 2500);
  };

  const enterRoom = (ex: Exit) => {
    const dest = ROOMS[ex.to];
    const placed = placeExits(dest.exits, dest.entities.filter(e => e.solid));
    roomIdRef.current = ex.to;
    exitsRef.current = placed;
    posRef.current = { ...ex.spawn };
    setRoomId(ex.to);
    setExits(placed);
    setPos({ ...ex.spawn });
    setNearInteractId(null);
  };

  const handleRestart = () => {
    const placed = placeExits(ROOMS.room1.exits, ROOMS.room1.entities.filter(e => e.solid));
    roomIdRef.current = "room1";
    exitsRef.current = placed;
    posRef.current = { ...ROOMS.room1.spawn };
    setScreen("play");
    setRoomId("room1");
    setExits(placed);
    setPos({ ...ROOMS.room1.spawn });
    setDialogueNode(null);
    setShowBouquet(false);
    setShowTransition(false);
  };

  const handleRetry = () => {
    const placed = placeExits(ROOMS.room2.exits, ROOMS.room2.entities.filter(e => e.solid));
    roomIdRef.current = "room2";
    exitsRef.current = placed;
    setScreen("play");
    setRoomId("room2");
    setExits(placed);
    setDialogueNode(null);
  };

  // ---- scale to fill window -------------------------------------------------
  useEffect(() => {
    const updateScale = () => {
      setScale(Math.min(window.innerWidth / ROOM_W, window.innerHeight / ROOM_H));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // ---- keyboard -------------------------------------------------------------
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (e.key === " ") {
        if (screen === "play" && dialogueRef.current === null && nearInteractRef.current) {
          const ent = ROOMS[roomIdRef.current].entities.find(en => en.id === nearInteractRef.current);
          if (ent?.interact?.type === "space") {
            e.preventDefault();
            runAction(ent.interact.action);
          }
        }
      }
    };
    const onUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [screen, runAction]);

  // ---- game loop ------------------------------------------------------------
  useEffect(() => {
    if (screen !== "play") return;

    const loop = () => {
      const curRoom = ROOMS[roomIdRef.current];
      const curSolids = curRoom.entities.filter(en => en.solid);
      const inDialogue = dialogueRef.current !== null;

      if (!inDialogue) {
        const keys = keysRef.current;
        let dx = 0, dy = 0;
        if (keys.has("ArrowUp") || keys.has("w")) { dy = -SPEED; setDir("up"); }
        if (keys.has("ArrowDown") || keys.has("s")) { dy = SPEED; setDir("down"); }
        if (keys.has("ArrowLeft") || keys.has("a")) { dx = -SPEED; setDir("left"); }
        if (keys.has("ArrowRight") || keys.has("d")) { dx = SPEED; setDir("right"); }

        if (dx !== 0 || dy !== 0) {
          const prev = posRef.current;
          let nx = Math.max(0, Math.min(ROOM_W - TILE, prev.x + dx));
          let ny = Math.max(0, Math.min(ROOM_H - TILE, prev.y + dy));

          // Solid collision — revert both axes (no wall-sliding)
          for (const s of curSolids) {
            if (rectsOverlap(nx, ny, TILE, TILE, s.x, s.y, s.w, s.h)) {
              nx = prev.x;
              ny = prev.y;
              break;
            }
          }

          // Exit transition
          let hitExit: Exit | null = null;
          for (const ex of exitsRef.current) {
            if (rectsOverlap(nx, ny, TILE, TILE, ex.x, ex.y, ex.w, ex.h)) { hitExit = ex; break; }
          }
          if (hitExit) {
            enterRoom(hitExit);
            rafRef.current = requestAnimationFrame(loop);
            return;
          }

          posRef.current = { x: nx, y: ny };
          setPos(posRef.current);
        }
      }

      // Proximity for space-interactables (suppressed while in dialogue)
      if (inDialogue) {
        if (nearInteractRef.current !== null) setNearInteractId(null);
      } else {
        const p = posRef.current;
        let nearId: string | null = null;
        let nearDist = INTERACT_DIST;
        for (const ent of curRoom.entities) {
          if (ent.interact?.type !== "space") continue;
          const d = Math.hypot(p.x - ent.x, p.y - ent.y);
          if (d < nearDist) { nearDist = d; nearId = ent.id; }
        }
        if (nearId !== nearInteractRef.current) setNearInteractId(nearId);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const ctx = { dialogueNode, nearInteractId, dir };
  const viewportBg = screen === "play" ? room.viewportBg : "#FFF0F5";

  return (
    <div className="flex items-center justify-center" style={{ background: "#1a1a2e", fontFamily: "'Press Start 2P', monospace", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @keyframes rainDrop { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(20px); opacity: 0; } }
        @keyframes bounceText { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes floatExclaim { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes npcCollapse { 0% { transform: scaleY(1); } 100% { transform: scaleY(0.3) translateY(10px); } }
        @keyframes nyaShake { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
        @keyframes monkeySwing { 0%, 100% { transform: rotate(-15deg); } 50% { transform: rotate(15deg); } }
        @keyframes spiderSwing { 0% { transform: rotate(-35deg); } 50% { transform: rotate(35deg); } 100% { transform: rotate(-35deg); } }
        @keyframes flashyGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes peekIn { 0% { transform: translateX(-18px); } 100% { transform: translateX(0); } }
        @keyframes peekInLeft { 0% { transform: translateX(18px); } 100% { transform: translateX(0); } }
        @keyframes peekInTop { 0% { transform: translateY(24px); } 100% { transform: translateY(0); } }
        @keyframes peekOut { 0% { transform: translateX(0); } 100% { transform: translateX(-18px); } }
        @keyframes peekOutLeft { 0% { transform: translateX(0); } 100% { transform: translateX(18px); } }
        @keyframes peekOutTop { 0% { transform: translateY(0); } 100% { transform: translateY(24px); } }
        @keyframes flashIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes bouquetPop { 0% { transform: scale(0) rotate(-20deg); opacity: 0; } 60% { transform: scale(1.2) rotate(5deg); opacity: 1; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
        @keyframes catWalk { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes shrug { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
      `}</style>

      {/* Game viewport */}
      <div
        className="relative overflow-hidden"
        style={{
          width: ROOM_W,
          height: ROOM_H,
          background: viewportBg,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        tabIndex={0}
      >
        {screen === "play" && (
          <>
            <RoomView room={room} exits={exits} ctx={ctx} nearInteractId={nearInteractId} onInteract={runAction} />

            {/* Peek system */}
            {peekNode}

            {/* Player */}
            <div className="absolute transition-none" style={{ left: pos.x, top: pos.y, zIndex: 10 }}>
              <FemaleSprite direction={dir} />
            </div>

            {/* Cat (wander system) */}
            {room.systems?.wander && (
              <div
                className="absolute"
                style={{ left: cat.pos.x, top: cat.pos.y, zIndex: 7, cursor: "pointer", animation: "catWalk 0.4s ease-in-out infinite" }}
                onClick={handleCatClick}
              >
                <CatSprite facing={cat.facing} />
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
            )}

            {/* Bouquet — appears when NPC pulls it out */}
            {showBouquet && (
              <div className="absolute" style={{
                left: NPC_BOUQUET_POS.x, top: NPC_BOUQUET_POS.y, zIndex: 6,
                animation: "bouquetPop 0.5s cubic-bezier(0.36,0.07,0.19,0.97) forwards",
              }}>
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
            {dialogueNode && DIALOGUE[dialogueNode] && (
              <DialogueBox node={DIALOGUE[dialogueNode]} top={NPC_POS.y - 120} onChoice={handleChoice} />
            )}
          </>
        )}

        {screen === "yes-ending" && <YesEnding onRestart={handleRestart} />}
        {screen === "no-ending" && <NoEnding onRetry={handleRetry} />}

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
