import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import SeaPlane from './SeaPlane'
import Ship from './Ship'
import DebugInfo from './DebugInfo'
import { useState } from 'react'

// DEBUG режим: true для включения визуальных помощников
const DEBUG = true

function App() {
  const [shipPosition, setShipPosition] = useState({ x: 0, y: 0, z: 0 })

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas style={{ width: '100%', height: '100%', margin: 0 }}>
        <SeaPlane />
        <Ship onPositionChange={setShipPosition} />
        
        {DEBUG && (
          <>
            {/* Оси координат: X=красный, Y=зелёный, Z=синий */}
            <primitive object={new THREE.AxesHelper(10)} />
            
            {/* Сетка на плоскости XY для понимания масштаба */}
            <primitive object={new THREE.GridHelper(50, 50, '#444', '#222')} position={[0, 0, -10]} />
            
            {/* Управление камерой мышкой */}
            <OrbitControls makeDefault />
          </>
        )}
      </Canvas>
      
      {DEBUG && <DebugInfo shipPosition={shipPosition} />}
    </div>
  )
}

export default App
