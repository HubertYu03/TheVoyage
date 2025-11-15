import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(SplitText);

type InterfaceManagerProps = {
  start: boolean;
};

const test = ["Test 1", "Test 2"];

const InterfaceManager = ({ start }: InterfaceManagerProps) => {
  const [talking, setTalking] = useState<boolean>(true);
  const [dialogIndex, setDialogIndex] = useState<number>(0);
  const firstText = useRef<boolean>(true);

  const [fontReady, setFontReady] = useState<boolean>(true);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontReady(true);
    });
  }, []);

  const textRef = useRef<HTMLSpanElement>(null!);

  useGSAP(() => {
    if (!start || !textRef.current || !fontReady) return;

    // split elements with the class "split" into words and characters
    let split = SplitText.create(textRef.current, { type: "chars" });

    const delay: number = firstText.current ? 1.5 : 0.3;

    gsap.set(split.chars, { opacity: 0 });
    gsap.to(split.chars, {
      opacity: 1,
      duration: 0,
      stagger: 0.06,
      delay: delay,
      onComplete: () => {
        console.log("Text completed");
        firstText.current = false;
      },
    });
  }, [start, dialogIndex]);

  const handleNextText = () => {
    setDialogIndex(dialogIndex + 1);
  };

  return (
    <div className="absolute bottom-20 left-0 right-0 z-50 flex justify-center">
      {start && talking && (
        <div
          className="hologram px-12 py-6 rounded-md w-1/3"
          onClick={handleNextText}
        >
          <span ref={textRef} className="hologram-text text-wrap">
            {test[dialogIndex]}
          </span>
        </div>
      )}
    </div>
  );
};

export default InterfaceManager;
