// import React, { useState, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";

// function STLViewer() {
//   const [model, setModel] = useState(null);

//   // Load the STL file
//   const loadModel = () => {
//     const loader = new STLLoader();
//     loader.load(
//       "/models/3d-Hologramm-(Standard Tessellation Language ASCII).stl", // Path to your STL file
//       (geometry) => {
//         const material = new THREE.MeshStandardMaterial({ color: "gray" });
//         const mesh = new THREE.Mesh(geometry, material);
//         setModel(mesh); // Set the mesh object after loading
//       },
//       undefined, // Progress callback
//       (error) => {
//         console.error("Error loading STL model:", error);
//       }
//     );
//   };

//   // Load model when component is mounted
//   useEffect(() => {
//     loadModel();
//   }, []);

//   return (
//     <Canvas>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       <OrbitControls />
//       {/* Use primitive to render the mesh */}
//       {model && <primitive object={model} />}
//     </Canvas>
//   );
// }

// export default STLViewer;
