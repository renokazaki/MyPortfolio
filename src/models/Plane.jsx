import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import planeScene from "../assets/3d/plane.glb";
import { useFrame } from "@react-three/fiber";

// 3D Model from: https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db
export function Plane({ ...props }) {
  const PlaneRef = useRef();
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(planeScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, PlaneRef);

  // Use an effect to control the plane's animation based on 'isRotating'
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  return (
    <mesh {...props} ref={PlaneRef}>
      // use the primitive element when you want to directly embed a complex 3D
      model or scene
      <primitive object={scene} />
    </mesh>
  );
}
