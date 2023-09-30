// import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights";
import Level from "./components/Level";
import Player from "./components/Player.js/Player";
import useGame from "./store/useGame";

const App = () => {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      {/* 
         Orbit controls
      */}
      {/* <OrbitControls makeDefault /> */}
      <Physics>
        {/* 
          Common Lights
        */}
        <Lights />

        {/* 
         game levels
        */}

        <Level count={blocksCount} blocksSeed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
};

export default App;
