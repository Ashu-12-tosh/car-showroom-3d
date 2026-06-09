import { useEffect, useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import useCarStore from '../../store/useCarStore'

const MODEL_PATH = '/lamborghini.glb'

// ── keyword lists for each part category (all lowercase) ─────────────────────
const BODY_KEYS = [
  'body', 'paint', 'exterior', 'shell', 'panel', 'fender', 'bumper',
  'roof', 'bonnet', 'spoiler', 'skirt', 'sill', 'quarter', 'apron',
  'diffuser', 'splitter', 'wing', 'cap', 'cover',
]
const WHEEL_KEYS  = ['wheel', 'rim', 'alloy', 'hub', 'disc', 'rotor', 'spoke']
const TIRE_KEYS   = ['tire', 'tyre', 'rubber', 'tread']
const GLASS_KEYS  = ['glass', 'window', 'windshield', 'screen', 'wind', 'visor']
const INT_KEYS    = [
  'seat', 'interior', 'cabin', 'dash', 'cockpit',
  'steering', 'console', 'carpet', 'headliner', 'stitching',
]

const DOOR_FL_KEYS = ['door_fl', 'door_front_left', 'doorfl', 'fl_door', 'front_left_door', 'door.fl', 'fdoorl', 'door_l']
const DOOR_FR_KEYS = ['door_fr', 'door_front_right', 'doorfr', 'fr_door', 'front_right_door', 'door.fr', 'fdoorr', 'door_r']
const DOOR_RL_KEYS = ['door_rl', 'door_rear_left', 'doorrl', 'rl_door', 'rear_left_door', 'door.rl', 'rdoorl']
const DOOR_RR_KEYS = ['door_rr', 'door_rear_right', 'doorrr', 'rr_door', 'rear_right_door', 'door.rr', 'rdoorr']
const HOOD_KEYS    = ['hood', 'bonnet', 'engine_cover', 'front_lid', 'hood_panel']
const TRUNK_KEYS   = ['trunk', 'boot', 'bootlid', 'trunk_lid', 'rear_lid', 'tailgate', 'hatch']

// ── helpers ───────────────────────────────────────────────────────────────────
function matchesKeys(name: string, keys: string[]) {
  const n = name.toLowerCase()
  return keys.some((k) => n.includes(k))
}

function findNode(root: THREE.Object3D, keys: string[]): THREE.Object3D | null {
  let found: THREE.Object3D | null = null
  root.traverse((child) => {
    if (!found && matchesKeys(child.name, keys)) found = child
  })
  return found
}

function applyToMatchingMeshes(
  root: THREE.Object3D,
  keys: string[],
  fn: (mat: THREE.MeshStandardMaterial) => void,
) {
  root.traverse((child) => {
    const mesh = child as THREE.Mesh
    if (!mesh.isMesh || !matchesKeys(child.name, keys)) return
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    mats.forEach((m) => {
      if (m instanceof THREE.MeshStandardMaterial) fn(m)
    })
  })
}

// Fallback: paint ALL opaque, non-tire meshes when no body-named mesh found
function applyPaintFallback(
  root: THREE.Object3D,
  fn: (mat: THREE.MeshStandardMaterial) => void,
) {
  root.traverse((child) => {
    const mesh = child as THREE.Mesh
    if (!mesh.isMesh) return
    if (matchesKeys(child.name, [...GLASS_KEYS, ...TIRE_KEYS, ...INT_KEYS])) return
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    mats.forEach((m) => {
      if (m instanceof THREE.MeshStandardMaterial && !m.transparent) fn(m)
    })
  })
}

// ── component ─────────────────────────────────────────────────────────────────
export default function GlbCar() {
  const {
    isLoaded, setLoaded,
    selectedPaint,
    selectedWheels,
    selectedInterior,
    doors,
    hoodOpen, trunkOpen,
  } = useCarStore()

  const groupRef   = useRef<THREE.Group>(null)
  const doorFLRef  = useRef<THREE.Object3D | null>(null)
  const doorFRRef  = useRef<THREE.Object3D | null>(null)
  const doorRLRef  = useRef<THREE.Object3D | null>(null)
  const doorRRRef  = useRef<THREE.Object3D | null>(null)
  const hoodRef    = useRef<THREE.Object3D | null>(null)
  const trunkRef   = useRef<THREE.Object3D | null>(null)

  const { scene: rawScene } = useGLTF(MODEL_PATH)

  // Clone once so we don't mutate the GLTF cache
  const scene = useMemo(() => rawScene.clone(true), [rawScene])

  // ── initial setup ──────────────────────────────────────────────────────────
  useEffect(() => {
    // Enable shadows + log all mesh names for debugging
    const meshNames: string[] = []
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        meshNames.push(child.name)
      }
    })
    console.log('[GlbCar] mesh names:', meshNames)
    console.log('[GlbCar] all node names:', (() => {
      const n: string[] = []
      scene.traverse((c) => n.push(c.name))
      return n
    })())

    // Bind animated part refs
    doorFLRef.current = findNode(scene, DOOR_FL_KEYS)
    doorFRRef.current = findNode(scene, DOOR_FR_KEYS)
    doorRLRef.current = findNode(scene, DOOR_RL_KEYS)
    doorRRRef.current = findNode(scene, DOOR_RR_KEYS)
    hoodRef.current   = findNode(scene, HOOD_KEYS)
    trunkRef.current  = findNode(scene, TRUNK_KEYS)

    console.log('[GlbCar] animated parts found:', {
      doorFL: doorFLRef.current?.name ?? 'NOT FOUND',
      doorFR: doorFRRef.current?.name ?? 'NOT FOUND',
      doorRL: doorRLRef.current?.name ?? 'NOT FOUND',
      doorRR: doorRRRef.current?.name ?? 'NOT FOUND',
      hood:   hoodRef.current?.name   ?? 'NOT FOUND',
      trunk:  trunkRef.current?.name  ?? 'NOT FOUND',
    })
  }, [scene])

  // ── mark loaded ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) {
      const t = setTimeout(() => setLoaded(true), 800)
      return () => clearTimeout(t)
    }
  }, [isLoaded, setLoaded])

  // ── entrance spin ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = -Math.PI * 0.5
    gsap.to(groupRef.current.rotation, {
      y: 0,
      duration: 1.8,
      ease: 'power3.out',
      delay: 0.2,
    })
  }, [])

  // ── paint ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const { color, metalness, roughness, clearcoat } = selectedPaint

    // Try named body meshes first
    let applied = false
    applyToMatchingMeshes(scene, BODY_KEYS, (mat) => {
      mat.color.set(color)
      mat.metalness = metalness
      mat.roughness = roughness
      if (mat instanceof THREE.MeshPhysicalMaterial) {
        mat.clearcoat = clearcoat
        mat.clearcoatRoughness = 0.08
      }
      mat.needsUpdate = true
      applied = true
    })

    // Fallback: apply to all opaque non-glass non-tire meshes
    if (!applied) {
      applyPaintFallback(scene, (mat) => {
        mat.color.set(color)
        mat.metalness = metalness
        mat.roughness = roughness
        if (mat instanceof THREE.MeshPhysicalMaterial) {
          mat.clearcoat = clearcoat
          mat.clearcoatRoughness = 0.08
        }
        mat.needsUpdate = true
      })
    }
  }, [scene, selectedPaint])

  // ── wheels ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const { color, spokeColor } = selectedWheels
    applyToMatchingMeshes(scene, WHEEL_KEYS, (mat) => {
      mat.color.set(matchesKeys(mat.name ?? '', ['spoke', 'hub', 'center']) ? spokeColor : color)
      mat.metalness = 0.85
      mat.roughness = 0.15
      mat.needsUpdate = true
    })
  }, [scene, selectedWheels])

  // ── interior ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const { seatColor, dashColor } = selectedInterior
    applyToMatchingMeshes(scene, INT_KEYS, (mat) => {
      const n = mat.name?.toLowerCase() ?? ''
      const isSeat = n.includes('seat') || n.includes('upholstery') || n.includes('leather')
      mat.color.set(isSeat ? seatColor : dashColor)
      mat.needsUpdate = true
    })
  }, [scene, selectedInterior])

  // ── door FL ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!doorFLRef.current) return
    gsap.to(doorFLRef.current.rotation, {
      y: doors.FL ? Math.PI * 0.38 : 0,
      duration: 0.9,
      ease: 'power2.inOut',
    })
  }, [doors.FL])

  // ── door FR ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!doorFRRef.current) return
    gsap.to(doorFRRef.current.rotation, {
      y: doors.FR ? -Math.PI * 0.38 : 0,
      duration: 0.9,
      ease: 'power2.inOut',
    })
  }, [doors.FR])

  // ── door RL ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!doorRLRef.current) return
    gsap.to(doorRLRef.current.rotation, {
      y: doors.RL ? Math.PI * 0.38 : 0,
      duration: 0.9,
      ease: 'power2.inOut',
    })
  }, [doors.RL])

  // ── door RR ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!doorRRRef.current) return
    gsap.to(doorRRRef.current.rotation, {
      y: doors.RR ? -Math.PI * 0.38 : 0,
      duration: 0.9,
      ease: 'power2.inOut',
    })
  }, [doors.RR])

  // ── hood ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!hoodRef.current) return
    gsap.to(hoodRef.current.rotation, {
      x: hoodOpen ? -Math.PI * 0.54 : 0,
      duration: 1.0,
      ease: 'power2.inOut',
    })
  }, [hoodOpen])

  // ── trunk ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!trunkRef.current) return
    gsap.to(trunkRef.current.rotation, {
      x: trunkOpen ? Math.PI * 0.55 : 0,
      duration: 1.0,
      ease: 'power2.inOut',
    })
  }, [trunkOpen])

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={scene} scale={1} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
