import { MATERIAL_LIME_GREEN } from "../../constants/materials";
import { BOX_GEOMETRY_1_1_1 } from "../../constants/geometries";
import { Float, Text } from "@react-three/drei";

const StartBlock = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        geometry={BOX_GEOMETRY_1_1_1}
        material={MATERIAL_LIME_GREEN}
        receiveShadow
      />
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="./Bebas_Neue/bebas-neue-v9-latin-regular.woff"
          scale={0.3}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
    </group>
  );
};

export default StartBlock;
