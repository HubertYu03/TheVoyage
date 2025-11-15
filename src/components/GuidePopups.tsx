import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { PlanetTutorialList } from "../constants/PlanetTutorial";

type GuidePopupsProps = {
  tutorialIndex: number;
};

const GuidePopups = ({ tutorialIndex }: GuidePopupsProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>("");

  useEffect(() => {
    const text = PlanetTutorialList[tutorialIndex];
    if (text) {
      setCurrentText(text);
      setVisible(true);

      // Entrance animation
      if (popupRef.current) {
        gsap.set(popupRef.current, { y: -50, opacity: 0 });

        gsap.to(popupRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    } else if (visible) {
      // Exit animation
      if (popupRef.current) {
        gsap.to(popupRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setVisible(false);
            setCurrentText(""); // clear text after animation
          },
        });
      }
    }
  }, [tutorialIndex]);

  // Always render the div so GSAP can animate it
  return (
    <div
      ref={popupRef}
      className="absolute z-50 top-10 left-0 right-0 flex justify-center pointer-events-none"
      style={{ display: visible || currentText ? "flex" : "none" }}
    >
      <div className="hologram py-2 px-4">
        <p className="hologram-text">{currentText}</p>
      </div>
    </div>
  );
};

export default GuidePopups;
