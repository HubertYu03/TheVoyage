// Importing Components
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Ship from "../models/Ship";

import { OrbitControls, useProgress } from "@react-three/drei";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Loading Images
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// Importing Images
import Earth from "/images/Earth.png";
import SpaceBackground from "/images/SpaceBackground.jpeg";

// Importing Three Types
import * as THREE from "three";
import InterfaceManager from "./InterfaceManager";

// Importing GSAP dependencies
import gsap from "gsap";

// Importing Sound dependencies
import useSound from "use-sound";
import ButtonHover from "/sounds/ButtonHover.mp3";
import ShipAmbience from "/sounds/ShipAmbience.mp3";

// Import Custom UI
import SettingUI from "./SettingUI";
import GuidePopups from "./GuidePopups";
import InteractiveHelper from "./InteractiveHelper";

// Importing Ship UI
import ConsoleUI from "./ShipUI/ConsoleUI";

// Importing Custom Types
import type {
  DialogueEntry,
  Planet,
  PlanetDialogueSection,
} from "../types/global";
import ShieldConsoleUI from "./ShipUI/ShieldConsoleUI";
import MapConsoleUI from "./ShipUI/MapConsoleUI";
import { useGlobalState } from "../context/GlobalStateContext";
import DataPopup from "./DataPopup";

const FPSControls = ({
  talking,
  screenSelected,
}: {
  talking: boolean;
  screenSelected: boolean;
}) => {
  const controlRef = useRef<OrbitControlsImpl>(null!);
  const forward: THREE.Vector3 = useMemo(() => new THREE.Vector3(), []);
  const { camera }: { camera: THREE.Camera } = useThree();

  // Set the camera initial properties
  useEffect(() => {
    camera.position.set(0, 3.5, -4);
    controlRef.current.target.set(0, 3, -2.5);
    controlRef.current.update();
  }, []);

  useFrame((state) => {
    state.camera.getWorldDirection(forward);
  });

  return (
    <OrbitControls
      enabled={!talking && !screenSelected}
      ref={controlRef}
      enableZoom={false}
      enablePan={false}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      minAzimuthAngle={Math.PI / 1.2}
      maxAzimuthAngle={-Math.PI / 1.2}
      reverseOrbit
    />
  );
};

type ShipSceneProps = {
  dialogue: PlanetDialogueSection;
  currentPlanet: Planet;
  setCurrentPlanet: Dispatch<SetStateAction<Planet>>;
};

