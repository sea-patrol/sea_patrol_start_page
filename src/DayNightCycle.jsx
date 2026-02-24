import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TOTAL_CYCLE = 80; // секунд на полный цикл
const DAY_RATIO = 0.8; // день занимает 75% цикла (в 3 раза дольше ночи)

function DayNightCycle() {
  const lightRef = useRef();
  const ambientRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const cycle = (time % TOTAL_CYCLE) / TOTAL_CYCLE; // 0 to 1

    // Асимметричный цикл: день длиннее ночи
    const dayAngle =
      cycle < DAY_RATIO
        ? (cycle / DAY_RATIO) * Math.PI // медленное движение днём (0 to π)
        : Math.PI + ((cycle - DAY_RATIO) / (1 - DAY_RATIO)) * Math.PI; // быстрое движение ночью (π to 2π)

    // Солнце движется по дуге спереди-сбоку, чтобы лучше освещать корабль
    const sunX = Math.cos(dayAngle) * 30;
    const sunY = Math.sin(dayAngle) * 40;
    const sunZ = 20 + Math.sin(dayAngle) * 10;

    // Интенсивность: солнце светит только когда над горизонтом
    const sunIntensity = Math.max(0, Math.sin(dayAngle));

    if (lightRef.current) {
      lightRef.current.position.set(sunX, sunY, sunZ);
      lightRef.current.target.position.set(0, 0, -20);
      lightRef.current.target.updateMatrixWorld();
      lightRef.current.intensity = sunIntensity * 1.5;
      lightRef.current.castShadow = sunIntensity > 0.1;
      lightRef.current.shadow.mapSize.width = 1024;
      lightRef.current.shadow.mapSize.height = 1024;
    }

    // Фоновый свет (ночью слабее, днём сильнее)
    if (ambientRef.current) {
      ambientRef.current.intensity = 0.2 + sunIntensity * 0.5;
    }
  });

  // Цвет неба меняется в зависимости от времени суток
  const skyColor = useRef(new THREE.Color());

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const cycle = (time % TOTAL_CYCLE) / TOTAL_CYCLE;

    const dayAngle =
      cycle < DAY_RATIO
        ? (cycle / DAY_RATIO) * Math.PI
        : Math.PI + ((cycle - DAY_RATIO) / (1 - DAY_RATIO)) * Math.PI;

    const dayFactor = Math.max(0, Math.sin(dayAngle));

    // Интерполяция между ночным и дневным цветом
    const nightColor = new THREE.Color(0x0a0a1a);
    const dayColor = new THREE.Color(0x87ceeb);
    skyColor.current.lerpColors(nightColor, dayColor, dayFactor);

    // Плавное изменение фона сцены
    state.scene.background = skyColor.current.clone();
  });

  return (
    <>
      <directionalLight
        ref={lightRef}
        position={[50, 50, 10]}
        intensity={1.5}
        castShadow
      />
      <ambientLight ref={ambientRef} intensity={0.3} />
    </>
  );
}

export default DayNightCycle;
