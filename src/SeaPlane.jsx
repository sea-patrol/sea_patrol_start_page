import { useTexture } from "@react-three/drei";

function SeaPlane() {
  const texture = useTexture("/sea.png");

  return (
    <mesh position={[0, 0, -10]} receiveShadow>
      <planeGeometry args={[53, 24]} />
      <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

export default SeaPlane;
