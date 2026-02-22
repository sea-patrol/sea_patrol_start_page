import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 50;
const LIFETIME = 1.0; // секунды
const SPEED = 3;
const SPREAD = 0.8;

function Splash({ position = [0, 0, 0], color = "#ffffff" }) {
  const pointsRef = useRef();

  // Создаем геометрию частиц
  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const lifetimes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Начальная позиция (все частицы начинаются в одной точке)
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // Случайная скорость (вверх и в стороны)
      velocities[i * 3] = (Math.random() - 0.5) * SPREAD * SPEED;
      velocities[i * 3 + 1] = Math.random() * SPEED * 0.5 + 1; // вверх
      velocities[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * SPEED;

      // Случайное время жизни
      lifetimes[i] = Math.random() * LIFETIME;
    }

    return { positions, velocities, lifetimes };
  }, []);

  // Создаем текстуру для частиц (круглый спрайт)
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

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;

    // Обновляем позиции частиц
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Перезапуск частицы если она "умерла"
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

        // Движение частицы
        positions[i * 3] += velocities[i * 3] * delta;
        positions[i * 3 + 1] += velocities[i * 3 + 1] * delta;
        positions[i * 3 + 2] += velocities[i * 3 + 2] * delta;

        // Гравитация
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

export default Splash;
