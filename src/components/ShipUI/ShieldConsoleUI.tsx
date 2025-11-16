import * as Slider from "@radix-ui/react-slider";

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
import { FaWindowClose } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import type {
  DialogueEntry,
  Planet,
  PlanetProgression,
} from "../../types/global";
import { TutorialDialogue } from "../../constants/PlanetTutorial";

type ShieldConsoleUIProps = {
  setCurrentScreen: Dispatch<SetStateAction<string | null>>;
  setCurrentTutorialText: Dispatch<SetStateAction<DialogueEntry[] | null>>;
  setScreenSelected: Dispatch<SetStateAction<boolean>>;
  setPlanets: Dispatch<SetStateAction<Record<string, PlanetProgression>>>;
  playButtonHover: () => void;
  showDataCollected: () => void;
  currentPlanet: Planet;
  talking: boolean;
  tutorial: boolean;
  tutorialStep: number;
  enteredAtmos: boolean;
};

const ShieldConsoleUI = ({
  setCurrentScreen,
  setCurrentTutorialText,
  setScreenSelected,
  setPlanets,
  playButtonHover,
  showDataCollected,
  currentPlanet,
  talking,
  tutorial,
  tutorialStep,
  enteredAtmos,
}: ShieldConsoleUIProps) => {
  const holoRef = useRef<HTMLDivElement>(null!);

  // State for the close button UI
  const [closeHover, setCloseHover] = useState<boolean>(false);

  // State to to check if the temperature is correct
  const [stable, setStable] = useState<boolean>(false);

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

  const handleMeterChange = (meter: number) => {
    if (meter === currentPlanet.meter) {
      setStable(true);

      setPlanets((prev) => ({
        ...prev,
        [currentPlanet.name]: {
          ...prev[currentPlanet.name],
          temp: true,
          complete: true,
        },
      }));

      showDataCollected();

      setTimeout(handleClose, 2000);
    }
  };

  return (
    <div
      ref={holoRef}
      className="absolute flex justify-center top-40 left-0 right-0 z-40"
    >
      <div className="hologram relative px-12 py-6 rounded-md w-4/5 sm:w-2/3">
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

        <div className="flex-center my-10 flex flex-col gap-2 items-center">
          {stable ? (
            <p className="text-green-400 text-3xl">Shields Stable</p>
          ) : (
            <p className="text-red-400 text-3xl">Shields Unstable</p>
          )}
          {!enteredAtmos && (
            <p className="hologram-text flex-center text-xl">
              Cannot adjust unless entering atmosphere!
            </p>
          )}
        </div>

        <Slider.Root
          className="SliderRoot mb-20"
          defaultValue={[10]}
          onValueChange={(meter) => handleMeterChange(meter[0])}
          disabled={talking || stable || !enteredAtmos}
          max={100}
          step={1}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>
      </div>
    </div>
  );
};

export default ShieldConsoleUI;
