import { createContext, useContext, useState, type ReactNode } from "react";
import type { PlanetProgression } from "../types/global";

interface GlobalContextType {
  planets: Record<string, PlanetProgression>; // key = planet name
  setPlanets: React.Dispatch<
    React.SetStateAction<Record<string, PlanetProgression>>
  >;
}

// Default state for 8 planets
const defaultPlanets: Record<string, PlanetProgression> = {
  Mercury: {
    complete: false,
    temp: false,
    color: false,
    surfaceType: false,
    size: false,
    moons: false,
    rings: false,
  },
  Venus: {
    complete: false,
    temp: false,
    color: false,
    surfaceType: false,
    size: false,
    moons: false,
    rings: false,
  },
  Earth: {
    complete: false,
    temp: false,
    color: false,
    surfaceType: false,
    size: false,
    moons: false,
    rings: false,
  },
  Mars: {
    complete: false,
    temp: false,
    color: false,
    surfaceType: false,
    size: false,
    moons: false,
    rings: false,
  },
  Jupiter: {
    complete: false,
    temp: false,
    color: false,
    surfaceType: false,
    size: false,
    moons: false,
    rings: true,
  },
  Saturn: {
    complete: false,
    temp: false,
    color: false,
    surfaceType: false,
    size: false,
    moons: false,
    rings: true,
  },
  Uranus: {
    complete: false,
    temp: false,
    color: false,
    surfaceType: false,
    size: false,
    moons: false,
    rings: true,
  },
  Neptune: {
    complete: false,
    temp: false,
    color: false,
    surfaceType: false,
    size: false,
    moons: false,
    rings: true,
  },
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [planets, setPlanets] =
    useState<Record<string, PlanetProgression>>(defaultPlanets);

  return (
    <GlobalContext.Provider value={{ planets, setPlanets }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx)
    throw new Error("useGlobalState must be used inside GlobalProvider");
  return ctx;
};
