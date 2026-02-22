import { useTexture } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DURATION = 60; // секунд на полный цикл
const START_POS = { x: 26, y: -5, z: -10 }; // горизонт, далеко
const END_POS = { x: -13, y: 0, z: 3 }; // близко к камере
const START_SCALE = 0.2;
const END_SCALE = 1.4;

const SPLASH_COUNT = 3;
const PARTICLE_COUNT = 150;
const LIFETIME = 1.0;
const SPEED = 2;
const SPREAD = 1.8;

function Splash({ position, color = "#ffffff" }) {
  const pointsRef = useRef();

  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const lifetimes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      velocities[i * 3] = (Math.random() - 0.5) * SPREAD * SPEED;
      velocities[i * 3 + 1] = Math.random() * SPEED * 0.5 + 1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * SPEED;
      lifetimes[i] = Math.random() * LIFETIME;
    }

    return { positions, velocities, lifetimes };
  }, []);

  const sprite = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let life = lifetimes[i] - delta;
      if (life <= 0) {
        lifetimes[i] = LIFETIME;
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;
        velocities[i * 3] = (Math.random() - 0.5) * SPREAD * SPEED;
        velocities[i * 3 + 1] = Math.random() * SPEED * 0.5 + 1;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * SPEED;
      } else {
        lifetimes[i] = life;
        positions[i * 3] += velocities[i * 3] * delta;
        positions[i * 3 + 1] += velocities[i * 3 + 1] * delta;
        positions[i * 3 + 2] += velocities[i * 3 + 2] * delta;
        velocities[i * 3 + 1] -= 2 * delta;
      }
    }

    pointsRef.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  const material = useMemo(() => {
    const colorObj = new THREE.Color(color);
    return new THREE.PointsMaterial({
      size: 0.3,
      map: sprite,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.NormalBlending,
      color: colorObj,
    });
  }, [sprite, color]);

  return (
    <points
      ref={pointsRef}
      position={position}
      geometry={geometry}
      material={material}
    />
  );
}

function Ship({ onPositionChange }) {
  const meshRef = useRef();
  const splashRefs = useRef([]);
  const texture = useTexture("/ship.png");

  // Позиции брызг относительно корабля
  const splashPositions = useMemo(
    () => [
      { offset: [-2.2, -4, 0.1], color: "#a8d5ff" },
      { offset: [-1.6, -4, 0.1], color: "#a8d5ff" },
    ],
    [],
  );

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
    <group ref={meshRef}>
      <mesh>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial map={texture} transparent alphaTest={0.5} />
      </mesh>
      {splashPositions.map((splash, i) => (
        <Splash key={i} position={splash.offset} color={splash.color} />
      ))}
    </group>
  );
}

export default Ship;
