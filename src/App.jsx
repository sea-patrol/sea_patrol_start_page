import { Canvas } from '@react-three/fiber'
import RotatingCube from './RotatingCube'

function App() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', margin: 0 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingCube />
    </Canvas>
  )
}

export default App
