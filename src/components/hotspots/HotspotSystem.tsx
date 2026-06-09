import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import useCarStore from '../../store/useCarStore'
import { HOTSPOTS } from '../../utils/constants'

interface HotspotMarkerProps {
  id: string
  position: [number, number, number]
  title: string
  description: string
}

function HotspotMarker({ id, position, title, description }: HotspotMarkerProps) {
  const { activeHotspot, setActiveHotspot } = useCarStore()
  const ringRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const isActive = activeHotspot === id

  // Pulse ring animation
  useFrame((_, delta) => {
    if (!ringRef.current) return
    const scale = 1 + Math.sin(Date.now() * 0.004) * 0.18
    ringRef.current.scale.setScalar(scale)
    ringRef.current.rotation.z += delta * 0.5
  })

  return (
    <group position={position}>
      {/* Core dot */}
      <mesh
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation()
          setActiveHotspot(isActive ? null : id)
        }}
      >
        <sphereGeometry args={[0.055, 14, 14]} />
        <meshStandardMaterial
          color={isActive ? '#ff6600' : hovered ? '#00d4ff' : '#00aadd'}
          emissive={isActive ? '#ff3300' : hovered ? '#006688' : '#003344'}
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* Pulsing ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.1, 0.01, 8, 24]} />
        <meshBasicMaterial
          color={isActive ? '#ff6600' : '#00d4ff'}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Tooltip via drei Html */}
      {(isActive || hovered) && (
        <Html
          position={[0.2, 0.2, 0]}
          style={{ pointerEvents: 'none' }}
          distanceFactor={4}
          occlude={false}
        >
          <div
            style={{
              background: 'rgba(8,8,20,0.92)',
              border: '1px solid #00d4ff44',
              borderRadius: '8px',
              padding: '10px 14px',
              minWidth: '200px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 24px rgba(0,212,255,0.15)',
            }}
          >
            <div
              style={{
                color: '#00d4ff',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                marginBottom: '5px',
                textTransform: 'uppercase',
              }}
            >
              {title}
            </div>
            <div
              style={{
                color: '#a0b0c0',
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '12px',
                lineHeight: '1.45',
              }}
            >
              {description}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Renders all hotspot markers in 3D space
export default function HotspotSystem() {
  return (
    <>
      {HOTSPOTS.map((h) => (
        <HotspotMarker
          key={h.id}
          id={h.id}
          position={h.position}
          title={h.title}
          description={h.description}
        />
      ))}
    </>
  )
}
