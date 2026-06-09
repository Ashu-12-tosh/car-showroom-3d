import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'
import useCarStore from '../../store/useCarStore'
import { CAMERA_PRESETS } from '../../utils/constants'

// Wraps OrbitControls with GSAP-animated preset transitions
export default function CameraController() {
  const { camera } = useThree()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null)
  const currentPreset = useCarStore((s) => s.currentCameraPreset)

  useEffect(() => {
    const preset = CAMERA_PRESETS.find((p) => p.id === currentPreset)
    if (!preset || !controlsRef.current) return

    const controls = controlsRef.current
    const [px, py, pz] = preset.position
    const [tx, ty, tz] = preset.target

    // Kill ongoing tweens to avoid conflicts
    gsap.killTweensOf(camera.position)
    gsap.killTweensOf(controls.target)

    // Animate camera position
    gsap.to(camera.position, {
      x: px,
      y: py,
      z: pz,
      duration: 1.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        controls.update()
      },
    })

    // Animate orbit target simultaneously
    gsap.to(controls.target, {
      x: tx,
      y: ty,
      z: tz,
      duration: 1.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        controls.update()
      },
    })
  }, [currentPreset, camera])

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.07}
      minDistance={1.5}
      maxDistance={12}
      maxPolarAngle={Math.PI * 0.5}
      target={new THREE.Vector3(0, 0.7, 0)}
      makeDefault
    />
  )
}
