import React from "react";
import { DialogueChoice, DialogueNode } from "./types";

interface DialogueBoxProps {
  node: DialogueNode;
  top: number;
  onChoice: (choice: DialogueChoice) => void;
}

const FONT = "'Press Start 2P', monospace";

const choiceStyle = (variant: DialogueChoice["variant"]): React.CSSProperties => {
  switch (variant) {
    case "secondary":
      return { background: "#999", color: "white", border: "2px solid #777" };
    case "plain":
      return { background: "#eee", color: "#555", border: "2px solid #ccc" };
    case "primary":
    default:
      return { background: "#FF69B4", color: "white", border: "2px solid #FF1493" };
  }
};

const DialogueBox: React.FC<DialogueBoxProps> = ({ node, top, onChoice }) => {
  const textColor = node.id === "no-response" ? "#666" : "#333";
  const marginBottom = node.choices ? (node.id === "no-response" ? 10 : 12) : 0;

  return (
    <div className="absolute left-1/2 -translate-x-1/2" style={{ top, zIndex: 20 }}>
      <div
        className="relative"
        style={{
          background: "white",
          border: "3px solid #FF69B4",
          borderRadius: 12,
          padding: "12px 16px",
          minWidth: 260,
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(255,105,180,0.3)",
        }}
      >
        {node.variant === "shout" ? (
          <p style={{ fontSize: 18, fontFamily: FONT, color: "#FF1493", lineHeight: 1.6, animation: "bounceText 0.5s ease-in-out infinite" }}>
            {node.text}
          </p>
        ) : (
          <>
            <p style={{ fontSize: 9, fontFamily: FONT, color: textColor, lineHeight: 1.8, marginBottom }}>
              {node.text.split("\n").map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
            {node.choices && (
              <div className="flex gap-2 justify-center">
                {node.choices.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => onChoice(c)}
                    className={`${c.variant === "plain" ? "px-3 py-1" : "px-3 py-2"} cursor-pointer hover:scale-110 transition-transform`}
                    style={{ ...choiceStyle(c.variant), borderRadius: 6, fontSize: 9, fontFamily: FONT }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Speech bubble tail */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: -10,
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "10px solid #FF69B4",
          }}
        />
      </div>
    </div>
  );
};

export default DialogueBox;
