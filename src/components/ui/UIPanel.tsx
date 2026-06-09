import { useState } from 'react'
import {
  RiPaintBrushLine,
  RiCarLine,
  RiMoonLine,
  RiSunLine,
  RiCameraLine,
  RiSettings3Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiScreenshot2Line,
} from 'react-icons/ri'
import { MdOutlineChairAlt, MdTune } from 'react-icons/md'
import useCarStore from '../../store/useCarStore'
import { PAINT_OPTIONS, WHEEL_OPTIONS, INTERIOR_OPTIONS, CAMERA_PRESETS } from '../../utils/constants'
import type { PanelTab } from '../../types'

// ─── Tab button ───────────────────────────────────────────────────────────────
interface TabBtnProps {
  id: PanelTab
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}
function TabBtn({ icon, label, active, onClick }: TabBtnProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3px',
        padding: '9px 4px',
        background: active ? 'rgba(0,212,255,0.10)' : 'transparent',
        border: 'none',
        borderBottom: active ? '2px solid #00d4ff' : '2px solid transparent',
        cursor: 'pointer',
        flex: 1,
        transition: 'all 0.2s',
      }}
    >
      <span style={{ fontSize: '18px', color: active ? '#00d4ff' : '#506070' }}>{icon}</span>
      <span
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '9px',
          color: active ? '#00d4ff' : '#405060',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </button>
  )
}

// ─── Section heading ───────────────────────────────────────────────────────────
function SectionHead({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '10px',
        color: '#405060',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        marginBottom: '10px',
        paddingBottom: '6px',
        borderBottom: '1px solid #0e1828',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Toggle row ────────────────────────────────────────────────────────────────
interface ToggleRowProps {
  label: string
  active: boolean
  onClick: () => void
  color?: string
}
function ToggleRow({ label, active, onClick, color = '#00d4ff' }: ToggleRowProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '8px 10px',
        background: active ? `${color}12` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${active ? `${color}33` : '#0e1828'}`,
        borderRadius: '6px',
        cursor: 'pointer',
        marginBottom: '6px',
        transition: 'all 0.2s',
      }}
    >
      <span
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '13px',
          color: active ? color : '#607080',
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      <div
        style={{
          width: '32px',
          height: '16px',
          borderRadius: '8px',
          background: active ? color : '#111a22',
          border: `1px solid ${active ? color : '#1a2a3a'}`,
          position: 'relative',
          transition: 'background 0.25s',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: active ? '16px' : '2px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#fff',
            transition: 'left 0.25s',
          }}
        />
      </div>
    </button>
  )
}

// ─── Camera preset button ─────────────────────────────────────────────────────
interface CamBtnProps {
  name: string
  active: boolean
  onClick: () => void
}
function CamBtn({ name, active, onClick }: CamBtnProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 0',
        background: active ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${active ? '#00d4ff55' : '#0e1828'}`,
        borderRadius: '6px',
        cursor: 'pointer',
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: '12px',
        color: active ? '#00d4ff' : '#506070',
        fontWeight: active ? 700 : 400,
        transition: 'all 0.2s',
        width: '100%',
      }}
    >
      {name}
    </button>
  )
}

