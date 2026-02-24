import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import SeaPlane from "./SeaPlane";
import Ship from "./Ship";
import Wave from "./Wave";
import DayNightCycle from "./DayNightCycle";
import InfoPanel from "./InfoPanel";
import { useState } from "react";

// DEBUG режим: true для включения визуальных помощников
const DEBUG = false;

// Внутренний компонент для DebugInfo (должен быть внутри Canvas)
function DebugOverlay({ shipPosition }) {
  const { camera } = useThree();

  if (!shipPosition || !DEBUG) return null;

  return (
    <Html
      style={{
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "rgba(0, 0, 0, 0.8)",
          color: "#0f0",
          padding: "15px",
          fontFamily: "monospace",
          fontSize: "14px",
          borderRadius: "8px",
          zIndex: 1000,
          minWidth: "200px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
            borderBottom: "1px solid #0f0",
            paddingBottom: "5px",
          }}
        >
          DEBUG PANEL
        </div>
        <div
          style={{
            marginTop: "10px",
            fontWeight: "bold",
            borderBottom: "1px solid #0f0",
            paddingBottom: "5px",
          }}
        >
          CAMERA
        </div>
        <div>X: {camera.position.x.toFixed(3)}</div>
        <div>Y: {camera.position.y.toFixed(3)}</div>
        <div>Z: {camera.position.z.toFixed(3)}</div>
        <div
          style={{
            marginTop: "10px",
            fontWeight: "bold",
            borderBottom: "1px solid #0f0",
            paddingBottom: "5px",
          }}
        >
          SHIP
        </div>
        <div>X: {shipPosition.x.toFixed(3)}</div>
        <div>Y: {shipPosition.y.toFixed(3)}</div>
        <div>Z: {shipPosition.z.toFixed(3)}</div>
      </div>
    </Html>
  );
}

function App() {
  const [shipPosition, setShipPosition] = useState({ x: 0, y: 0, z: 0 });

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <InfoPanel />

      <Canvas style={{ width: "100%", height: "100%", margin: 0 }}>
        <DayNightCycle />
        <SeaPlane />
        <Wave
          texture="/wave1.png"
          position={[0, 0, -9.6]}
          amplitude={1.3}
          frequency={0.8}
          phase={0}
          opacity={1}
        />
        <Wave
          texture="/wave2.png"
          position={[0, 0, -9.7]}
          amplitude={1}
          frequency={0.7}
          phase={Math.PI}
        />
        <Wave
          texture="/wave3.png"
          position={[0, 0, -9.8]}
          amplitude={0.7}
          frequency={0.5}
          phase={Math.PI}
        />
        <Wave
          texture="/wave4.png"
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
