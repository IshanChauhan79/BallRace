import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import {
  MATERIAL_GREEN_YELLOW,
  MATERIAL_ORANGE_RED,
} from "../../constants/materials";
import { BOX_GEOMETRY_1_1_1 } from "../../constants/geometries";

const Spinner = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef(null);
  const [speed] = useState(() => {
    const random = Math.random();
    if (random < 0.5) {
      return -1 * (random + 0.2);
    }
    return random + 0.2;
  });
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (obstacle?.current) {
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
      obstacle.current.setNextKinematicRotation(rotation);
    }
  });
  return (
    <group position={position}>
      <mesh
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        geometry={BOX_GEOMETRY_1_1_1}
        material={MATERIAL_GREEN_YELLOW}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          scale={[3.5, 0.3, 0.3]}
          geometry={BOX_GEOMETRY_1_1_1}
          material={MATERIAL_ORANGE_RED}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
};

export default Spinner;
