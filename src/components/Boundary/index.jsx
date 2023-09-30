import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { MATERIAL_SLATE_GRAY } from "../../constants/materials";
import { BOX_GEOMETRY_1_1_1 } from "../../constants/geometries";

const Boundry = ({ length = 7 }) => {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          position={[2.15, 0.75, -(length * 2) + 2]}
          geometry={BOX_GEOMETRY_1_1_1}
          material={MATERIAL_SLATE_GRAY}
          scale={[0.3, 1.5, 4 * length]}
          castShadow
        />
        <mesh
          position={[-2.15, 0.75, -(length * 2) + 2]}
          geometry={BOX_GEOMETRY_1_1_1}
          material={MATERIAL_SLATE_GRAY}
          scale={[0.3, 1.5, 4 * length]}
          receiveShadow
          castShadow
        />
        <mesh
          position={[0, 0.75, -(length * 4) + 2]}
          geometry={BOX_GEOMETRY_1_1_1}
          material={MATERIAL_SLATE_GRAY}
          scale={[4, 1.5, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
};

export default Boundry;
