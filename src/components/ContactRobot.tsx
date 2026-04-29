import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Preload } from '@react-three/drei'
import { Bot } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Group } from 'three'
import { MathUtils } from 'three'
import { useReducedMotion } from 'motion/react'

type GreetingRobotProps = {
  reducedMotion: boolean
}

function GreetingRobot({ reducedMotion }: GreetingRobotProps) {
  const robotRef = useRef<Group>(null)
  const waveArmRef = useRef<Group>(null)
  const { pointer } = useThree()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!robotRef.current || reducedMotion) {
      return
    }

    const elapsed = clock.getElapsedTime()
    robotRef.current.rotation.y = MathUtils.lerp(robotRef.current.rotation.y, pointer.x * 0.24, 0.07)
    robotRef.current.rotation.x = MathUtils.lerp(robotRef.current.rotation.x, -pointer.y * 0.08, 0.06)
    robotRef.current.position.y = Math.sin(elapsed * 1.55) * 0.055
    robotRef.current.scale.setScalar(MathUtils.lerp(robotRef.current.scale.x, hovered ? 1.035 : 1, 0.08))

    if (waveArmRef.current) {
      waveArmRef.current.rotation.z = -0.78 + Math.sin(elapsed * 2.65) * 0.24
      waveArmRef.current.rotation.x = Math.sin(elapsed * 1.75) * 0.08
    }
  })

  const eyeColor = hovered ? '#80ff57' : '#ff3aa7'

  return (
    <group
      ref={robotRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      position={[0, -0.16, 0]}
    >
      <mesh position={[0, -1.08, 0]}>
        <cylinderGeometry args={[1.36, 1.58, 0.18, 48]} />
        <meshStandardMaterial color="#18151b" roughness={0.78} metalness={0.08} />
      </mesh>

      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[1.22, 1.32, 0.68]} />
        <meshStandardMaterial color="#f8f4ea" roughness={0.48} metalness={0.18} />
      </mesh>

      <mesh position={[0, 0.78, 0]}>
        <boxGeometry args={[1.46, 0.96, 0.78]} />
        <meshStandardMaterial color="#151318" roughness={0.42} metalness={0.28} />
      </mesh>

      <mesh position={[-0.4, 0.84, 0.42]}>
        <boxGeometry args={[0.22, 0.14, 0.05]} />
        <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0.4, 0.84, 0.42]}>
        <boxGeometry args={[0.22, 0.14, 0.05]} />
        <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={1.8} />
      </mesh>

      <mesh position={[0, 0.48, 0.42]}>
        <boxGeometry args={[0.5, 0.07, 0.05]} />
        <meshStandardMaterial color="#80ff57" emissive="#80ff57" emissiveIntensity={0.75} />
      </mesh>

      <group position={[-0.86, 0.05, 0]} rotation={[0, 0, 0.3]}>
        <mesh position={[-0.04, -0.4, 0]}>
          <boxGeometry args={[0.23, 0.82, 0.23]} />
          <meshStandardMaterial color="#ff3aa7" roughness={0.52} metalness={0.12} />
        </mesh>
        <mesh position={[-0.04, -0.84, 0]}>
          <sphereGeometry args={[0.16, 20, 16]} />
          <meshStandardMaterial color="#151318" roughness={0.45} metalness={0.18} />
        </mesh>
      </group>

      <group ref={waveArmRef} position={[0.86, 0.2, 0]} rotation={[0, 0, -0.78]}>
        <mesh position={[0.12, -0.38, 0]}>
          <boxGeometry args={[0.23, 0.82, 0.23]} />
          <meshStandardMaterial color="#80ff57" roughness={0.52} metalness={0.12} />
        </mesh>
        <mesh position={[0.16, -0.82, 0]}>
          <sphereGeometry args={[0.16, 20, 16]} />
          <meshStandardMaterial color="#151318" roughness={0.45} metalness={0.18} />
        </mesh>
      </group>

      <mesh position={[-0.32, -1.05, 0]}>
        <boxGeometry args={[0.28, 0.52, 0.28]} />
        <meshStandardMaterial color="#151318" roughness={0.45} metalness={0.18} />
      </mesh>
      <mesh position={[0.32, -1.05, 0]}>
        <boxGeometry args={[0.28, 0.52, 0.28]} />
        <meshStandardMaterial color="#151318" roughness={0.45} metalness={0.18} />
      </mesh>

      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.36, 12]} />
        <meshStandardMaterial color="#80ff57" emissive="#80ff57" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, 1.66, 0]}>
        <octahedronGeometry args={[0.11]} />
        <meshStandardMaterial color="#ff3aa7" emissive="#ff3aa7" emissiveIntensity={1.05} />
      </mesh>
    </group>
  )
}

function RobotFallback() {
  return (
    <div className="contact-robot-static">
      <Bot aria-hidden="true" className="size-10 text-[var(--pink)]" />
      <span>hello</span>
    </div>
  )
}

function supportsWebGL() {
  try {
    if (typeof window === 'undefined') {
      return false
    }

    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    )
  } catch {
    return false
  }
}

function ContactRobot() {
  const prefersReducedMotion = useReducedMotion()
  const [webGLReady] = useState(() => supportsWebGL())

  return (
    <div className="contact-robot-stage" aria-label="Friendly 3D robot greeting contact visitors">
      <div className="contact-robot-bubble" aria-hidden="true">
        hello
      </div>
      {webGLReady ? (
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: true,
          }}
          fallback={<RobotFallback />}
          frameloop={prefersReducedMotion ? 'demand' : 'always'}
        >
          <PerspectiveCamera makeDefault position={[0, 0.85, 5.1]} fov={41} />
          <ambientLight intensity={0.85} />
          <spotLight position={[-3, 4.8, 4]} angle={0.42} penumbra={0.8} intensity={1.5} />
          <pointLight position={[3, 1.5, 2]} color="#ff3aa7" intensity={1.45} />
          <pointLight position={[-3, 0.6, 2]} color="#80ff57" intensity={1.05} />
          <GreetingRobot reducedMotion={Boolean(prefersReducedMotion)} />
          <mesh position={[0, -1.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.65, 48]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.14} />
          </mesh>
          <Preload all />
        </Canvas>
      ) : (
        <RobotFallback />
      )}
    </div>
  )
}

export default ContactRobot
