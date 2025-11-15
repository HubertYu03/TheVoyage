import type { IconType } from "react-icons";

// Dialogue Types
export type DialogueEntry = {
  speaker: string;
  avatar: IconType;
  text: string;
};

export type PlanetDialogueSection = {
  introDialog: DialogueEntry[];
};

export type PlanetDialogueType = Record<string, PlanetDialogueSection>;
