import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Computer3D = () => {
  const mountRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const modelRef = useRef(null);
  const isDragging = useRef(false);
  const isZooming = useRef(false); // New ref for zooming
  const previousMouse = useRef({ x: 0, y: 0 });
  const [isHoverDisabled, setIsHoverDisabled] = useState(false); // State for hover control
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Event Handlers outside of useLayoutEffect
  const onMouseMove = (event) => {
    if (mountRef.current && !isDragging.current && !isZooming.current) {
      const halfWidth = mountRef.current.clientWidth / 2;
      const halfHeight = mountRef.current.clientHeight / 2;
      mouseX.current = (event.clientX - halfWidth) / halfWidth;
      mouseY.current = (event.clientY - halfHeight) / halfHeight;
    }
  };

  const onMouseDown = (event) => {
    if (event.button === 0 && mountRef.current) {
      isDragging.current = true;
      previousMouse.current = { x: event.clientX, y: event.clientY };
      mountRef.current.style.cursor = "grabbing";
      setIsHoverDisabled(true); // Disable hover during dragging
    }
  };

  const onMouseMoveDrag = (event) => {
    if (isDragging.current && modelRef.current) {
      const deltaX = event.clientX - previousMouse.current.x;
      const deltaY = event.clientY - previousMouse.current.y;

      modelRef.current.rotation.y += deltaX * 0.005;
      modelRef.current.rotation.x += deltaY * 0.005;

      previousMouse.current = { x: event.clientX, y: event.clientY };
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (mountRef.current) {
      mountRef.current.style.cursor = "grab";
    }
    setIsHoverDisabled(false); // Re-enable hover after dragging
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    if (mountRef.current) {
      mountRef.current.style.cursor = "grab";
    }
    setIsHoverDisabled(false); // Re-enable hover after leaving
  };

  const onWheel = (event) => {
    if (modelRef.current) {
      // Reverse the zoom direction for pinch gestures (touchpad or mobile)
      const zoomAmount = -event.deltaY * 0.01; // Reverse the deltaY

      // Set the zoom limits
      const minScale = 0.3; // Minimum scale
      const maxScale = 3; // Maximum scale

      // Apply the zoom amount but make sure to stay within the bounds
      modelRef.current.scale.x = Math.min(
        Math.max(modelRef.current.scale.x + zoomAmount, minScale),
        maxScale
      );
      modelRef.current.scale.y = Math.min(
        Math.max(modelRef.current.scale.y + zoomAmount, minScale),
        maxScale
      );
      modelRef.current.scale.z = Math.min(
        Math.max(modelRef.current.scale.z + zoomAmount, minScale),
        maxScale
      );

      isZooming.current = true; // Indicate zooming is in progress
      setIsHoverDisabled(true); // Disable hover during zoom
      event.preventDefault(); // Prevent default scrolling behavior
    }
  };

  // Reset zoom state after zoom is completed
  useEffect(() => {
    const timeout = setTimeout(() => {
      isZooming.current = false;
      setIsHoverDisabled(false); // Re-enable hover after zooming
    }, 100); // Delay to ensure zoom has completed

    return () => clearTimeout(timeout);
  }, [isZooming.current]);

  useLayoutEffect(() => {
    // Only proceed if mountRef is available
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const loader = new GLTFLoader();
    loader.load(
      "/models/programmer_desktop_3d_pc.glb",
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -2, 0);
        model.scale.set(0.8, 0.8, 0.8);
        modelRef.current = model;
        scene.add(model);

        const animate = () => {
          requestAnimationFrame(animate);
          if (modelRef.current) {
            const rotationAngle = mouseX.current * Math.PI * 0.1;
            modelRef.current.rotation.y +=
              (rotationAngle - modelRef.current.rotation.y) * 0.1;
          }
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the model:", error);
      }
    );

    camera.position.z = 5;

    const onResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", onResize);

    if (mountRef.current) {
      document.addEventListener("mousemove", onMouseMove);
      mountRef.current.addEventListener("mousedown", onMouseDown);
      mountRef.current.addEventListener("mousemove", onMouseMoveDrag);
      mountRef.current.addEventListener("mouseup", onMouseUp);
      mountRef.current.addEventListener("mouseleave", onMouseLeave);
      mountRef.current.addEventListener("wheel", onWheel);
    }

    return () => {
      if (mountRef.current) {
        window.removeEventListener("resize", onResize);
        mountRef.current.removeChild(renderer.domElement);
        document.removeEventListener("mousemove", onMouseMove);
        mountRef.current.removeEventListener("mousedown", onMouseDown);
        mountRef.current.removeEventListener("mousemove", onMouseMoveDrag);
        mountRef.current.removeEventListener("mouseup", onMouseUp);
        mountRef.current.removeEventListener("mouseleave", onMouseLeave);
        mountRef.current.removeEventListener("wheel", onWheel);
      }
    };
  }, []); // Dependency array is empty, so it runs only on mount

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh", // Full viewport height
        cursor: isHoverDisabled ? "auto" : "grab", // Disable hover cursor
        overflow: "hidden",
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
    />
  );
};

export default Computer3D;
