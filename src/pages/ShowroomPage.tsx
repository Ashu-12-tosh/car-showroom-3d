import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import ShowroomScene from '../components/showroom/ShowroomScene'
import UIPanel from '../components/ui/UIPanel'
import LoadingScreen from '../components/ui/LoadingScreen'
import PerformanceDashboard from '../components/ui/PerformanceDashboard'

export default function ShowroomPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050508', overflow: 'hidden' }}>

      {/* Loading overlay (rendered outside Canvas) */}
      <LoadingScreen />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [3.5, 2.2, 4.2], fov: 45, near: 0.1, far: 100 }}
        shadows
        gl={{
          antialias: true,
          preserveDrawingBuffer: true, // required for screenshot
          toneMapping: 4, // ACESFilmicToneMapping
          toneMappingExposure: 1.1,
        }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <ShowroomScene />
        </Suspense>
      </Canvas>

      {/* UI panel (on top of Canvas) */}
      <UIPanel />

      {/* Performance overlay */}
      <PerformanceDashboard />
    </div>
  )
}
