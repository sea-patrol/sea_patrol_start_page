function DebugInfo({ shipPosition }) {
  if (!shipPosition) return null

  return (
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#0f0',
      padding: '15px',
      fontFamily: 'monospace',
      fontSize: '14px',
      borderRadius: '8px',
      zIndex: 1000,
      minWidth: '200px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #0f0', paddingBottom: '5px' }}>
        DEBUG PANEL
      </div>
      <div>X: {shipPosition.x.toFixed(3)}</div>
      <div>Y: {shipPosition.y.toFixed(3)}</div>
      <div>Z: {shipPosition.z.toFixed(3)}</div>
    </div>
  )
}

export default DebugInfo
