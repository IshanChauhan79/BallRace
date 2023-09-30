import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
// import { useHelper } from "@react-three/drei";
// import { DirectionalLightHelper } from "three";

const Lights = () => {
  const directionalLight = useRef(null);
  // useHelper(directionalLight, DirectionalLightHelper, 1);

  useFrame((state) => {
    directionalLight.current.position.z = state.camera.position.z + 1 - 4;
    directionalLight.current.target.position.z = state.camera.position.z - 4;
    directionalLight.current.target.updateMatrixWorld();
  });
  return (
    <>
      <directionalLight
        ref={directionalLight}
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[2024, 2024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />

      <ambientLight intensity={0.8} />
    </>
  );
};

export default Lights;
