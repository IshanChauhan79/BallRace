import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Leva } from "leva";
import { Perf } from "r3f-perf";
import App from "./App.jsx";
import "./index.css";
import Interface from "./components/Interface.js/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Leva collapsed />
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        shadows={true}
        gl={{
          antialias: true,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [4, 3, 10],
        }}
      >
        <Perf position="top-left" />
        <App />
      </Canvas>
      <Interface />
    </KeyboardControls>
  </React.StrictMode>
);
