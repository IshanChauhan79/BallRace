import { useMemo } from "react";
import AxeBlock from "./AxeBlock";
import DoorBlock from "./DoorBlock";
import EndBlock from "./EndBlock";
import LimboBlock from "./LimboBlock";
import Spinner from "./Spinner";
import StartBlock from "./StartBlock";
import Boundry from "../Boundary";

const Level = ({
  count = 5,
  types = [AxeBlock, DoorBlock, LimboBlock, Spinner],
  seed = 0,
}) => {
  const blocks = useMemo(() => {
    const allBlocks = [];
    for (let i = 0; i < count; i++) {
      let randomIndex = Math.floor(Math.random() * types.length);
      allBlocks.push(types[randomIndex]);
    }
    return allBlocks;
  }, [count, types, seed]);

  return (
    <>
      <StartBlock position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <EndBlock position={[0, 0, -(count + 1) * 4]} />
      <Boundry length={count + 2} />
      {/* <axesHelper args={[5]} /> */}
    </>
  );
};

export default Level;
