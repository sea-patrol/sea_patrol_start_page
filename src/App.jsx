import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import SeaPlane from "./SeaPlane";
import Ship from "./Ship";
import Wave from "./Wave";
import DayNightCycle from "./DayNightCycle";
import InfoPanel from "./InfoPanel";
import DebugOverlay from "./DebugOverlay";
import { useState } from "react";
import wave1 from "./assets/wave1.png";
import wave2 from "./assets/wave2.png";
import wave3 from "./assets/wave3.png";
import wave4 from "./assets/wave4.png";

// DEBUG режим: true для включения визуальных помощников
const DEBUG = false;

function App() {
  const [shipPosition, setShipPosition] = useState({ x: 0, y: 0, z: 0 });

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <InfoPanel />

      <Canvas style={{ width: "100%", height: "100%", margin: 0 }}>
        <DayNightCycle />
        <SeaPlane />
        <Wave
          texture={wave1}
          position={[0, 0, -9.6]}
          amplitude={1.3}
          frequency={0.8}
          phase={0}
          opacity={1}
        />
        <Wave
          texture={wave2}
          position={[0, 0, -9.7]}
          amplitude={1}
          frequency={0.7}
          phase={Math.PI}
        />
        <Wave
          texture={wave3}
          position={[0, 0, -9.8]}
          amplitude={0.7}
          frequency={0.5}
          phase={Math.PI}
        />
        <Wave
          texture={wave4}
          position={[0, 0, -9.9]}
          amplitude={0.5}
          frequency={0.4}
          phase={Math.PI}
        />
        <Ship onPositionChange={setShipPosition} />

        {DEBUG && (
          <>
            {/* Оси координат: X=красный, Y=зелёный, Z=синий */}
            <primitive object={new THREE.AxesHelper(10)} />

            {/* Сетка на плоскости XY для понимания масштаба */}
            <primitive
              object={new THREE.GridHelper(50, 50, "#444", "#222")}
              position={[0, 0, -10]}
            />

            {/* Управление камерой мышкой */}
            <OrbitControls makeDefault />
            <DebugOverlay shipPosition={shipPosition} />
          </>
        )}
      </Canvas>
    </div>
  );
}

export default App;
