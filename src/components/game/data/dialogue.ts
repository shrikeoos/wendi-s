import { DialogueNode } from "../engine/types";

// Dialogue is a small node graph. Choices either jump to another node (`to`)
// or fire an action the orchestrator resolves (`action`).
// `hehe` and `bouquet` carry no choices — they are advanced by the
// "choseYes" cutscene sequence in the orchestrator.
export const DIALOGUE: Record<string, DialogueNode> = {
  question: {
    id: "question",
    text: "Hey Etoile, do you\nknow what's special\nabout today?",
    choices: [
      { label: "Yes", variant: "primary", action: "choseYes" },
      { label: "No", variant: "secondary", action: "choseNo" },
    ],
  },
  "no-response": {
    id: "no-response",
    text: "AAAEEHGG too bad. I guess\ntoday is just like\nany other day.",
    choices: [{ label: "✕ Close", variant: "plain", action: "closeDialogue" }],
  },
  hehe: {
    id: "hehe",
    text: "HEHE!!",
    variant: "shout",
  },
  bouquet: {
    id: "bouquet",
    text: "For you! 🌸",
  },
};

// The first node shown when the NPC is talked to.
export const NPC_DIALOGUE_START = "question";
