import { act } from '@react-three/test-renderer'
import { create } from '@react-three/test-renderer'

test('рендерит куб с boxGeometry и meshStandardMaterial', async () => {
  const renderer = await create(<mesh />)
  
  await act(async () => {
    renderer.update(
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    )
  })
  
  const tree = renderer.toTree()
  expect(tree).toBeDefined()
})
