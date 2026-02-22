import { useTexture } from "@react-three/drei";

function SeaPlane() {
  const texture = useTexture("/sea.png");

  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[53, 24]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default SeaPlane;
