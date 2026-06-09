import { create } from 'zustand'
import type { PaintOption, WheelOption, InteriorOption, CameraPresetId, DoorId, PanelTab, PerformanceStats } from '../types'
import { PAINT_OPTIONS, WHEEL_OPTIONS, INTERIOR_OPTIONS } from '../utils/constants'

// ============================
// Store interface
// ============================
interface CarStore {
  // Paint
  selectedPaint: PaintOption
  setPaint: (paint: PaintOption) => void

  // Wheels
  selectedWheels: WheelOption
  setWheels: (wheels: WheelOption) => void

  // Interior
  selectedInterior: InteriorOption
  setInterior: (interior: InteriorOption) => void

  // Camera
  currentCameraPreset: CameraPresetId
  setCameraPreset: (preset: CameraPresetId) => void

  // Doors (open = true)
  doors: Record<DoorId, boolean>
  toggleDoor: (door: DoorId) => void

  // Hood & Trunk
  hoodOpen: boolean
  trunkOpen: boolean
  toggleHood: () => void
  toggleTrunk: () => void

  // Environment
  isNightMode: boolean
  toggleNightMode: () => void

  // UI panel
  activePanelTab: PanelTab
  setActivePanelTab: (tab: PanelTab) => void
  panelOpen: boolean
  setPanelOpen: (open: boolean) => void

  // Hotspots
  activeHotspot: string | null
  setActiveHotspot: (id: string | null) => void

  // Loading
  isLoaded: boolean
  setLoaded: (loaded: boolean) => void

  // Performance stats
  stats: PerformanceStats
  setStats: (stats: PerformanceStats) => void
}

// ============================
// Store implementation
// ============================
const useCarStore = create<CarStore>((set) => ({
  // Paint
  selectedPaint: PAINT_OPTIONS[1], // Default: Midnight Black
  setPaint: (paint) => set({ selectedPaint: paint }),

  // Wheels
  selectedWheels: WHEEL_OPTIONS[0],
  setWheels: (wheels) => set({ selectedWheels: wheels }),

  // Interior
  selectedInterior: INTERIOR_OPTIONS[0],
  setInterior: (interior) => set({ selectedInterior: interior }),

  // Camera
  currentCameraPreset: 'free',
  setCameraPreset: (preset) => set({ currentCameraPreset: preset }),

  // Doors
  doors: { FL: false, FR: false, RL: false, RR: false },
  toggleDoor: (door) =>
    set((state) => ({
      doors: { ...state.doors, [door]: !state.doors[door] },
    })),

  // Hood & Trunk
  hoodOpen: false,
  trunkOpen: false,
  toggleHood: () => set((state) => ({ hoodOpen: !state.hoodOpen })),
  toggleTrunk: () => set((state) => ({ trunkOpen: !state.trunkOpen })),

  // Environment
  isNightMode: false,
  toggleNightMode: () => set((state) => ({ isNightMode: !state.isNightMode })),

  // UI
  activePanelTab: 'paint',
  setActivePanelTab: (tab) => set({ activePanelTab: tab }),
  panelOpen: true,
  setPanelOpen: (open) => set({ panelOpen: open }),

  // Hotspots
  activeHotspot: null,
  setActiveHotspot: (id) => set({ activeHotspot: id }),

  // Loading
  isLoaded: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),

  // Performance
  stats: { fps: 0, drawCalls: 0, triangles: 0, memory: 0 },
  setStats: (stats) => set({ stats }),
}))

export default useCarStore
