import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const DURATION = 60; // секунд на полный цикл
const START_POS = { x: 26, y: -5, z: -10 }; // горизонт, далеко
const END_POS = { x: -13, y: 0, z: 3 }; // близко к камере
const START_SCALE = 0.3;
const END_SCALE = 1.2;

function Ship({ onPositionChange }) {
  const meshRef = useRef();
  const texture = useTexture("/ship.png");

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Получаем текущий прогресс анимации (0 to 1)
    let progress = (state.clock.elapsedTime % DURATION) / DURATION;

    // Плавное движение по диагонали
    const currentX = START_POS.x + (END_POS.x - START_POS.x) * progress;
    const currentY = START_POS.y + (END_POS.y - START_POS.y) * progress;
    const currentZ = START_POS.z + (END_POS.z - START_POS.z) * progress;

    // Изменение масштаба для эффекта перспективы
    const currentScale = START_SCALE + (END_SCALE - START_SCALE) * progress;

    // Покачивание на волнах
    const waveBobbing = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    const tilt = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;

    meshRef.current.position.set(currentX, currentY + waveBobbing, currentZ);
    meshRef.current.scale.set(currentScale, currentScale, currentScale);
    meshRef.current.rotation.z = tilt;

    // Отправляем координаты в родительский компонент для дебага
    if (onPositionChange) {
      onPositionChange({ x: currentX, y: currentY + waveBobbing, z: currentZ });
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.5} />
    </mesh>
  );
}

export default Ship;
