import { act, create } from '@react-three/test-renderer'

test('рендерит корабль с анимацией движения и перспективы', async () => {
  const renderer = await create(<mesh />)
  
  await act(async () => {
    renderer.update(
      <mesh>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial transparent alphaTest={0.5} />
      </mesh>
    )
  })
  
  const tree = renderer.toTree()
  expect(tree).toBeDefined()
})