const ShipScene = ({
  dialogue,
  currentPlanet,
  setCurrentPlanet,
}: ShipSceneProps) => {
  const lightLeftRef = useRef<THREE.PointLight>(null!);
  const lightRightRef = useRef<THREE.PointLight>(null!);

  const canvasRef = useRef<HTMLDivElement>(null!);

  const EarthTexture: THREE.Texture<HTMLImageElement> = useLoader(
    TextureLoader,
    Earth
  );
  const SpaceTexture: THREE.Texture<HTMLImageElement> = useLoader(
    TextureLoader,
    SpaceBackground
  );

  // States for if we are in the tutorial
  const [tutorial, setTutorial] = useState<boolean>(
    currentPlanet.name === "Earth"
  );
  const [currentTutorialText, setCurrentTutorialText] = useState<
    DialogueEntry[] | null
  >(null);
  const [tutorialIndex, setTutorialIndex] = useState<number>(0); // Tutorial Popups
  const [tutorialStep, setTutorialStep] = useState<number>(0); // For the tutorial manager to check which step we are on
  const [currentDialogEntry, setCurrentDialogEntry] = useState<
    DialogueEntry[] | null
  >(null);

  // State for talking so that the user cannot pan during text
  const [talking, setTalking] = useState<boolean>(false);

  // State for checking if the canvas is loaded
  const { active } = useProgress();

  // State for starting the game
  const [start, setStart] = useState<boolean>(false);

  // State for progression
  const [enteredAtmos, setEnteredAtmos] = useState<boolean>(false);
  const [dataCollected, setDataCollected] = useState<boolean>(false);
  const { planets, setPlanets } = useGlobalState();

  // Helper function to play the data collected notification
  const showDataCollected = () => {
    setDataCollected(true);
  };

  // States for managing what is being hovered over and what is clicked
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);
  const [screenSelected, setScreenSelected] = useState<boolean>(false);

  // Animation Functions and Configurations
  const tl = useRef<GSAPTimeline>(null!);

  const handleStart = () => {
    playButtonHover();
    playAmbience();

    // Start the game
    setStart(true);

    // Start the dialogue
    setTalking(true);

    // Start the fade in animation
    tl.current = gsap
      .timeline()
      .fromTo(
        canvasRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.inOut" }
      );
  };

  // Sound Management
  const [playButtonHover] = useSound(ButtonHover, { volume: 0.2 });
  const [playAmbience, { stop: stopAmbience }] = useSound(ShipAmbience, {
    loop: true,
  });

  return (
    <section>
      {/* Interface for Text */}
      <InterfaceManager
        start={start}
        talking={talking}
        setTalking={setTalking}
        playButtonHover={playButtonHover}
        planetDialogueData={dialogue}
        setTutorialIndex={setTutorialIndex}
        currentTutorialText={currentTutorialText}
        tutorial={tutorial}
        setTutorialStep={setTutorialStep}
        currentDialogEntry={currentDialogEntry}
        currentPlanet={currentPlanet}
      />

      {/* Popups for the tutorial */}
      <GuidePopups
        tutorialIndex={
          start && currentPlanet.name == "Earth" ? tutorialIndex : -1
        }
      />

      <DataPopup
        dataCollected={dataCollected}
        setDataCollected={setDataCollected}
      />

      {/* Popups for hovering over clickable elements */}
      <InteractiveHelper hoveredElement={hoveredElement} />

      {/* Buttons for UI */}
      <SettingUI playAmbience={playAmbience} stopAmbience={stopAmbience} />

      {/* Check which screen is selected */}
      {currentScreen === "Console" && (
        <ConsoleUI
          setCurrentScreen={setCurrentScreen}
          setCurrentTutorialText={setCurrentTutorialText}
          setScreenSelected={setScreenSelected}
          talking={talking}
          currentPlanet={currentPlanet}
          playButtonHover={playButtonHover}
          tutorial={tutorial}
          tutorialStep={tutorialStep}
        />
      )}

      {currentScreen === "Shields Console" && (
        <ShieldConsoleUI
          setCurrentScreen={setCurrentScreen}
          setCurrentTutorialText={setCurrentTutorialText}
          setScreenSelected={setScreenSelected}
          playButtonHover={playButtonHover}
          setPlanets={setPlanets}
          showDataCollected={showDataCollected}
          currentPlanet={currentPlanet}
          talking={talking}
          tutorial={tutorial}
          tutorialStep={tutorialStep}
          enteredAtmos={enteredAtmos}
        />
      )}

      {currentScreen === "Map" && (
        <MapConsoleUI
          setCurrentScreen={setCurrentScreen}
          setCurrentTutorialText={setCurrentTutorialText}
          setScreenSelected={setScreenSelected}
          playButtonHover={playButtonHover}
          setCurrentDialogEntry={setCurrentDialogEntry}
          setCurrentPlanet={setCurrentPlanet}
          setTutorial={setTutorial}
          currentPlanet={currentPlanet}
          talking={talking}
          tutorial={tutorial}
          tutorialStep={tutorialStep}
          planets={planets}
        />
      )}

      {!start && !active && (
        <div className="flex-center h-screen">
          <button onClick={handleStart} className="hologram button p-4">
            <p className="hologram-text text-3xl select-none">BEGIN VOYAGE</p>
          </button>
        </div>
      )}

      <div ref={canvasRef} className={`canvas ${!start && "hidden"}`}>
        <Canvas>
          <FPSControls talking={talking} screenSelected={screenSelected} />

          <mesh position={[0, 0, 300]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[400, 400]} />
            <meshBasicMaterial transparent={true} map={EarthTexture} />
          </mesh>

          <mesh position={[0, 0, 395]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[5000, 1500]} />
            <meshBasicMaterial transparent={true} map={SpaceTexture} />
          </mesh>

          <ambientLight intensity={0.1} />
          <pointLight
            ref={lightLeftRef}
            intensity={3}
            position={[3, 3.5, -4]}
            castShadow
          />
          <pointLight
            ref={lightRightRef}
            intensity={3}
            position={[-3, 3.5, -4]}
            castShadow
          />

          <Ship
            talking={talking}
            setHoveredElement={setHoveredElement}
            tutorial={tutorial}
            setCurrentTutorialText={setCurrentTutorialText}
            setTutorialIndex={setTutorialIndex}
            setTutorialStep={setTutorialStep}
            tutorialStep={tutorialStep}
            setCurrentScreen={setCurrentScreen}
            setScreenSelected={setScreenSelected}
            setEnteredAtmos={setEnteredAtmos}
            showDataCollected={showDataCollected}
            screenSelected={screenSelected}
            setPlanets={setPlanets}
            currentPlanet={currentPlanet}
          />

          {/* Effect Composer Settings */}
          <EffectComposer>
            <SelectiveBloom
              mipmapBlur
              selectionLayer={1}
              lights={[lightLeftRef, lightRightRef]}
              luminanceThreshold={1}
              levels={3.1}
              intensity={0.2}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </section>
  );
};

export default ShipScene;
