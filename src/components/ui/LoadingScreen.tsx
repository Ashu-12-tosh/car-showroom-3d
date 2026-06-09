import { useProgress } from '@react-three/drei'
import useCarStore from '../../store/useCarStore'

export default function LoadingScreen() {
  const { progress } = useProgress()
  const isLoaded = useCarStore((s) => s.isLoaded)

  if (isLoaded && progress >= 100) return null

  const pct = Math.max(progress, isLoaded ? 100 : 0)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050508',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: isLoaded ? 0 : 1,
        transition: 'opacity 0.8s ease',
        pointerEvents: isLoaded ? 'none' : 'all',
      }}
    >
      {/* Car silhouette SVG */}
      <svg
        width="220"
        height="80"
        viewBox="0 0 220 80"
        style={{ marginBottom: '32px', opacity: 0.7 }}
      >
        {/* Simple sedan silhouette */}
        <path
          d="M20,55 L30,55 Q35,30 55,25 L90,20 Q110,14 130,20 L165,25 Q185,30 190,55 L200,55 Q205,55 205,60 L15,60 Q15,55 20,55 Z"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Wheels */}
        <circle cx="55" cy="60" r="11" fill="none" stroke="#00d4ff" strokeWidth="1.5" />
        <circle cx="55" cy="60" r="5" fill="none" stroke="#00d4ff" strokeWidth="1" />
        <circle cx="165" cy="60" r="11" fill="none" stroke="#00d4ff" strokeWidth="1.5" />
        <circle cx="165" cy="60" r="5" fill="none" stroke="#00d4ff" strokeWidth="1" />
        {/* Windshield */}
        <path
          d="M90,20 L78,35 L142,35 L130,20 Z"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Headlight */}
        <rect x="185" y="48" width="12" height="5" rx="2" fill="#00d4ff" opacity="0.6" />
        {/* Taillight */}
        <rect x="23" y="48" width="8" height="5" rx="2" fill="#ff2244" opacity="0.6" />
      </svg>

      {/* Brand name */}
      <div
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '22px',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}
      >
        Apex <span style={{ color: '#00d4ff' }}>GT</span>
      </div>

      <div
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '12px',
          color: '#506070',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '40px',
        }}
      >
        3D Configurator
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: '260px',
          height: '2px',
          background: '#0e1828',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #0088aa, #00d4ff)',
            borderRadius: '2px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <div
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '12px',
          color: '#405060',
          letterSpacing: '0.12em',
        }}
      >
        {Math.round(pct)}%
      </div>
    </div>
  )
}
