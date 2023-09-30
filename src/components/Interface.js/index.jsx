import { useEffect, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import useGame from "../../store/useGame";
import { addEffect } from "@react-three/fiber";

const Interface = () => {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const time = useRef();

  const addKeyboardEevnt = (key) => {
    const customEvent = new KeyboardEvent("keydown", { key: key });
    dispatchEvent(customEvent);
  };
  const removeKeyboardEevnt = (key) => {
    const customEvent = new KeyboardEvent("keyup", { key: key });
    dispatchEvent(customEvent);
  };

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) time.current.textContent = elapsedTime;
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      {/* Time */}
      <div ref={time} className="time">
        0.00
      </div>
      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div
            className={`key ${forward ? "active" : ""}`}
            onTouchStart={() => addKeyboardEevnt("KeyW")}
            onTouchEnd={() => removeKeyboardEevnt("KeyW")}
          />
        </div>
        <div className="raw">
          <div
            className={`key ${leftward ? "active" : ""}`}
            onTouchStart={() => addKeyboardEevnt("KeyA")}
            onTouchEnd={() => removeKeyboardEevnt("KeyA")}
          />
          <div
            className={`key ${backward ? "active" : ""}`}
            onTouchStart={() => addKeyboardEevnt("KeyS")}
            onTouchEnd={() => removeKeyboardEevnt("KeyS")}
          />
          <div
            className={`key ${rightward ? "active" : ""}`}
            onTouchStart={() => addKeyboardEevnt("KeyD")}
            onTouchEnd={() => removeKeyboardEevnt("KeyD")}
          />
        </div>
        <div className="raw">
          <div
            className={`key large ${jump ? "active" : ""}`}
            onTouchStart={() => addKeyboardEevnt("Space")}
            onTouchEnd={() => removeKeyboardEevnt("Space")}
          />
        </div>
      </div>
    </div>
  );
};

export default Interface;
