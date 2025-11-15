import { useEffect, useState } from "react";
import ShipScene from "./components/ShipScene";
import type { PlanetDialogueSection } from "./types/global";
import { PlanetDialogue } from "./constants/PlanetDialogue";

function App() {
  // App will handle the global state of the game and where we are at.
  const [currentPlanet, setCurrentPlanet] = useState<string>("earth"); // Current planet we are visiting

  // Current dialogue data associated with that planet
  const [currentDialogue, setCurrentDialogue] = useState<PlanetDialogueSection>(
    PlanetDialogue["earth"]
  );

  useEffect(() => {
    // Get the dialog based on the planet
    const dialogue: PlanetDialogueSection = PlanetDialogue[currentPlanet];

    setCurrentDialogue(dialogue);
  }, [currentPlanet]);

  return (
    <main>
      <ShipScene dialogue={currentDialogue} />
    </main>
  );
}

export default App;
