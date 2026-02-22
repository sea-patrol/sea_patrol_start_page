import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Wave({
  texture,
  position = [0, 0, 0],
  amplitude = 0.5,
  frequency = 0.5,
  phase = 0,
}) {
  const meshRef = useRef();
  const map = useTexture(texture);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Синусоидальное покачивание по осям X и Y
    const offsetX = Math.sin(time * frequency + phase) * amplitude;
    const offsetY = Math.cos(time * frequency * 0.5 + phase) * amplitude * 0.25;

    meshRef.current.position.x = position[0] + offsetX;
    meshRef.current.position.y = position[1] + offsetY;
    meshRef.current.position.z = position[2];
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[53, 24]} />
      <meshBasicMaterial map={map} transparent alphaTest={0.1} />
    </mesh>
  );
}

export default Wave;
