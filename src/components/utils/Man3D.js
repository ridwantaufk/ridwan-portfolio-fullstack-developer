import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

// Komponen untuk menampilkan model 3D
function ProgrammerModel() {
  const { scene, animations } = useGLTF("/models/programmer.glb"); // Path model .glb

  React.useEffect(() => {
    if (animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => mixer.clipAction(clip).play());
      const clock = new THREE.Clock();

      const animate = () => {
        requestAnimationFrame(animate);
        mixer.update(clock.getDelta());
      };
      animate();

      return () => mixer.stopAllAction(); // Cleanup animasi
    }
  }, [animations, scene]);

  return (
    <primitive object={scene} position={[0, -1, 0]} scale={[1.5, 1.5, 1.5]} />
  );
}

// Komponen utama
export default function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas
          camera={{ position: [0, 2, 5], fov: 50 }} // Set camera position
          style={{ height: "85vh", width: "100%" }} // Ensure Canvas covers full screen
        >
          {/* Enable mouse control of camera with OrbitControls */}
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <ProgrammerModel />
        </Canvas>
      </Suspense>
    </div>
  );
}
