import type { IconType } from "react-icons";

// Dialogue Types
export type DialogueEntry = {
  speaker: string;
  avatar: IconType;
  text: string;
};

export type PlanetDialogueSection = {
  introDialog: DialogueEntry[];
  outroDialog: DialogueEntry[];
};

export type PlanetDialogueType = Record<string, PlanetDialogueSection>;

export type Planet = {
  name: string;
  iconScale: number;
  icon: IconType;
  avgTempF: number;
  avgTempC: number;
  meter: number;
  color: string;
  surfaceType: string;
  sizeKM: number;
  sizeMI: number;
  moons: number;
  rings: boolean;
};

export type PlanetProgression = {
  complete: boolean;
  temp: boolean;
  color: boolean;
  surfaceType: boolean;
  size: boolean;
  moons: boolean;
  rings: boolean;
};
