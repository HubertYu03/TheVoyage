import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import gsap from "gsap";

gsap.registerPlugin(SplitText);

type InterfaceManagerProps = {
  start: boolean;
};

const InterfaceManager = ({ start }: InterfaceManagerProps) => {
  useGSAP(() => {
    // split elements with the class "split" into words and characters
    let split = SplitText.create(".main-text", { type: "words, chars" });

    gsap.set(split.chars, { opacity: 0 });
    gsap.to(split.chars, {
      opacity: 1,
      duration: 0,
      stagger: 0.04,
      delay: 1.5,
    });
  }, [start]);

  return (
    <div className="absolute bottom-20 left-0 right-0 z-50 flex justify-center">
      {start && (
        <div className="hologram px-12 py-6 rounded-md max-w-3xl">
          <span className="hologram-text text-wrap main-text">
            Good Morning Victoria, I love youuu
          </span>
        </div>
      )}
    </div>
  );
};

export default InterfaceManager;
