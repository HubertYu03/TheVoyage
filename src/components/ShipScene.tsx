// Importing Components
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Ship from "../models/Ship";

import { OrbitControls } from "@react-three/drei";
import {
  EffectComposer,
  Outline,
  SelectiveBloom,
} from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Importing Three Types
import * as THREE from "three";

const FPSControls = () => {
  const controlRef = useRef<OrbitControlsImpl>(null!);
  const forward: THREE.Vector3 = useMemo(() => new THREE.Vector3(), []);

  const { camera }: { camera: THREE.Camera } = useThree();

  // Set the camera initial properties
  useEffect(() => {
    camera.position.set(0, 3.5, -4);

    // Initial look direction
    controlRef.current.target.set(0, 3, -2.5);
    controlRef.current.update();
  }, []);

  useFrame((state) => {
    state.camera.getWorldDirection(forward);
  });

  return (
    <OrbitControls
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

const ShipScene = () => {
  const lightRef = useRef<THREE.PointLight>(null!);

  return (
    <section className="canvas">
      <Canvas>
        <FPSControls />

        <ambientLight intensity={1} />
        <pointLight ref={lightRef} intensity={0.5} position={[0, 3.5, -4]} />
        <Ship />

        {/* Effect Composer Settings */}
        <EffectComposer>
          <SelectiveBloom
            mipmapBlur
            selectionLayer={1}
            lights={[lightRef]}
            luminanceThreshold={1}
            levels={3.1}
            intensity={0.2}
          />
        </EffectComposer>
      </Canvas>
    </section>
  );
};

export default ShipScene;