// ─── Main panel ────────────────────────────────────────────────────────────────
export default function UIPanel() {
  const {
    selectedPaint,
    setPaint,
    selectedWheels,
    setWheels,
    selectedInterior,
    setInterior,
    currentCameraPreset,
    setCameraPreset,
    doors,
    toggleDoor,
    hoodOpen,
    trunkOpen,
    toggleHood,
    toggleTrunk,
    isNightMode,
    toggleNightMode,
    activePanelTab,
    setActivePanelTab,
    panelOpen,
    setPanelOpen,
  } = useCarStore()

  const [hoveredPaint, setHoveredPaint] = useState<string | null>(null)
  const [hoveredWheel, setHoveredWheel] = useState<string | null>(null)

  const panelW = 290

  const tabs: { id: PanelTab; icon: React.ReactNode; label: string }[] = [
    { id: 'paint', icon: <RiPaintBrushLine />, label: 'Paint' },
    { id: 'wheels', icon: <RiCarLine />, label: 'Wheels' },
    { id: 'interior', icon: <MdOutlineChairAlt />, label: 'Interior' },
    { id: 'camera', icon: <RiCameraLine />, label: 'Camera' },
    { id: 'parts', icon: <MdTune />, label: 'Parts' },
  ]

  return (
    <>
      {/* Collapse toggle */}
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        style={{
          position: 'fixed',
          top: '50%',
          left: panelOpen ? panelW + 4 : 4,
          transform: 'translateY(-50%)',
          zIndex: 300,
          background: 'rgba(8,8,20,0.9)',
          border: '1px solid #0e1828',
          borderRadius: '0 6px 6px 0',
          padding: '10px 5px',
          cursor: 'pointer',
          color: '#00d4ff',
          fontSize: '18px',
          transition: 'left 0.3s',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {panelOpen ? <RiArrowLeftSLine /> : <RiArrowRightSLine />}
      </button>

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: panelW,
          height: '100vh',
          background: 'rgba(6,6,14,0.94)',
          backdropFilter: 'blur(16px)',
          borderRight: '1px solid #0e1828',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 200,
          transform: panelOpen ? 'translateX(0)' : `translateX(-${panelW}px)`,
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 16px 12px',
            borderBottom: '1px solid #0a1420',
          }}
        >
          <div
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.18em',
            }}
          >
            APEX <span style={{ color: '#00d4ff' }}>GT</span>
          </div>
          <div
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '11px',
              color: '#304050',
              letterSpacing: '0.14em',
              marginTop: '2px',
            }}
          >
            3D CONFIGURATOR
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #0a1420',
            flexShrink: 0,
          }}
        >
          {tabs.map((t) => (
            <TabBtn
              key={t.id}
              id={t.id}
              icon={t.icon}
              label={t.label}
              active={activePanelTab === t.id}
              onClick={() => setActivePanelTab(t.id)}
            />
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px' }}>

          {/* ── PAINT ─────────────────────────────────────────── */}
          {activePanelTab === 'paint' && (
            <div>
              <SectionHead>Body Colour</SectionHead>

              {/* Current selection info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  padding: '10px',
                  background: 'rgba(0,212,255,0.06)',
                  borderRadius: '8px',
                  border: '1px solid #0e2030',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: selectedPaint.color,
                    border: '2px solid #00d4ff44',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '11px',
                      color: '#00d4ff',
                      fontWeight: 600,
                    }}
                  >
                    {selectedPaint.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Rajdhani, sans-serif',
                      fontSize: '11px',
                      color: '#405060',
                      textTransform: 'capitalize',
                    }}
                  >
                    {selectedPaint.finish} finish
                  </div>
                </div>
              </div>

              {/* Colour grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '8px',
                  marginBottom: '16px',
                }}
              >
                {PAINT_OPTIONS.map((p) => {
                  const isActive = selectedPaint.id === p.id
                  const isHov = hoveredPaint === p.id
                  return (
                    <button
                      key={p.id}
                      title={p.name}
                      onClick={() => setPaint(p)}
                      onMouseEnter={() => setHoveredPaint(p.id)}
                      onMouseLeave={() => setHoveredPaint(null)}
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        borderRadius: '50%',
                        background: p.color,
                        border: isActive
                          ? '2.5px solid #00d4ff'
                          : isHov
                          ? '2px solid #00d4ff66'
                          : '2px solid #1a2a3a',
                        cursor: 'pointer',
                        transform: isActive || isHov ? 'scale(1.12)' : 'scale(1)',
                        transition: 'all 0.18s',
                        boxShadow: isActive ? `0 0 12px ${p.color}66` : 'none',
                      }}
                    />
                  )
                })}
              </div>

              <SectionHead>Finish Details</SectionHead>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px',
                }}
              >
                {[
                  { k: 'Metalness', v: (selectedPaint.metalness * 100).toFixed(0) + '%' },
                  { k: 'Roughness', v: (selectedPaint.roughness * 100).toFixed(0) + '%' },
                  { k: 'Clearcoat', v: (selectedPaint.clearcoat * 100).toFixed(0) + '%' },
                  { k: 'Finish', v: selectedPaint.finish },
                ].map(({ k, v }) => (
                  <div
                    key={k}
                    style={{
                      padding: '7px 9px',
                      background: '#070710',
                      borderRadius: '6px',
                      border: '1px solid #0e1828',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '10px',
                        color: '#304050',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {k}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '12px',
                        color: '#00d4ff',
                        marginTop: '2px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── WHEELS ────────────────────────────────────────── */}
          {activePanelTab === 'wheels' && (
            <div>
              <SectionHead>Wheel Style</SectionHead>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {WHEEL_OPTIONS.map((w) => {
                  const isActive = selectedWheels.id === w.id
                  const isHov = hoveredWheel === w.id
                  return (
                    <button
                      key={w.id}
                      onClick={() => setWheels(w)}
                      onMouseEnter={() => setHoveredWheel(w.id)}
                      onMouseLeave={() => setHoveredWheel(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 12px',
                        background: isActive ? 'rgba(0,212,255,0.08)' : isHov ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                        border: `1px solid ${isActive ? '#00d4ff44' : '#0e1828'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                    >
                      {/* Mini wheel preview */}
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          border: `3px solid ${w.color}`,
                          background: w.spokeColor,
                          flexShrink: 0,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${w.color} 30%, transparent 31%)`,
                          }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: 'Rajdhani, sans-serif',
                            fontSize: '13px',
                            color: isActive ? '#00d4ff' : '#c0ccd8',
                            fontWeight: 600,
                          }}
                        >
                          {w.name}
                        </div>
                        <div
                          style={{
                            fontFamily: 'Rajdhani, sans-serif',
                            fontSize: '11px',
                            color: '#405060',
                            textTransform: 'capitalize',
                          }}
                        >
                          {w.rimStyle} · {w.spokeCount} {w.rimStyle === 'spoke' ? 'spokes' : 'blades'}
                        </div>
                      </div>
                      {isActive && (
                        <div
                          style={{
                            marginLeft: 'auto',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#00d4ff',
                          }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── INTERIOR ──────────────────────────────────────── */}
          {activePanelTab === 'interior' && (
            <div>
              <SectionHead>Interior Theme</SectionHead>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {INTERIOR_OPTIONS.map((opt) => {
                  const isActive = selectedInterior.id === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setInterior(opt)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 12px',
                        background: isActive ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.01)',
                        border: `1px solid ${isActive ? '#00d4ff44' : '#0e1828'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                    >
                      {/* 3-swatch preview */}
                      <div style={{ display: 'flex', gap: '3px', flexShrink: 0 }}>
                        {[opt.color, opt.seatColor, opt.dashColor].map((c, i) => (
                          <div
                            key={i}
                            style={{
                              width: '12px',
                              height: '36px',
                              borderRadius: '3px',
                              background: c,
                              border: '1px solid #ffffff11',
                            }}
                          />
                        ))}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: 'Rajdhani, sans-serif',
                            fontSize: '13px',
                            color: isActive ? '#00d4ff' : '#c0ccd8',
                            fontWeight: 600,
                          }}
                        >
                          {opt.name}
                        </div>
                        <div
                          style={{
                            fontFamily: 'Rajdhani, sans-serif',
                            fontSize: '11px',
                            color: '#405060',
                          }}
                        >
                          Upholstery + dash
                        </div>
                      </div>
                      {isActive && (
                        <div
                          style={{
                            marginLeft: 'auto',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#00d4ff',
                          }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── CAMERA ────────────────────────────────────────── */}
          {activePanelTab === 'camera' && (
            <div>
              <SectionHead>Camera Preset</SectionHead>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px',
                  marginBottom: '16px',
                }}
              >
                {CAMERA_PRESETS.map((cp) => (
                  <CamBtn
                    key={cp.id}
                    name={cp.name}
                    active={currentCameraPreset === cp.id}
                    onClick={() => setCameraPreset(cp.id)}
                  />
                ))}
              </div>

              <SectionHead>Environment</SectionHead>
              <ToggleRow
                label={isNightMode ? 'Night Mode' : 'Day Mode'}
                active={isNightMode}
                onClick={toggleNightMode}
                color="#00d4ff"
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  background: '#070710',
                  borderRadius: '6px',
                  border: '1px solid #0e1828',
                  marginTop: '6px',
                }}
              >
                <RiSunLine style={{ color: '#f0a500', fontSize: '16px' }} />
                <div
                  style={{
                    flex: 1,
                    height: '2px',
                    background: `linear-gradient(90deg, #f0a500, #0a1828)`,
                    borderRadius: '2px',
                  }}
                />
                <RiMoonLine style={{ color: '#4488ff', fontSize: '16px' }} />
              </div>
            </div>
          )}

          {/* ── PARTS ─────────────────────────────────────────── */}
          {activePanelTab === 'parts' && (
            <div>
              <SectionHead>Doors</SectionHead>
              <ToggleRow label="Front Left Door" active={doors.FL} onClick={() => toggleDoor('FL')} color="#00d4ff" />
              <ToggleRow label="Front Right Door" active={doors.FR} onClick={() => toggleDoor('FR')} color="#00d4ff" />
              <ToggleRow label="Rear Left Door" active={doors.RL} onClick={() => toggleDoor('RL')} color="#00d4ff" />
              <ToggleRow label="Rear Right Door" active={doors.RR} onClick={() => toggleDoor('RR')} color="#00d4ff" />

              <SectionHead style={{ marginTop: '12px' }}>Panels</SectionHead>
              <ToggleRow label="Hood / Engine Bay" active={hoodOpen} onClick={toggleHood} color="#f0a500" />
              <ToggleRow label="Trunk" active={trunkOpen} onClick={toggleTrunk} color="#f0a500" />

              <SectionHead style={{ marginTop: '12px' }}>Info</SectionHead>
              <div
                style={{
                  padding: '10px',
                  background: '#070710',
                  borderRadius: '6px',
                  border: '1px solid #0e1828',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '12px',
                  color: '#405060',
                  lineHeight: '1.6',
                }}
              >
                Click any orange hotspot in the 3D view for detailed specs.
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div
          style={{
            padding: '12px 14px',
            borderTop: '1px solid #0a1420',
            display: 'flex',
            gap: '8px',
          }}
        >
          {/* Screenshot */}
          <button
            onClick={() => window.dispatchEvent(new Event('capture-screenshot'))}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              padding: '9px',
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid #00d4ff33',
              borderRadius: '7px',
              cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '12px',
              color: '#00d4ff',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            <RiScreenshot2Line style={{ fontSize: '16px' }} />
            Screenshot
          </button>

          {/* Night/Day quick toggle */}
          <button
            onClick={toggleNightMode}
            title={isNightMode ? 'Switch to Day' : 'Switch to Night'}
            style={{
              padding: '9px 14px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid #0e1828',
              borderRadius: '7px',
              cursor: 'pointer',
              color: isNightMode ? '#4488ff' : '#f0a500',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isNightMode ? <RiMoonLine /> : <RiSunLine />}
          </button>

          <button
            onClick={() => {}}
            title="Settings"
            style={{
              padding: '9px 12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid #0e1828',
              borderRadius: '7px',
              cursor: 'pointer',
              color: '#405060',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <RiSettings3Line />
          </button>
        </div>
      </div>
    </>
  )
}
