import { MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'
import useCarStore from '../../store/useCarStore'

// Showroom floor with real-time reflections and ring markings
export default function ShowroomFloor() {
  const isNightMode = useCarStore((s) => s.isNightMode)

  return (
    <group>
      {/* Main reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <circleGeometry args={[20, 64]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1.2}
          mixStrength={isNightMode ? 2.5 : 1.2}
          roughness={isNightMode ? 0.05 : 0.12}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={isNightMode ? '#050810' : '#0a0a10'}
          metalness={0.9}
          mirror={0.75}
        />
      </mesh>

      {/* Showroom ring 1 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[3.8, 4.0, 64]} />
        <meshBasicMaterial
          color={isNightMode ? '#1a2a5a' : '#1a1a28'}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Showroom ring 2 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[5.8, 6.0, 64]} />
        <meshBasicMaterial
          color={isNightMode ? '#0f1a3a' : '#121220'}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Center accent dot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color={isNightMode ? '#334488' : '#1e1e30'} />
      </mesh>

      {/* Backdrop wall */}
      <mesh position={[0, 8, -14]} receiveShadow>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial
          color={isNightMode ? '#040408' : '#0a0a14'}
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>

      {/* Side walls */}
      <mesh position={[-14, 8, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[28, 20]} />
        <meshStandardMaterial
          color={isNightMode ? '#030306' : '#080810'}
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
      <mesh position={[14, 8, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[28, 20]} />
        <meshStandardMaterial
          color={isNightMode ? '#030306' : '#080810'}
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
    </group>
  )
}
