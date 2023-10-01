import { Text, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { BOX_GEOMETRY_1_1_1 } from "../../constants/geometries";
import { MATERIAL_LIME_GREEN } from "../../constants/materials";

const EndBlock = ({ position = [0, 0, 0] }) => {
  const hamburger = useGLTF("./hamburger.glb");
  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <mesh
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        geometry={BOX_GEOMETRY_1_1_1}
        material={MATERIAL_LIME_GREEN}
        receiveShadow
      />
      <RigidBody type="fixed" colliders="hull" restitution={0.2} friction={0}>
        <primitive object={hamburger.scene} scale={0.2} position-y={0.2} />
      </RigidBody>
      <Text
        font="./Bebas_Neue/bebas-neue-v9-latin-regular.woff"
        scale={1}
        position={[0, 2, 2]}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
    </group>
  );
};

export default EndBlock;
