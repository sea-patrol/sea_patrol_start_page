import { Canvas } from '@react-three/fiber'
import SeaPlane from './SeaPlane'

function App() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', margin: 0 }}>
      <SeaPlane />
    </Canvas>
  )
}

export default App
