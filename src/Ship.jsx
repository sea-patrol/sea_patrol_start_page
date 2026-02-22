import { useTexture } from '@react-three/drei'

function Ship() {
  const texture = useTexture('/ship.png')

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.5} />
    </mesh>
  )
}

export default Ship
