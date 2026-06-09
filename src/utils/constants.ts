import type {
  PaintOption,
  WheelOption,
  InteriorOption,
  CameraPreset,
  HotspotData,
} from '../types'

// ============================
// Paint Options
// ============================
export const PAINT_OPTIONS: PaintOption[] = [
  {
    id: 'arctic-white',
    name: 'Arctic White',
    color: '#F2F2EE',
    finish: 'gloss',
    metalness: 0.1,
    roughness: 0.08,
    clearcoat: 1.0,
  },
  {
    id: 'midnight-black',
    name: 'Midnight Black',
    color: '#0D0D10',
    finish: 'gloss',
    metalness: 0.15,
    roughness: 0.05,
    clearcoat: 1.0,
  },
  {
    id: 'steel-blue',
    name: 'Steel Blue',
    color: '#3A5F8A',
    finish: 'metallic',
    metalness: 0.9,
    roughness: 0.12,
    clearcoat: 0.9,
  },
  {
    id: 'crimson-red',
    name: 'Crimson Red',
    color: '#B01030',
    finish: 'metallic',
    metalness: 0.7,
    roughness: 0.08,
    clearcoat: 1.0,
  },
  {
    id: 'racing-silver',
    name: 'Racing Silver',
    color: '#B8B8BE',
    finish: 'metallic',
    metalness: 1.0,
    roughness: 0.08,
    clearcoat: 0.6,
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    color: '#2A5A38',
    finish: 'metallic',
    metalness: 0.8,
    roughness: 0.18,
    clearcoat: 0.9,
  },
  {
    id: 'volcanic-orange',
    name: 'Volcanic Orange',
    color: '#E05520',
    finish: 'metallic',
    metalness: 0.6,
    roughness: 0.08,
    clearcoat: 1.0,
  },
  {
    id: 'matte-black',
    name: 'Matte Black',
    color: '#181818',
    finish: 'matte',
    metalness: 0.0,
    roughness: 0.95,
    clearcoat: 0.0,
  },
  {
    id: 'pearl-gold',
    name: 'Pearl Gold',
    color: '#C49A2C',
    finish: 'metallic',
    metalness: 0.9,
    roughness: 0.08,
    clearcoat: 1.0,
  },
  {
    id: 'deep-purple',
    name: 'Deep Purple',
    color: '#3A1A5A',
    finish: 'metallic',
    metalness: 0.85,
    roughness: 0.1,
    clearcoat: 1.0,
  },
]

// ============================
// Wheel Options
// ============================
export const WHEEL_OPTIONS: WheelOption[] = [
  {
    id: 'sport-5-spoke',
    name: '5-Spoke Sport',
    color: '#252525',
    spokeColor: '#888888',
    spokeCount: 5,
    rimStyle: 'spoke',
  },
  {
    id: 'turbine-silver',
    name: 'Turbine Silver',
    color: '#909090',
    spokeColor: '#C0C0C0',
    spokeCount: 10,
    rimStyle: 'turbine',
  },
  {
    id: 'black-mesh',
    name: 'Black Mesh',
    color: '#101010',
    spokeColor: '#444444',
    spokeCount: 12,
    rimStyle: 'mesh',
  },
  {
    id: 'gunmetal-7',
    name: 'Gunmetal 7-Spoke',
    color: '#484848',
    spokeColor: '#707070',
    spokeCount: 7,
    rimStyle: 'spoke',
  },
  {
    id: 'gold-trim',
    name: 'Gold Trim',
    color: '#181818',
    spokeColor: '#C49A2C',
    spokeCount: 5,
    rimStyle: 'spoke',
  },
  {
    id: 'chrome-turbine',
    name: 'Chrome Turbine',
    color: '#C8C8C8',
    spokeColor: '#E8E8E8',
    spokeCount: 9,
    rimStyle: 'turbine',
  },
]

// ============================
// Interior Options
// ============================
export const INTERIOR_OPTIONS: InteriorOption[] = [
  {
    id: 'black-leather',
    name: 'Black Leather',
    color: '#1A1A1A',
    seatColor: '#242424',
    dashColor: '#0E0E0E',
  },
  {
    id: 'tan-cream',
    name: 'Tan Cream',
    color: '#C4A882',
    seatColor: '#D4B892',
    dashColor: '#8B6F47',
  },
  {
    id: 'red-sport',
    name: 'Red Sport',
    color: '#1A0808',
    seatColor: '#780010',
    dashColor: '#0E0808',
  },
  {
    id: 'blue-alcantara',
    name: 'Blue Alcantara',
    color: '#1A1A3A',
    seatColor: '#242455',
    dashColor: '#0E0E1E',
  },
  {
    id: 'ivory-luxury',
    name: 'Ivory Luxury',
    color: '#EDE8DC',
    seatColor: '#F5F0E4',
    dashColor: '#7A6545',
  },
]

// ============================
// Camera Presets
// ============================
export const CAMERA_PRESETS: CameraPreset[] = [
  {
    id: 'front',
    name: 'Front View',
    position: [0, 1.4, 5.5],
    target: [0, 0.7, 0],
  },
  {
    id: 'rear',
    name: 'Rear View',
    position: [0, 1.4, -5.5],
    target: [0, 0.7, 0],
  },
  {
    id: 'left',
    name: 'Left Side',
    position: [-5.5, 1.4, 0],
    target: [0, 0.7, 0],
  },
  {
    id: 'right',
    name: 'Right Side',
    position: [5.5, 1.4, 0],
    target: [0, 0.7, 0],
  },
  {
    id: 'top',
    name: 'Top View',
    position: [0, 7.5, 0.01],
    target: [0, 0, 0],
  },
  {
    id: 'interior',
    name: 'Interior',
    position: [0.3, 1.2, 0.1],
    target: [0, 1.1, 1.5],
  },
  {
    id: 'engine',
    name: 'Engine Bay',
    position: [0.5, 2.0, 3.5],
    target: [0, 0.9, 1.5],
  },
  {
    id: 'free',
    name: 'Free Look',
    position: [3.5, 2.2, 4.2],
    target: [0, 0.7, 0],
  },
]

// ============================
// Hotspots
// ============================
export const HOTSPOTS: HotspotData[] = [
  {
    id: 'engine',
    position: [0.5, 1.3, 1.7],
    title: 'Twin-Turbo V8',
    description: '4.0L Biturbo • 600 hp @ 6,000 rpm • 0–100 km/h in 3.2s',
  },
  {
    id: 'wheel-fl',
    position: [-1.2, 0.55, 1.35],
    title: 'Carbon Ceramic Brakes',
    description: '6-piston calipers • 400mm front rotors • Track-ready stopping power',
  },
  {
    id: 'interior',
    position: [0, 1.45, 0.0],
    title: 'Premium Cabin',
    description: 'Hand-stitched leather • Ambient lighting • Burmester 3D surround sound',
  },
  {
    id: 'dashboard',
    position: [0, 1.2, -0.1],
    title: 'Digital Cockpit',
    description: '12.3" instrument cluster • 14.4" OLED display • AR-HUD navigation',
  },
  {
    id: 'exhaust',
    position: [0.65, 0.55, -2.4],
    title: 'Sport Exhaust',
    description: 'Active titanium exhaust • Valvetronic control • 4 sound profiles',
  },
]
