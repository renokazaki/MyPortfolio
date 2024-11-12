import { Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
const Ground = () => {
  return (
    <>
      //物理要素の付与
      <RigidBody type="fixed">
        <mesh
          scale={5}
          scale-x={10}
          position={[0, -2, 0]}
          rotation={[4.75, 0, 0]}
        >
          <planeGeometry />
          <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Ground;
