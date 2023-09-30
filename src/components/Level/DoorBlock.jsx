import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BOX_GEOMETRY_1_1_1 } from "../../constants/geometries";
import {
  MATERIAL_GREEN_YELLOW,
  MATERIAL_ORANGE_RED,
} from "../../constants/materials";
import { RigidBody } from "@react-three/rapier";

const DoorBlock = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef(null);
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const newPosition = {
      x: position[0] + Math.sin(time + timeOffset) * 1.25,
      y: position[1] + 0.75,
      z: position[2],
    };
    if (obstacle?.current) {
      obstacle.current.setNextKinematicTranslation(newPosition);
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
          scale={[1.5, 1.5, 0.3]}
          geometry={BOX_GEOMETRY_1_1_1}
          material={MATERIAL_ORANGE_RED}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
};

export default DoorBlock;
