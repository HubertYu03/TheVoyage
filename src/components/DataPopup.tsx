import gsap from "gsap";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";

type DataPopupProps = {
  dataCollected: boolean;
  setDataCollected: Dispatch<SetStateAction<boolean>>;
};

const DataPopup = ({ dataCollected, setDataCollected }: DataPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dataCollected && popupRef.current) {
      // Animate in
      gsap.fromTo(
        popupRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            // Animate out after 2 seconds
            gsap.to(popupRef.current, {
              y: -50,
              opacity: 0,
              duration: 0.5,
              delay: 2,
              ease: "power2.in",
              onComplete: () => {
                // Reset state so popup can appear again
                setDataCollected(false);
              },
            });
          },
        }
      );
    }
  }, [dataCollected, setDataCollected]);

  // Always render the div so GSAP can animate it
  return (
    <div
      ref={popupRef}
      className="absolute z-50 top-10 left-10 flex justify-center pointer-events-none"
      style={{ display: dataCollected ? "flex" : "none" }}
    >
      <div className="hologram py-2 px-4">
        <p className="hologram-text">Data Collected: Console Updated</p>
      </div>
    </div>
  );
};

export default DataPopup;
