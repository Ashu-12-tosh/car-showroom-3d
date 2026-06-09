import * as THREE from 'three'

// ============================
// Screenshot capture
// ============================
export function captureScreenshot(renderer: THREE.WebGLRenderer, filename?: string): void {
  const canvas = renderer.domElement
  const dataURL = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.download = filename ?? `showroom-${Date.now()}.png`
  link.href = dataURL
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// ============================
// Lerp helpers
// ============================
export function lerpColor(a: string, b: string, t: number): string {
  const ca = new THREE.Color(a)
  const cb = new THREE.Color(b)
  ca.lerp(cb, t)
  return `#${ca.getHexString()}`
}

// ============================
// Format number
// ============================
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

// ============================
// Clamp
// ============================
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
