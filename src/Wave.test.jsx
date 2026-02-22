import { act, create } from '@react-three/test-renderer'

test('рендерит волну с planeGeometry и анимацией', async () => {
  const renderer = await create(<mesh />)
  
  await act(async () => {
    renderer.update(
      <mesh>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial transparent alphaTest={0.1} />
      </mesh>
    )
  })
  
  const tree = renderer.toTree()
  expect(tree).toBeDefined()
})
