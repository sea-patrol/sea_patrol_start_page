import { render } from '@testing-library/react'
import App from './App'

test('рендерит Canvas на весь экран', () => {
  render(<App />)
  const canvas = document.querySelector('canvas')
  expect(canvas).toBeInTheDocument()
})
