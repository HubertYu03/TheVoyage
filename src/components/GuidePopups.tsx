import gsap from "gsap";

import { useEffect, useState } from "react";

import { PlanetTutorialList } from "../constants/PlanetTutorial";

type GuidePopupsProps = {
  tutorialIndex: number;
};

const GuidePopups = ({ tutorialIndex }: GuidePopupsProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (PlanetTutorialList[tutorialIndex]) {
      setVisible(true);
    }
  }, [tutorialIndex]);

  if (!visible) return null;

  return <div className="absolute z-50 text-white">Test</div>;
};

export default GuidePopups;
