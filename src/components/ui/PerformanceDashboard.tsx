import useCarStore from '../../store/useCarStore'

export default function PerformanceDashboard() {
  const stats = useCarStore((s) => s.stats)

  const metrics = [
    { label: 'FPS', value: stats.fps, unit: '', warn: stats.fps < 30 },
    { label: 'Draw', value: stats.drawCalls, unit: '', warn: stats.drawCalls > 200 },
    { label: 'Tri', value: (stats.triangles / 1000).toFixed(1), unit: 'k', warn: false },
    { label: 'Mem', value: stats.memory, unit: 'MB', warn: stats.memory > 512 },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        display: 'flex',
        gap: '8px',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {metrics.map((m) => (
        <div
          key={m.label}
          style={{
            background: 'rgba(6,6,14,0.82)',
            border: `1px solid ${m.warn ? '#ff440044' : '#1a2a3a'}`,
            borderRadius: '6px',
            padding: '6px 10px',
            backdropFilter: 'blur(8px)',
            textAlign: 'center',
            minWidth: '52px',
          }}
        >
          <div
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: m.warn ? '#ff4444' : '#00d4ff',
              lineHeight: 1,
            }}
          >
            {m.value}
            <span style={{ fontSize: '9px', color: '#405060' }}>{m.unit}</span>
          </div>
          <div
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '9px',
              color: '#304050',
              letterSpacing: '0.08em',
              marginTop: '2px',
              textTransform: 'uppercase',
            }}
          >
            {m.label}
          </div>
        </div>
      ))}
    </div>
  )
}
