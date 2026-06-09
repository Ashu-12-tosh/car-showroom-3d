import { usePerformanceStats } from '../../hooks/usePerformanceStats'

// Invisible R3F component — must live inside Canvas
export default function StatsCollector() {
  usePerformanceStats()
  return null
}
