"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { initFishCanvas } from "@/lib/fishCanvas";

const FishPlayContext = createContext({
  playing: false,
  setPlaying: (p) => { },
});

export function useFishPlay() {
  return useContext(FishPlayContext);
}

export default function FishBase({ children }) {
  const canvasRef = useRef(null);
  const started = useRef(false);
  const fishApi = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || started.current) return;
    started.current = true;

    const api = initFishCanvas(canvasRef.current);
    fishApi.current = api;

    return api.cleanup;
  }, []);

  // Attach/detach click handler based on play mode
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !fishApi.current) return;

    if (playing) {
      canvas.addEventListener("click", fishApi.current.handleClick);
      canvas.style.zIndex = "1";
      canvas.style.cursor = "pointer";
    } else {
      canvas.removeEventListener("click", fishApi.current.handleClick);
      canvas.style.zIndex = "-1";
      canvas.style.cursor = "default";
    }

    return () => {
      if (fishApi.current) {
        canvas.removeEventListener("click", fishApi.current.handleClick);
      }
    };
  }, [playing]);

  return (
    <FishPlayContext.Provider value={{ playing, setPlaying }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}
      />

      {/* Exit button when playing */}
      {playing && (
        <div
          className="toggle"
          id="exit-fish-play"
          onClick={() => setPlaying(false)}
          style={{ display: "block", top: "1rem" }}
        >
          x
        </div>
      )}

      {/* Hide body content when playing */}
      <div style={{ display: playing ? "none" : "contents" }}>
        {children}
      </div>
    </FishPlayContext.Provider>
  );
}
