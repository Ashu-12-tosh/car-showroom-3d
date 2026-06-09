import { Environment } from '@react-three/drei'
import ShowroomFloor from './ShowroomFloor'
import ShowroomLighting from '../lighting/ShowroomLighting'
import GlbCar from '../car/GlbCar'
import CameraController from '../camera/CameraController'
import HotspotSystem from '../hotspots/HotspotSystem'
import StatsCollector from '../ui/StatsCollector'
import ScreenshotCapture from '../ui/ScreenshotCapture'
import useCarStore from '../../store/useCarStore'

// Everything that lives inside the R3F Canvas
export default function ShowroomScene() {
  const isNightMode = useCarStore((s) => s.isNightMode)

  return (
    <>
      {/* Performance monitor (invisible) */}
      <StatsCollector />

      {/* Screenshot hook (invisible) */}
      <ScreenshotCapture />

      {/* HDRI environment for reflections + ambient */}
      <Environment
        preset={isNightMode ? 'night' : 'city'}
        background={false}
        environmentIntensity={isNightMode ? 0.4 : 0.8}
      />

      {/* Studio lights */}
      <ShowroomLighting />

      {/* Floor with reflections */}
      <ShowroomFloor />

      {/* The car */}
      <GlbCar />

      {/* Interactive hotspot markers */}
      <HotspotSystem />

      {/* Camera + orbit controls */}
      <CameraController />
    </>
  )
}
