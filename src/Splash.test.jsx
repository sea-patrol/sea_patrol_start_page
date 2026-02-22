import { act, create } from '@react-three/test-renderer'

test('рендерит брызги с системой частиц', async () => {
  const renderer = await create(<points />)
  
  await act(async () => {
    renderer.update(
      <points>
        <bufferGeometry />
        <pointsMaterial size={0.3} transparent opacity={0.8} />
      </points>
    )
  })
  
  const tree = renderer.toTree()
  expect(tree).toBeDefined()
})
