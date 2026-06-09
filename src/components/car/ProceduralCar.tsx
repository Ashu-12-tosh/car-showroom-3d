import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import useCarStore from '../../store/useCarStore'

// ─── Sub-component: Wheel ────────────────────────────────────────────────────
interface WheelProps {
  position: [number, number, number]
  flip?: boolean
}

function Wheel({ position, flip = false }: WheelProps) {
  const { selectedWheels } = useCarStore()
  const groupRef = useRef<THREE.Group>(null)

  // Slow idle spin
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.x += delta * 2.0
  })

  const spokes = useMemo(() => {
    const arr: JSX.Element[] = []
    const count = selectedWheels.spokeCount
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const isTurbine = selectedWheels.rimStyle === 'turbine'
      const spokeW = isTurbine ? 0.08 : 0.04
      const spokeH = 0.27
      arr.push(
        <mesh
          key={i}
          position={[Math.sin(angle) * 0.175, Math.cos(angle) * 0.175, 0]}
          rotation={[0, 0, angle]}
        >
          <boxGeometry args={[spokeW, spokeH, 0.06]} />
          <meshStandardMaterial
            color={selectedWheels.spokeColor}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>,
      )
    }
    return arr
  }, [selectedWheels])

  const flipVal = flip ? -1 : 1

  return (
    <group position={position} rotation={[0, flip ? Math.PI : 0, 0]}>
      <group ref={groupRef}>
        {/* Tire */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.1, 20, 36]} />
          <meshStandardMaterial color="#111111" roughness={0.9} metalness={0.0} />
        </mesh>

        {/* Rim face */}
        <mesh>
          <cylinderGeometry args={[0.285, 0.285, 0.18, 32]} />
          <meshStandardMaterial
            color={selectedWheels.color}
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>

        {/* Spokes */}
        {spokes}

        {/* Center cap */}
        <mesh>
          <cylinderGeometry args={[0.07, 0.07, 0.22, 16]} />
          <meshStandardMaterial color={selectedWheels.spokeColor} metalness={1.0} roughness={0.05} />
        </mesh>

        {/* Brake caliper */}
        <mesh position={[0, 0.22 * flipVal, 0.06]}>
          <boxGeometry args={[0.12, 0.08, 0.12]} />
          <meshStandardMaterial color="#C0282A" metalness={0.3} roughness={0.5} />
        </mesh>

        {/* Brake disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.02, 32]} />
          <meshStandardMaterial color="#888" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}

// ─── Sub-component: Interior ─────────────────────────────────────────────────
function Interior() {
  const { selectedInterior } = useCarStore()
  const c = selectedInterior.seatColor
  const d = selectedInterior.dashColor

  return (
    <group position={[0, 0, 0]}>
      {/* Dashboard */}
      <mesh position={[0, 1.2, 1.15]}>
        <boxGeometry args={[1.6, 0.12, 0.38]} />
        <meshStandardMaterial color={d} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Instrument binnacle */}
      <mesh position={[0.32, 1.28, 1.02]}>
        <boxGeometry args={[0.48, 0.1, 0.12]} />
        <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Infotainment screen */}
      <mesh position={[0, 1.27, 1.04]}>
        <boxGeometry args={[0.5, 0.18, 0.02]} />
        <meshStandardMaterial color="#0a1a2a" emissive="#0a1a2a" emissiveIntensity={0.6} roughness={0.1} />
      </mesh>

      {/* Steering wheel rim */}
      <mesh position={[0.38, 1.22, 0.8]} rotation={[0.35, 0, 0]}>
        <torusGeometry args={[0.155, 0.025, 10, 32]} />
        <meshStandardMaterial color={d} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Steering column */}
      <mesh position={[0.38, 1.15, 0.88]} rotation={[0.35, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.22, 12]} />
        <meshStandardMaterial color="#222" roughness={0.4} />
      </mesh>

      {/* Driver seat */}
      <mesh position={[0.38, 0.82, -0.05]}>
        <boxGeometry args={[0.52, 0.08, 0.54]} />
        <meshStandardMaterial color={c} roughness={0.7} />
      </mesh>
      <mesh position={[0.38, 1.02, -0.28]}>
        <boxGeometry args={[0.52, 0.38, 0.07]} />
        <meshStandardMaterial color={c} roughness={0.7} />
      </mesh>

      {/* Passenger seat */}
      <mesh position={[-0.38, 0.82, -0.05]}>
        <boxGeometry args={[0.52, 0.08, 0.54]} />
        <meshStandardMaterial color={c} roughness={0.7} />
      </mesh>
      <mesh position={[-0.38, 1.02, -0.28]}>
        <boxGeometry args={[0.52, 0.38, 0.07]} />
        <meshStandardMaterial color={c} roughness={0.7} />
      </mesh>

      {/* Centre console */}
      <mesh position={[0, 0.88, 0.15]}>
        <boxGeometry args={[0.22, 0.16, 0.52]} />
        <meshStandardMaterial color={d} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Gear selector */}
      <mesh position={[0, 0.99, 0.08]}>
        <cylinderGeometry args={[0.025, 0.025, 0.11, 8]} />
        <meshStandardMaterial color="#888" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.04, 0.08]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color="#333" roughness={0.4} />
      </mesh>

      {/* Headliner */}
      <mesh position={[0, 1.54, -0.35]}>
        <boxGeometry args={[1.55, 0.025, 1.1]} />
        <meshStandardMaterial color={d} roughness={0.9} />
      </mesh>

      {/* Floor mat */}
      <mesh position={[0, 0.57, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 1.1]} />
        <meshStandardMaterial color={d} roughness={0.95} />
      </mesh>
    </group>
  )
}

