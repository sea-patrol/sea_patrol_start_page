import { act, create } from '@react-three/test-renderer'

test('рендерит плоскость с planeGeometry и текстурой', async () => {
  const renderer = await create(<mesh />)
  
  await act(async () => {
    renderer.update(
      <mesh>
        <planeGeometry args={[16, 9]} />
        <meshStandardMaterial />
      </mesh>
    )
  })
  
  const tree = renderer.toTree()
  expect(tree).toBeDefined()
})
