// Importing Dependencies
import gsap from "gsap";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

// Importinc Icons
import { FaWindowClose } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { PlanetData } from "../../constants/PlanetData";
import type {
  DialogueEntry,
  Planet,
  PlanetProgression,
} from "../../types/global";
import { TutorialDialogue } from "../../constants/PlanetTutorial";

type ConsoleUIProps = {
  setCurrentScreen: Dispatch<SetStateAction<string | null>>;
  setCurrentTutorialText: Dispatch<SetStateAction<DialogueEntry[] | null>>;
  setScreenSelected: Dispatch<SetStateAction<boolean>>;
  playButtonHover: () => void;
  currentPlanet: Planet;
  talking: boolean;
  tutorial: boolean;
  tutorialStep: number;
  planets: Record<string, PlanetProgression>;
};

const ConsoleUI = ({
  setCurrentScreen,
  setCurrentTutorialText,
  setScreenSelected,
  playButtonHover,
  currentPlanet,
  talking,
  tutorial,
  tutorialStep,
  planets,
}: ConsoleUIProps) => {
  const holoRef = useRef<HTMLDivElement>(null!);

  // State for the close button UI
  const [closeHover, setCloseHover] = useState<boolean>(false);

  // States for planet selection
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(currentPlanet);

  useEffect(() => {
    setSelectedPlanet(currentPlanet); // Set the currently selected planet for the inteface

    gsap.fromTo(holoRef.current, { scale: 0.2 }, { scale: 1, duration: 0.2 });
  }, []);

  // Functions for the close button
  const handleClose = () => {
    if (!talking) {
      playButtonHover();

      gsap.to(holoRef.current, {
        scale: 0.01,
        duration: 0.2,
        onComplete: () => {
          setCurrentScreen(null);
          setScreenSelected(false);

          if (tutorial && tutorialStep === 1) {
            setCurrentTutorialText(TutorialDialogue["Explain Orbit Controls"]);
          }
        },
      });
    }
  };

  // Functions for current planet selecton
  const handleSelectConsoleTab = (planet: Planet) => {
    if (!talking) {
      setSelectedPlanet(planet);
      playButtonHover();
    }
  };

  return (
    <div
      ref={holoRef}
      className="absolute flex justify-center top-40 left-0 right-0 z-40"
    >
      <div className="hologram relative px-12 py-6 rounded-md w-4/5 sm:w-2/3">
        {/* Header container that contains the title and the close button */}
        <div className="flex-center-row justify-between">
          <p className="hologram-text text-4xl font-bold">CONSOLE</p>

          <div
            onMouseEnter={() => setCloseHover(true)}
            onMouseLeave={() => setCloseHover(false)}
            onClick={handleClose}
            className="button"
            style={{ display: talking ? "none" : "" }}
          >
            {closeHover ? (
              <FaWindowClose size={40} color="#00D4FF" />
            ) : (
              <FaRegWindowClose size={40} color="#00D4FF" />
            )}
          </div>
        </div>

        {/* Body elements */}
        <div className="flex flex-row items-start justify-between p-3">
          {/* Left side will have all the planets that we can select */}
          <div className="w-1/4 flex flex-col gap-3">
            {PlanetData.map((planet) => (
              <div
                key={planet.name}
                className={`hologram-ui console-tab ${
                  selectedPlanet.name !== planet.name
                    ? "hover:opacity-50 active:scale-90"
                    : "shadow-md shadow-[#00D4FF]"
                }`}
                onClick={() => handleSelectConsoleTab(planet)}
              >
                <p
                  className={`hologram-text texl-xl ${
                    selectedPlanet.name === planet.name && "font-extrabold"
                  }`}
                >
                  {planet.name}
                </p>
              </div>
            ))}
          </div>

          {/* Right side will have the information that contains information about the selected planet */}
          <div className="w-3/4 px-12 hologram-text">
            <p className="text-4xl font-bold">{selectedPlanet.name}</p>

            <p className="text-md mt-2">{selectedPlanet.desc}</p>

            <p className="text-2xl mt-5 font-bold">
              {selectedPlanet.name} Data:
            </p>

            <p>
              Color:{" "}
              {planets[currentPlanet.name].color ? currentPlanet.color : "???"}
            </p>
            <p>
              Average Temperature:{" "}
              {planets[currentPlanet.name].temp
                ? `${currentPlanet.avgTempF}°F (${currentPlanet.avgTempC})°C`
                : "???"}
            </p>
            <p>
              Surface Type:{" "}
              {planets[currentPlanet.name].surfaceType
                ? currentPlanet.surfaceType
                : "???"}
            </p>
            <p>
              {"Size(Diameter)"}:{" "}
              {planets[currentPlanet.name].size
                ? `${currentPlanet.sizeMI}mi (${currentPlanet.sizeKM})km`
                : "???"}
            </p>
            <p>
              Moons:{" "}
              {planets[currentPlanet.name].moons ? currentPlanet.moons : "???"}
            </p>
            <p>
              Rings:{" "}
              {planets[currentPlanet.name].rings
                ? `${currentPlanet.rings ? "Yes" : "No"}`
                : "???"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsoleUI;
