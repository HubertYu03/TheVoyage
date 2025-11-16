import { useEffect, useState } from "react";
import ShipScene from "./components/ShipScene";
import type { Planet, PlanetDialogueSection } from "./types/global";
import { PlanetDialogue } from "./constants/PlanetDialogue";
import { PlanetData } from "./constants/PlanetData";
import { GlobalProvider } from "./context/GlobalStateContext";

function App() {
  // App will handle the global state of the game and where we are at.
  const [currentPlanet, setCurrentPlanet] = useState<Planet>(PlanetData[2]); // Current planet we are visiting

  // State to check the progress of a planet

  // Current dialogue data associated with that planet
  const [currentDialogue, setCurrentDialogue] = useState<PlanetDialogueSection>(
    PlanetDialogue[PlanetData[2].name]
  );

  useEffect(() => {
    // Get the dialog based on the planet
    const dialogue: PlanetDialogueSection = PlanetDialogue[currentPlanet.name];

    setCurrentDialogue(dialogue);
  }, []);

  return (
    <GlobalProvider>
      <main>
        <ShipScene
          dialogue={currentDialogue}
          currentPlanet={currentPlanet}
          setCurrentPlanet={setCurrentPlanet}
        />
      </main>
    </GlobalProvider>
  );
}

export default App;
