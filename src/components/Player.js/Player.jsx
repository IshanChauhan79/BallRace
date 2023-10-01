import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, useRapier } from "@react-three/rapier";
import useGame from "../../store/useGame";

const Player = () => {
  /**
   * states
   */
  // camera states
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  /**
   * physcis
   */
  const { rapier, world } = useRapier();

  /**
   * controls
   */
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const blocksCount = useGame((state) => state.blocksCount);
  const restart = useGame((state) => state.restart);

  /**
   * refs
   */
  const player = useRef(null);

  /**
   * handle jump and aboid double jump
   */
  const jump = () => {
    if (player?.current) {
      const origin = player.current.translation();
      origin.y -= 0.31;
      const direction = { x: 0, y: -1, z: 0 };
      const ray = new rapier.Ray(origin, direction);

      const hit = world.castRay(ray, 10, true);

      if (hit?.toi < 0.15) player.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  const reset = () => {
    player.current.setTranslation({ x: 0, y: 1, z: 0 });
    player.current.setLinvel({ x: 0, y: 0, z: 0 });
    player.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    const jumpSubscriber = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const subscripeAny = subscribeKeys(() => {
      start();
    });

    const subscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset();
      }
    );

    return () => {
      // un subscribe
      jumpSubscriber();
      subscripeAny();
      subscribeReset();
    };
  }, [player]);

  useFrame((state, delta) => {
    /**
     * controls
     */
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (player?.current) {
      if (forward) {
        impulse.z -= impulseStrength;
        torque.x -= torqueStrength;
      }

      if (rightward) {
        impulse.x += impulseStrength;
        torque.z -= torqueStrength;
      }

      if (backward) {
        impulse.z += impulseStrength;
        torque.x += torqueStrength;
      }

      if (leftward) {
        impulse.x -= impulseStrength;
        torque.z += torqueStrength;
      }
      player.current.applyImpulse(impulse);
      player.current.applyTorqueImpulse(torque);

      /**
       * Camera
       */

      const playerPosition = player.current.translation();
      const cameraPosition = new THREE.Vector3();
      //   position of the camera
      cameraPosition.copy(playerPosition);
      cameraPosition.z += 2.25;
      cameraPosition.y += 0.65;
      //  where the camera look at
      // a little abouve player so that we can futhur ahead
      const cameraTarget = new THREE.Vector3();
      cameraTarget.copy(playerPosition);
      cameraTarget.y += 0.25;

      smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
      smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

      state.camera.position.copy(smoothedCameraPosition);
      state.camera.lookAt(smoothedCameraTarget);

      // controls for interface
      if (playerPosition.z < -(blocksCount * 4 + 2)) end();
      if (playerPosition.y < -4) restart();
    }
  });
  return (
    <>
      <RigidBody
        ref={player}
        colliders="ball"
        position-y={1}
        canSleep={false}
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh castShadow sha>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Player;
