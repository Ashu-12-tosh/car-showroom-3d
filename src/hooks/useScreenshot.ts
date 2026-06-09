import { useThree } from '@react-three/fiber'
import { useCallback } from 'react'

// Captures current WebGL frame and triggers browser download
export function useScreenshot() {
  const { gl, scene, camera } = useThree()

  const capture = useCallback(
    (filename = 'showroom-capture.png') => {
      // Force a render to ensure latest frame
      gl.render(scene, camera)
      const dataUrl = gl.domElement.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = filename
      link.click()
    },
    [gl, scene, camera],
  )

  return { capture }
}
