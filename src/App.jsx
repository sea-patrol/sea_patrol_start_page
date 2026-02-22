import { Canvas } from '@react-three/fiber'
import SeaPlane from './SeaPlane'
import Ship from './Ship'

function App() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', margin: 0 }}>
      <SeaPlane />
      <Ship />
    </Canvas>
  )
}

export default App
