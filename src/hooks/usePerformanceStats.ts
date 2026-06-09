import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import useCarStore from '../store/useCarStore'

// Collects FPS, draw calls, triangle count, and GPU memory each frame
export function usePerformanceStats() {
  const { gl } = useThree()
  const setStats = useCarStore((s) => s.setStats)
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const fpsRef = useRef(0)

  useFrame(() => {
    frameCountRef.current++
    const now = performance.now()
    const delta = now - lastTimeRef.current

    // Update FPS every second
    if (delta >= 1000) {
      fpsRef.current = Math.round((frameCountRef.current * 1000) / delta)
      frameCountRef.current = 0
      lastTimeRef.current = now
    }

    const info = gl.info
    const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory

    setStats({
      fps: fpsRef.current,
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      memory: memory ? Math.round(memory.usedJSHeapSize / 1048576) : 0,
    })
  })
}