// ─── Sub-component: EngineBay ─────────────────────────────────────────────────
function EngineBay() {
  return (
    <group position={[0, 0.72, 1.45]}>
      {/* Engine block */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.38, 0.72]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Valve cover */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.82, 0.08, 0.62]} />
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Intake plenum */}
      <mesh position={[0, 0.32, -0.1]}>
        <boxGeometry args={[0.6, 0.12, 0.3]} />
        <meshStandardMaterial color="#222" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Air intakes */}
      {[-0.2, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 0.34, -0.26]}>
          <cylinderGeometry args={[0.07, 0.07, 0.22, 12]} />
          <meshStandardMaterial color="#333" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}

      {/* Intercoolers */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0.02, 0.08]}>
          <boxGeometry args={[0.12, 0.28, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}

      {/* Coolant reservoir */}
      <mesh position={[-0.42, 0.08, -0.26]}>
        <boxGeometry args={[0.1, 0.2, 0.14]} />
        <meshStandardMaterial color="#0a1a10" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Bay floor */}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[1.6, 0.04, 1.1]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
    </group>
  )
}

// ─── Main: ProceduralCar ──────────────────────────────────────────────────────
export default function ProceduralCar() {
  const { selectedPaint, doors, hoodOpen, trunkOpen, isLoaded, setLoaded } = useCarStore()

  // Animated part refs
  const carGroupRef = useRef<THREE.Group>(null)
  const hoodRef = useRef<THREE.Group>(null)
  const trunkRef = useRef<THREE.Group>(null)
  const doorFLRef = useRef<THREE.Group>(null)
  const doorFRRef = useRef<THREE.Group>(null)
  const doorRLRef = useRef<THREE.Group>(null)
  const doorRRRef = useRef<THREE.Group>(null)

  // Mark loaded
  useEffect(() => {
    if (!isLoaded) {
      const t = setTimeout(() => setLoaded(true), 1200)
      return () => clearTimeout(t)
    }
  }, [isLoaded, setLoaded])

  // Entrance spin
  useEffect(() => {
    if (!carGroupRef.current) return
    carGroupRef.current.rotation.y = -Math.PI * 0.5
    gsap.to(carGroupRef.current.rotation, {
      y: 0,
      duration: 1.8,
      ease: 'power3.out',
      delay: 0.2,
    })
  }, [])

  // Hood
  useEffect(() => {
    if (!hoodRef.current) return
    gsap.to(hoodRef.current.rotation, {
      x: hoodOpen ? -Math.PI * 0.54 : 0,
      duration: 1.0,
      ease: 'power2.inOut',
    })
  }, [hoodOpen])

  // Trunk
  useEffect(() => {
    if (!trunkRef.current) return
    gsap.to(trunkRef.current.rotation, {
      x: trunkOpen ? Math.PI * 0.55 : 0,
      duration: 1.0,
      ease: 'power2.inOut',
    })
  }, [trunkOpen])

  // Doors
  useEffect(() => {
    if (!doorFLRef.current) return
    gsap.to(doorFLRef.current.rotation, {
      y: doors.FL ? Math.PI * 0.38 : 0,
      duration: 0.9,
      ease: 'power2.inOut',
    })
  }, [doors.FL])
  useEffect(() => {
    if (!doorFRRef.current) return
    gsap.to(doorFRRef.current.rotation, {
      y: doors.FR ? -Math.PI * 0.38 : 0,
      duration: 0.9,
      ease: 'power2.inOut',
    })
  }, [doors.FR])
  useEffect(() => {
    if (!doorRLRef.current) return
    gsap.to(doorRLRef.current.rotation, {
      y: doors.RL ? Math.PI * 0.38 : 0,
      duration: 0.9,
      ease: 'power2.inOut',
    })
  }, [doors.RL])
  useEffect(() => {
    if (!doorRRRef.current) return
    gsap.to(doorRRRef.current.rotation, {
      y: doors.RR ? -Math.PI * 0.38 : 0,
      duration: 0.9,
      ease: 'power2.inOut',
    })
  }, [doors.RR])

  // Paint material values
  const paint = selectedPaint

  return (
    <group ref={carGroupRef} position={[0, 0, 0]}>

      {/* ── LOWER BODY ───────────────────────────────────────────────── */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.88, 0.34, 4.5]} />
        <meshPhysicalMaterial
          color={paint.color}
          metalness={paint.metalness}
          roughness={paint.roughness}
          clearcoat={paint.clearcoat}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Front bumper lower skirt */}
      <mesh position={[0, 0.42, 2.28]} castShadow>
        <boxGeometry args={[1.78, 0.28, 0.18]} />
        <meshStandardMaterial color="#111" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Rear bumper lower skirt */}
      <mesh position={[0, 0.42, -2.28]} castShadow>
        <boxGeometry args={[1.78, 0.28, 0.18]} />
        <meshStandardMaterial color="#111" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Rocker panels */}
      {[-0.96, 0.96].map((x, i) => (
        <mesh key={i} position={[x, 0.55, 0]} castShadow>
          <boxGeometry args={[0.04, 0.1, 3.6]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.7} />
        </mesh>
      ))}

      {/* ── CABIN / UPPER BODY ───────────────────────────────────────── */}
      {/* Shoulder line */}
      <mesh position={[0, 1.08, -0.1]} castShadow>
        <boxGeometry args={[1.88, 0.06, 4.1]} />
        <meshPhysicalMaterial
          color={paint.color}
          metalness={paint.metalness}
          roughness={paint.roughness}
          clearcoat={paint.clearcoat}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Cabin box */}
      <mesh position={[0, 1.32, -0.22]} castShadow>
        <boxGeometry args={[1.76, 0.42, 2.5]} />
        <meshPhysicalMaterial
          color={paint.color}
          metalness={paint.metalness}
          roughness={paint.roughness}
          clearcoat={paint.clearcoat}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.57, -0.35]} castShadow>
        <boxGeometry args={[1.72, 0.08, 2.0]} />
        <meshPhysicalMaterial
          color={paint.color}
          metalness={paint.metalness}
          roughness={paint.roughness}
          clearcoat={paint.clearcoat}
          clearcoatRoughness={0.06}
        />
      </mesh>

      {/* A-pillars */}
      {[-0.82, 0.82].map((x, i) => (
        <mesh key={i} position={[x, 1.35, 0.92]} rotation={[0.28, 0, 0]} castShadow>
          <boxGeometry args={[0.055, 0.52, 0.055]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
      ))}

      {/* C-pillars */}
      {[-0.82, 0.82].map((x, i) => (
        <mesh key={i} position={[x, 1.35, -1.38]} rotation={[-0.22, 0, 0]} castShadow>
          <boxGeometry args={[0.055, 0.52, 0.055]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
      ))}

      {/* ── GLASS ────────────────────────────────────────────────────── */}
      {/* Windshield */}
      <mesh position={[0, 1.3, 1.02]} rotation={[-0.42, 0, 0]}>
        <planeGeometry args={[1.58, 0.55]} />
        <meshPhysicalMaterial
          color="#88aacc"
          transparent
          opacity={0.28}
          transmission={0.85}
          roughness={0.04}
          metalness={0.0}
          envMapIntensity={1.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Rear windshield */}
      <mesh position={[0, 1.3, -1.52]} rotation={[0.42, 0, 0]}>
        <planeGeometry args={[1.58, 0.5]} />
        <meshPhysicalMaterial
          color="#88aacc"
          transparent
          opacity={0.28}
          transmission={0.85}
          roughness={0.04}
          metalness={0.0}
          envMapIntensity={1.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Front side windows */}
      {[-0.89, 0.89].map((x, i) => (
        <mesh key={i} position={[x, 1.3, 0.42]}>
          <planeGeometry args={[0.52, 0.36]} />
          <meshPhysicalMaterial
            color="#88aacc"
            transparent
            opacity={0.25}
            transmission={0.85}
            roughness={0.04}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Rear side windows */}
      {[-0.89, 0.89].map((x, i) => (
        <mesh key={i} position={[x, 1.3, -0.62]}>
          <planeGeometry args={[0.52, 0.36]} />
          <meshPhysicalMaterial
            color="#88aacc"
            transparent
            opacity={0.25}
            transmission={0.85}
            roughness={0.04}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* ── HOOD (animated) ──────────────────────────────────────────── */}
      {/* Hinge point at rear of hood, Z=+0.78 */}
      <group ref={hoodRef} position={[0, 1.12, 0.78]}>
        <mesh position={[0, 0.04, -0.72]} castShadow>
          <boxGeometry args={[1.82, 0.06, 1.44]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
        {/* Hood vent slots */}
        {[-0.3, 0.3].map((x, i) => (
          <mesh key={i} position={[x, 0.07, -0.5]}>
            <boxGeometry args={[0.12, 0.02, 0.6]} />
            <meshStandardMaterial color="#080808" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* ── TRUNK (animated) ─────────────────────────────────────────── */}
      {/* Hinge at rear, Z=-1.0 */}
      <group ref={trunkRef} position={[0, 1.1, -1.0]}>
        <mesh position={[0, 0.05, -0.62]} castShadow>
          <boxGeometry args={[1.72, 0.06, 1.24]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
        {/* Rear spoiler */}
        <mesh position={[0, 0.08, -1.2]}>
          <boxGeometry args={[1.5, 0.04, 0.1]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
      </group>

      {/* ── FRONT BUMPER / GRILLE ─────────────────────────────────────── */}
      <mesh position={[0, 0.78, 2.32]} castShadow>
        <boxGeometry args={[1.84, 0.22, 0.14]} />
        <meshStandardMaterial color="#111" roughness={0.55} metalness={0.15} />
      </mesh>

      {/* Grille mesh */}
      <mesh position={[0, 0.84, 2.36]}>
        <boxGeometry args={[0.9, 0.18, 0.06]} />
        <meshStandardMaterial color="#060606" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Grille frame */}
      <mesh position={[0, 0.84, 2.37]}>
        <boxGeometry args={[0.94, 0.22, 0.03]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.15} />
      </mesh>

      {/* Headlights */}
      {[-0.7, 0.7].map((x, i) => (
        <group key={i} position={[x, 0.9, 2.3]}>
          {/* Housing */}
          <mesh>
            <boxGeometry args={[0.32, 0.12, 0.08]} />
            <meshStandardMaterial color="#111" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Lens */}
          <mesh position={[0, 0, 0.055]}>
            <boxGeometry args={[0.28, 0.09, 0.02]} />
            <meshPhysicalMaterial
              color="#ddeeff"
              transparent
              opacity={0.9}
              transmission={0.3}
              roughness={0.05}
              emissive="#aaccff"
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* DRL strip */}
          <mesh position={[0, -0.08, 0.06]}>
            <boxGeometry args={[0.3, 0.018, 0.01]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={2.0}
            />
          </mesh>
        </group>
      ))}

      {/* Fog lights */}
      {[-0.62, 0.62].map((x, i) => (
        <mesh key={i} position={[x, 0.55, 2.3]}>
          <cylinderGeometry args={[0.055, 0.055, 0.06, 12]} />
          <meshPhysicalMaterial
            color="#ffffee"
            transparent
            opacity={0.9}
            emissive="#ffffaa"
            emissiveIntensity={0.4}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* ── TAILLIGHTS ────────────────────────────────────────────────── */}
      {[-0.7, 0.7].map((x, i) => (
        <group key={i} position={[x, 0.9, -2.3]}>
          <mesh>
            <boxGeometry args={[0.32, 0.12, 0.08]} />
            <meshStandardMaterial color="#1a0000" roughness={0.4} metalness={0.2} />
          </mesh>
          {/* LED strip */}
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[0.28, 0.018, 0.01]} />
            <meshStandardMaterial
              color="#ff2200"
              emissive="#ff2200"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>
      ))}

      {/* Rear licence plate */}
      <mesh position={[0, 0.72, -2.37]}>
        <boxGeometry args={[0.44, 0.12, 0.02]} />
        <meshStandardMaterial color="#eeeee0" roughness={0.7} />
      </mesh>

      {/* ── EXHAUST ────────────────────────────────────────────────────── */}
      {[-0.45, 0.45].map((x, i) => (
        <mesh key={i} position={[x, 0.46, -2.32]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.055, 0.14, 12]} />
          <meshStandardMaterial color="#555" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* ── SIDE MIRRORS ──────────────────────────────────────────────── */}
      {[-1.0, 1.0].map((x, i) => (
        <group key={i} position={[x, 1.16, 1.08]}>
          <mesh rotation={[0, 0, 0]}>
            <boxGeometry args={[0.06, 0.1, 0.18]} />
            <meshPhysicalMaterial
              color={paint.color}
              metalness={paint.metalness}
              roughness={paint.roughness}
              clearcoat={paint.clearcoat}
            />
          </mesh>
          <mesh position={[0, 0, -0.1]}>
            <boxGeometry args={[0.04, 0.08, 0.02]} />
            <meshStandardMaterial color="#333" roughness={0.3} metalness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ── DOOR FL (hinge at Z=+0.65) ──────────────────────────────── */}
      <group ref={doorFLRef} position={[-0.94, 0.83, 0.65]}>
        {/* Lower panel */}
        <mesh position={[-0.005, -0.14, -0.42]} castShadow>
          <boxGeometry args={[0.055, 0.48, 0.84]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
        {/* Window frame */}
        <mesh position={[-0.005, 0.24, -0.42]}>
          <boxGeometry args={[0.045, 0.36, 0.84]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
        {/* Window glass */}
        <mesh position={[-0.025, 0.24, -0.42]}>
          <planeGeometry args={[0.76, 0.32]} />
          <meshPhysicalMaterial
            color="#88aacc"
            transparent
            opacity={0.25}
            transmission={0.85}
            roughness={0.04}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Door handle */}
        <mesh position={[-0.07, -0.05, -0.2]}>
          <boxGeometry args={[0.04, 0.028, 0.14]} />
          <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* ── DOOR FR (hinge at Z=+0.65) ──────────────────────────────── */}
      <group ref={doorFRRef} position={[0.94, 0.83, 0.65]}>
        <mesh position={[0.005, -0.14, -0.42]} castShadow>
          <boxGeometry args={[0.055, 0.48, 0.84]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
        <mesh position={[0.005, 0.24, -0.42]}>
          <boxGeometry args={[0.045, 0.36, 0.84]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
        <mesh position={[0.025, 0.24, -0.42]}>
          <planeGeometry args={[0.76, 0.32]} />
          <meshPhysicalMaterial
            color="#88aacc"
            transparent
            opacity={0.25}
            transmission={0.85}
            roughness={0.04}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0.07, -0.05, -0.2]}>
          <boxGeometry args={[0.04, 0.028, 0.14]} />
          <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* ── DOOR RL (hinge at Z=-0.22) ──────────────────────────────── */}
      <group ref={doorRLRef} position={[-0.94, 0.83, -0.22]}>
        <mesh position={[-0.005, -0.14, -0.42]} castShadow>
          <boxGeometry args={[0.055, 0.48, 0.84]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
        <mesh position={[-0.005, 0.24, -0.42]}>
          <boxGeometry args={[0.045, 0.36, 0.84]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
        <mesh position={[-0.025, 0.24, -0.42]}>
          <planeGeometry args={[0.76, 0.32]} />
          <meshPhysicalMaterial
            color="#88aacc"
            transparent
            opacity={0.25}
            transmission={0.85}
            roughness={0.04}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[-0.07, -0.05, -0.6]}>
          <boxGeometry args={[0.04, 0.028, 0.14]} />
          <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* ── DOOR RR (hinge at Z=-0.22) ──────────────────────────────── */}
      <group ref={doorRRRef} position={[0.94, 0.83, -0.22]}>
        <mesh position={[0.005, -0.14, -0.42]} castShadow>
          <boxGeometry args={[0.055, 0.48, 0.84]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
        <mesh position={[0.005, 0.24, -0.42]}>
          <boxGeometry args={[0.045, 0.36, 0.84]} />
          <meshPhysicalMaterial
            color={paint.color}
            metalness={paint.metalness}
            roughness={paint.roughness}
            clearcoat={paint.clearcoat}
          />
        </mesh>
        <mesh position={[0.025, 0.24, -0.42]}>
          <planeGeometry args={[0.76, 0.32]} />
          <meshPhysicalMaterial
            color="#88aacc"
            transparent
            opacity={0.25}
            transmission={0.85}
            roughness={0.04}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0.07, -0.05, -0.6]}>
          <boxGeometry args={[0.04, 0.028, 0.14]} />
          <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* ── WHEELS ────────────────────────────────────────────────────── */}
      <Wheel position={[-1.02, 0.34, 1.35]} />
      <Wheel position={[1.02, 0.34, 1.35]} flip />
      <Wheel position={[-1.02, 0.34, -1.35]} />
      <Wheel position={[1.02, 0.34, -1.35]} flip />

      {/* Wheel arch liners */}
      {(
        [
          [-0.98, 0.34, 1.35],
          [0.98, 0.34, 1.35],
          [-0.98, 0.34, -1.35],
          [0.98, 0.34, -1.35],
        ] as [number, number, number][]
      ).map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <torusGeometry args={[0.36, 0.04, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
      ))}

      {/* ── INTERIOR (visible through glass) ─────────────────────────── */}
      <Interior />

      {/* ── ENGINE BAY (visible when hood open) ───────────────────────── */}
      <EngineBay />

      {/* ── UNDERBODY ─────────────────────────────────────────────────── */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.06, 4.2]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* Exhaust tunnel */}
      <mesh position={[0, 0.22, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 3.0, 10]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}
