// ============================
// Core domain types
// ============================

export type PaintFinish = 'metallic' | 'gloss' | 'matte'

export type PanelTab = 'paint' | 'wheels' | 'interior' | 'camera' | 'parts'

export type CameraPresetId =
  | 'front'
  | 'rear'
  | 'left'
  | 'right'
  | 'top'
  | 'interior'
  | 'engine'
  | 'free'

export type DoorId = 'FL' | 'FR' | 'RL' | 'RR'

export type HotspotId = 'engine' | 'wheel-fl' | 'interior' | 'dashboard' | 'exhaust'

// ============================
// Data interfaces
// ============================

export interface PaintOption {
  id: string
  name: string
  color: string
  finish: PaintFinish
  metalness: number
  roughness: number
  clearcoat: number
}

export interface WheelOption {
  id: string
  name: string
  color: string
  spokeColor: string
  spokeCount: number
  rimStyle: 'turbine' | 'spoke' | 'mesh'
}

export interface InteriorOption {
  id: string
  name: string
  color: string
  seatColor: string
  dashColor: string
}

export interface CameraPreset {
  id: CameraPresetId
  name: string
  position: [number, number, number]
  target: [number, number, number]
}

export interface HotspotData {
  id: HotspotId
  position: [number, number, number]
  title: string
  description: string
}

export interface PerformanceStats {
  fps: number
  drawCalls: number
  triangles: number
  memory: number
}
