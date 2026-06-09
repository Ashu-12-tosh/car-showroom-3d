import useCarStore from '../../store/useCarStore'

// Studio-style showroom lighting for both day and night modes
export default function ShowroomLighting() {
  const isNightMode = useCarStore((s) => s.isNightMode)

  return (
    <>
      {isNightMode ? (
        <>
          {/* Night: dark ambient + coloured studio spots */}
          <ambientLight intensity={0.08} color="#0a1628" />

          {/* Key — blue-white top spot */}
          <spotLight
            position={[0, 8, 0]}
            angle={0.45}
            penumbra={0.6}
            intensity={3.5}
            color="#4488ff"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.001}
          />

          {/* Fill — cool side */}
          <spotLight
            position={[-5, 5, -3]}
            angle={0.5}
            penumbra={0.8}
            intensity={1.8}
            color="#2244aa"
          />

          {/* Accent — red rim */}
          <spotLight
            position={[5, 3, -4]}
            angle={0.6}
            penumbra={1.0}
            intensity={1.4}
            color="#ff2244"
          />

          {/* Ground bounce */}
          <pointLight position={[0, 0.1, 0]} intensity={0.4} color="#001133" distance={8} />

          {/* Front accent */}
          <spotLight
            position={[0, 4, 6]}
            angle={0.5}
            penumbra={0.7}
            intensity={1.2}
            color="#66aaff"
          />

          {/* Rear accent */}
          <pointLight position={[0, 2, -6]} intensity={0.9} color="#ff1133" distance={10} />
        </>
      ) : (
        <>
          {/* Day: bright studio look */}
          <ambientLight intensity={0.35} color="#ffffff" />

          {/* Key — overhead directional */}
          <directionalLight
            position={[5, 10, 5]}
            intensity={2.5}
            color="#fff8f0"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
            shadow-bias={-0.001}
          />

          {/* Fill — left soft */}
          <directionalLight position={[-5, 5, -3]} intensity={0.9} color="#e8f0ff" />

          {/* Rim — rear highlight */}
          <directionalLight position={[0, 3, -8]} intensity={0.7} color="#fffae8" />

          {/* Ceiling strip lights */}
          <pointLight position={[-4, 6, 2]} intensity={0.6} color="#ffffff" distance={12} />
          <pointLight position={[4, 6, 2]} intensity={0.6} color="#ffffff" distance={12} />
          <pointLight position={[0, 6, -4]} intensity={0.5} color="#ffffff" distance={12} />

          {/* Ground fill */}
          <pointLight position={[0, 0.2, 0]} intensity={0.2} color="#f0f4ff" distance={6} />
        </>
      )}
    </>
  )
}
