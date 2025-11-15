// GSAP Imports
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import gsap from "gsap";

// Importing dependencies
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

// Importing Icons
import { BiSolidRightArrow } from "react-icons/bi";
import type { DialogueEntry, PlanetDialogueSection } from "../types/global";

// Importing sound effects
import useSound from "use-sound";
import TextBlip from "/sounds/TextBlip.mp3";

// GSAP Plugin for text animations
gsap.registerPlugin(SplitText);

// Props for the component
type InterfaceManagerProps = {
  start: boolean;
  talking: boolean;
  setTalking: Dispatch<SetStateAction<boolean>>;
  playButtonHover: () => void;
  planetDialogueData: PlanetDialogueSection;
  setTutorialIndex: Dispatch<SetStateAction<number>>;
};

const InterfaceManager = ({
  start,
  talking,
  setTalking,
  playButtonHover,
  planetDialogueData,
  setTutorialIndex,
}: InterfaceManagerProps) => {
  const [dialogIndex, setDialogIndex] = useState<number>(0);
  const [currentTextComplete, setCurrentTextCompete] = useState<boolean>(false);
  // States for loading
  const firstText = useRef<boolean>(true);
  const [fontReady, setFontReady] = useState<boolean>(true);

  // State for holding the current dialogue list
  const [currentDialogue, setCurrentDialogue] = useState<DialogueEntry[]>([]);
  const Avatar = currentDialogue[dialogIndex]?.avatar;

  // Functions for sound effects
  const [playTextBlip] = useSound(TextBlip);

  // Update the dialog data if the planet is changed
  useEffect(() => {
    setCurrentDialogue(planetDialogueData.introDialog);
  }, [planetDialogueData]);

  // Check if the font is loaded
  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontReady(true);
    });
  }, []);

  // Refs for GSAP targetting
  const textRef = useRef<HTMLSpanElement>(null!);
  const arrowRef = useRef<HTMLDivElement>(null!);

  useGSAP(() => {
    if (!start || !textRef.current || !fontReady) return;

    // split elements with the class "split" into words and characters
    let split = SplitText.create(textRef.current, { type: "words, chars" });

    const delay: number = firstText.current ? 1.5 : 0.3;

    let counter: number = 0;

    gsap.set(split.chars, { opacity: 0 });
    gsap.to(split.chars, {
      opacity: 1,
      duration: 0,
      stagger: 0.04,
      delay: delay,
      onUpdate: () => {
        if (counter % 4 == 0) playTextBlip();
        counter++;
      },
      onComplete: () => {
        split.revert();
        setCurrentTextCompete(true);
        firstText.current = false;
      },
    });

    return () => split.revert();
  }, [start, dialogIndex]);

  // Animate the continue arrow
  useEffect(() => {
    if (currentTextComplete && arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 2,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  }, [currentTextComplete]);

  // Helper Functions
  const handleNextText = () => {
    if (currentTextComplete) {
      // Play sound effect
      playButtonHover();

      // Set the current text to be complete
      setCurrentTextCompete(false);

      // Check if there is anymore dialogue
      if (dialogIndex + 1 >= currentDialogue.length) {
        setTalking(false);
        setDialogIndex(0);
        setTutorialIndex(0);
      } else {
        setDialogIndex(dialogIndex + 1);
        setTutorialIndex(dialogIndex + 1);
      }
    }
  };

  return (
    <div className="absolute bottom-20 left-0 right-0 z-50 flex justify-center">
      {start && talking && (
        <div
          className="hologram relative px-12 py-6 rounded-md w-1/3"
          onClick={handleNextText}
        >
          {/* Speaker Name */}
          <div className="dialogue-name">
            {currentDialogue[dialogIndex].speaker}
          </div>

          {/* Avatar and Text */}
          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-col items-center">
              <Avatar color="#00D4FF" size={40} />
            </div>
            <span ref={textRef} className="hologram-text select-none">
              {currentDialogue[dialogIndex].text}
            </span>
          </div>

          {currentTextComplete && (
            <div ref={arrowRef} className="absolute bottom-0 right-3 my-2">
              <BiSolidRightArrow color="#00D4FF" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterfaceManager;
