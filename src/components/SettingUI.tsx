// Importing button icons
import { useState } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

type SettingUIProps = {
  playAmbience: () => void;
  stopAmbience: () => void;
};

const SettingUI = ({ playAmbience, stopAmbience }: SettingUIProps) => {
  const [soundOn, setSoundOn] = useState<boolean>(true);

  const handleClickSound = () => {
    // Toggle sound
    if (soundOn) {
      stopAmbience();
    } else {
      playAmbience();
    }

    // Toggle sound state
    setSoundOn(!soundOn);
  };

  return (
    <div className="z-50 relative">
      <div className="ui-button-container">
        <div
          className="text-white hologram p-3 button"
          onClick={handleClickSound}
        >
          {soundOn ? (
            <MdMusicNote color="#00D4FF" />
          ) : (
            <MdMusicOff color="#00D4FF" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingUI;
