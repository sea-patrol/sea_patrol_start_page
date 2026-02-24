import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const TOTAL_CYCLE = 80;
const DAY_RATIO = 0.8;

function Flashlight({ position = [0, 0, 0] }) {
  const lightRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const cycle = (time % TOTAL_CYCLE) / TOTAL_CYCLE;

    // Определяем, ночь ли сейчас
    const dayAngle =
      cycle < DAY_RATIO
        ? (cycle / DAY_RATIO) * Math.PI
        : Math.PI + ((cycle - DAY_RATIO) / (1 - DAY_RATIO)) * Math.PI;

    const sunIntensity = Math.max(0, Math.sin(dayAngle));
    const isNight = sunIntensity < 0.3;

    // Плавное включение/выключение фонарей
    if (lightRef.current) {
      const targetIntensity = isNight ? 1 : 0;
      lightRef.current.intensity +=
        (targetIntensity - lightRef.current.intensity) * 0.1;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={position}
      intensity={0}
      distance={5}
      color="#fff5cc"
      castShadow
    />
  );
}

export default Flashlight;
