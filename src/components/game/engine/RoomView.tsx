import React from "react";
import { ActionId, Entity, Exit, RenderCtx, Room } from "./types";

interface RoomViewProps {
  room: Room;
  exits: Exit[]; // live (already placed) exits
  ctx: RenderCtx;
  nearInteractId: string | null;
  onInteract: (action: ActionId) => void;
}

function renderSprite(sprite: Entity["sprite"], ctx: RenderCtx): React.ReactNode {
  return typeof sprite === "function" ? sprite(ctx) : sprite;
}

const RoomView: React.FC<RoomViewProps> = ({ room, exits, ctx, nearInteractId, onInteract }) => {
  const nearEntity = room.entities.find(e => e.id === nearInteractId && e.interact?.type === "space");

  return (
    <>
      {/* Floor */}
      <div className="absolute inset-0" style={room.floor} />
      {/* Walls */}
      {room.walls}

      {/* Exits */}
      {exits.map(ex => (
        <div key={ex.id} className="absolute" style={{ left: ex.x, top: ex.y, zIndex: ex.zIndex }}>
          {ex.sprite}
        </div>
      ))}

      {/* Entities */}
      {room.entities.map(e => {
        const clickable = e.interact?.type === "click";
        const isNear = e.id === nearInteractId;
        return (
          <div
            key={e.id}
            className="absolute"
            style={{ left: e.x, top: e.y, zIndex: e.zIndex, cursor: clickable ? "pointer" : undefined }}
            onClick={clickable && e.interact ? () => onInteract(e.interact!.action) : undefined}
          >
            {renderSprite(e.sprite, ctx)}
            {/* Floating "!" when a space-interactable is in range */}
            {isNear && e.interact?.type === "space" && (
              <div
                className="absolute -top-6 left-1/2 -translate-x-1/2"
                style={{ animation: "floatExclaim 1s ease-in-out infinite", color: "#FFD700", fontSize: 16, fontWeight: "bold" }}
              >
                !
              </div>
            )}
          </div>
        );
      })}

      {/* Always-on room hint */}
      {room.hint && (
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
          style={{ color: "#666", fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}
        >
          {room.hint}
        </div>
      )}

      {/* Proximity prompt for the nearby interactable */}
      {nearEntity?.interact?.prompt && (
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
          style={{ color: "#FF69B4", fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}
        >
          {nearEntity.interact.prompt}
        </div>
      )}
    </>
  );
};

export default RoomView;
