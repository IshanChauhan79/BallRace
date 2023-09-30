import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { BOX_GEOMETRY_1_1_1 } from "../../constants/geometries";
import { MATERIAL_GREEN_YELLOW } from "../../constants/materials";

const AxeBlock = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef(null);
  const model = useGLTF("./axe.gltf");
  const [axeModel] = useState(() => model.scene.clone());
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  axeModel.children[0].children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (obstacle?.current) {
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(
        new THREE.Euler(0, 0, Math.PI + Math.sin(time + timeOffset))
      );
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
        colliders={false}
        position={[0, 2, 0]}
        restitution={0.2}
        friction={0}
        scale={2}
        rotation-z={Math.PI}
      >
        <CuboidCollider args={[0.38, 0.2, 0.08]} position={[0, 0.7, 0]} />
        <CuboidCollider args={[0.03, 0.4, 0.08]} position={[0, 0.4, 0]} />
        <group position={[0, 0.2, 0]}>
          <primitive object={axeModel} castshadow />
        </group>
      </RigidBody>
    </group>
  );
};

export default AxeBlock;

// <mesh scale={4} rotation-y={Math.PI * 0.5} position-x={2}>
// <planeGeometry />
// <meshStandardMaterial color="black" />
// </mesh>
// <RigidBody
// ref={obstacle}
// type="kinematicPosition"
// position={[0, 0.3, 0]}
// restitution={0.2}
// friction={0}
// >
// <primitive object={}
// </RigidBody>
{
  /* <mesh
scale={[3.5, 0.3, 0.3]}
geometry={BOX_GEOMETRY_1_1_1}
material={MATERIAL_ORANGE_RED}
receiveShadow
castShadow
/> */
}
