import { useEffect } from 'react'
import { useScreenshot } from '../../hooks/useScreenshot'

// Listens for a custom DOM event triggered from the UI panel
export default function ScreenshotCapture() {
  const { capture } = useScreenshot()

  useEffect(() => {
    const handler = () => {
      const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
      capture(`showroom-${ts}.png`)
    }
    window.addEventListener('capture-screenshot', handler)
    return () => window.removeEventListener('capture-screenshot', handler)
  }, [capture])

  return null
}
