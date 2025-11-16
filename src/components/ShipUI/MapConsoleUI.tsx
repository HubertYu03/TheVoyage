// Importing dependencies
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import gsap from "gsap";

// Importing Icons
import {
  FaRegWindowClose,
  FaAngleDoubleUp,
  FaWindowClose,
} from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { IoMdAlert, IoIosCheckmarkCircle } from "react-icons/io";

import type { IconType } from "react-icons";

import type {
  DialogueEntry,
  Planet,
  PlanetProgression,
} from "../../types/global";

// Importing Constants
import { TutorialDialogue } from "../../constants/PlanetTutorial";
import { PlanetData } from "../../constants/PlanetData";
import { PlanetDialogue } from "../../constants/PlanetDialogue";

// IMporting sounds
import useSound from "use-sound";
import Error from "/sounds/Error.mp3";

type ShieldConsoleUIProps = {
  setCurrentScreen: Dispatch<SetStateAction<string | null>>;
  setCurrentTutorialText: Dispatch<SetStateAction<DialogueEntry[] | null>>;
  setScreenSelected: Dispatch<SetStateAction<boolean>>;
  setCurrentDialogEntry: Dispatch<SetStateAction<DialogueEntry[] | null>>;
  setCurrentPlanet: Dispatch<SetStateAction<Planet>>;
  setTutorial: Dispatch<SetStateAction<boolean>>;
  playButtonHover: () => void;
  currentPlanet: Planet;
  talking: boolean;
  tutorial: boolean;
  tutorialStep: number;
  planets: Record<string, PlanetProgression>;
};

const MapConsoleUI = ({
  setCurrentScreen,
  setCurrentTutorialText,
  setScreenSelected,
  playButtonHover,
  setCurrentDialogEntry,
  setCurrentPlanet,
  setTutorial,
  currentPlanet,
  talking,
  tutorial,
  tutorialStep,
  planets,
}: ShieldConsoleUIProps) => {
  const holoRef = useRef<HTMLDivElement>(null!);

  // State for the close button UI
  const [closeHover, setCloseHover] = useState<boolean>(false);

  const [planetHover, setPlanetHover] = useState<string | null>(null);

  const [playError] = useSound(Error, { volume: 0.2 });

  useEffect(() => {
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

          if (tutorial && tutorialStep === 5) {
            setCurrentTutorialText(TutorialDialogue["Shields Complete"]);
          }
        },
      });
    }
  };

  const handleMapClick = (index: number) => {
    console.log(index);

    setCurrentDialogEntry(PlanetDialogue[currentPlanet.name].outroDialog);
    handleClose();
    setCurrentPlanet(PlanetData[0]);

    setTutorial(false);
  };

  return (
    <div
      ref={holoRef}
      className="absolute flex justify-center top-40 left-0 right-0 z-40"
    >
      <div className="hologram relative px-12 py-6 rounded-md w-4/5 sm:w-2/3">
        {/* Header with title and close button */}
        <div className="flex-center-row justify-between">
          <p className="hologram-text text-4xl font-bold">MAP</p>

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

        <div className="flex-center pt-10 -mb-10">
          <p className="hologram-text text-2xl font-bold">
            {planetHover ? planetHover : "Click planet to choose desintation"}
          </p>
        </div>

        {/* Map Component */}
        <div className="flex-center-row justify-between">
          {PlanetData.map((planet, index) => {
            const PlanetIcon: IconType = planet.icon;

            // Configure what shows on the map
            // Set the locked planets
            const currentPlanetIndex = PlanetData.findIndex(
              (planetData) => planetData.name === planet.name
            );

            let locked: boolean;
            if (planet.name != "Earth" && planet.name != "Mercury") {
              const previousPlanet: string =
                PlanetData[currentPlanetIndex - 1].name;

              locked = !planets[previousPlanet].complete;
            } else {
              if (planet.name === "Mercury") {
                locked = !planets["Earth"].complete;
              } else {
                locked = false;
              }
            }

            return (
              <div
                key={planet.name}
                style={{ marginTop: `${index * 20}px` }}
                className="map-icon flex flex-col items-center gap-4"
                onMouseEnter={() => setPlanetHover(planet.name)}
                onMouseLeave={() => setPlanetHover(null)}
                onClick={() => {
                  if (!locked) handleMapClick(index);

                  playError();
                }}
              >
                <PlanetIcon
                  size={planet.iconScale - 10}
                  className="hover:shadow-lg hover:shadow-[#00d4ff] rounded-full"
                  color={
                    currentPlanet.name === planet.name ? "#00d4ff" : "#000000"
                  }
                />
                {/* Load Icons based on status of the planet */}
                {/* Locked Planet */}
                {locked && <FaLock color="#00d4ff" />}

                {/* Available Planet */}
                {currentPlanet.name === planet.name && (
                  <FaAngleDoubleUp color="#00d4ff" />
                )}

                {/* Unlocked and can visit */}
                {!locked &&
                  !planets[planet.name].complete &&
                  currentPlanet.name !== planet.name && (
                    <IoMdAlert color="#00d4ff" />
                  )}

                {/* Visited and completed */}
                {planets[planet.name].complete &&
                  currentPlanet.name !== planet.name && (
                    <IoIosCheckmarkCircle color="#00d4ff" />
                  )}
              </div>
            );
          })}
        </div>

        <div className="flex-center mt-10">
          <p className="hologram-text text-3xl">
            Current Location: {currentPlanet.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapConsoleUI;
