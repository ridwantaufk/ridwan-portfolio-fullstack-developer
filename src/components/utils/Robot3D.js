import React, { useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Import GLTFLoader

const Robot3D = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);

  useLayoutEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    // Set the renderer's alpha to true for transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Set the scene background to transparent (optional)
    scene.background = new THREE.Color(0x000000); // Set background color to black (or any other color)
    renderer.setClearColor(0x000000, 0); // Set renderer background to transparent

    // Add ambient light
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Add a directional light for better shading
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load the .glb model using GLTFLoader
    const loader = new GLTFLoader();
    loader.load(
      "/models/robot_3d.glb", // Replace with the correct path to your .glb model
      (gltf) => {
        modelRef.current = gltf.scene;

        // Scale and position the model
        modelRef.current.scale.set(0.2, 0.2, 0.2); // Scale down the model
        modelRef.current.position.set(0, -1, 0); // Adjust position to center
        scene.add(modelRef.current);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the GLB model:", error);
      }
    );

    // Camera setup
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (modelRef.current) {
        // Keep rotating the model with a constant speed
        modelRef.current.rotation.y += 0.01; // Adjust the value for speed
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize observer to update canvas size
    const resizeObserver = new ResizeObserver(() => {
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
    });

    resizeObserver.observe(mountRef.current);

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="robot3d-container" // Add the class for styling
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1, // Ensures it stays behind the content
        background: "transparent", // Make sure there's no background
      }}
    />
  );
};

export default Robot3D;
