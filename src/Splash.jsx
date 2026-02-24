import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Splash({
  position,
  color = "#ffffff",
  particleCount = 150,
  lifetime = 1,
  speed = 2,
  spread = 0.9,
}) {
  const pointsRef = useRef();

  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const lifetimes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      velocities[i * 3] = (Math.random() - 0.5) * spread * speed;
      velocities[i * 3 + 1] = Math.random() * speed * 0.5 + 1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * spread * speed;
      lifetimes[i] = Math.random() * lifetime;
    }

    return { positions, velocities, lifetimes };
  }, [particleCount, lifetime, speed, spread]);

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

    for (let i = 0; i < particleCount; i++) {
      let life = lifetimes[i] - delta;
      if (life <= 0) {
        lifetimes[i] = lifetime;
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;
        velocities[i * 3] = (Math.random() - 0.5) * spread * speed;
        velocities[i * 3 + 1] = Math.random() * speed * 0.5 + 1;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * spread * speed;
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

export default Splash;
