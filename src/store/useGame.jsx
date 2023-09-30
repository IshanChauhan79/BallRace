import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useGame = create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 20,
      blocksSeed: 0,
      phase: "ready",
      start: () => {
        set((prev) => {
          if (prev.phase === "ready")
            return { phase: "playing", startTime: Date.now() };
          return {};
        });
      },
      restart: () => {
        set((prev) => {
          if (prev.phase !== "ready")
            return { phase: "ready", blocksSeed: Math.random() };
          return {};
        });
      },
      end: () => {
        set((prev) => {
          if (prev.phase === "playing")
            return { phase: "ended", endTime: Date.now() };

          return {};
        });
      },

      /**
       * Time
       */
      startTime: 0,
      endTime: 0,
    };
  })
);

export default useGame;
