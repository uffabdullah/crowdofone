import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const vertexShader = `
uniform float uTime;
attribute float aPhase;
attribute float aRandom;
varying float vGlow;
varying float vFade;

void main() {
  float wave = sin(uTime * 0.72 - position.x * 0.7 + aPhase);
  float crossWave = sin(uTime * 0.33 - position.y * 0.48 + aPhase * 1.7);
  float pulse = smoothstep(0.02, 1.0, wave * 0.74 + crossWave * 0.26);
  vec3 pos = position;
  pos.z += pulse * 0.38;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vGlow = pulse;
  vFade = smoothstep(-5.6, 0.2, position.x);
  float size = (1.35 + aRandom * 1.05 + pulse * 2.8) * (42.0 / max(1.0, -mvPosition.z));
  gl_PointSize = clamp(size, 1.7, 14.0);
}
`

const fragmentShader = `
varying float vGlow;
varying float vFade;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) discard;
  float falloff = smoothstep(0.5, 0.04, dist);
  vec3 dim = vec3(0.42, 0.48, 0.34);
  vec3 lit = vec3(0.463, 0.725, 0.0);
  vec3 color = mix(dim, lit, vGlow);
  float alpha = falloff * mix(0.42, 1.0, vGlow) * mix(0.5, 1.0, vFade);
  gl_FragColor = vec4(color, alpha);
}
`

function buildGeometry(width: number) {
  const mobile = width < 768
  const cols = mobile ? 30 : 50
  const rows = mobile ? 22 : 30
  const count = cols * rows
  const positions = new Float32Array(count * 3)
  const phases = new Float32Array(count)
  const randoms = new Float32Array(count)

  let index = 0
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const px = (x / (cols - 1) - 0.46) * 12.8
      const py = (y / (rows - 1) - 0.5) * 7.1
      positions[index * 3] = px + (Math.random() - 0.5) * 0.22
      positions[index * 3 + 1] = py + (Math.random() - 0.5) * 0.2
      positions[index * 3 + 2] = (Math.random() - 0.5) * 1.8
      phases[index] = Math.random() * Math.PI * 2
      randoms[index] = Math.random()
      index += 1
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
  return geometry
}

export function PersonaField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const geometry = buildGeometry(window.innerWidth)
    const material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: reduce ? 1.6 : 0 } },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })
    const points = new THREE.Points(geometry, material)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40)
    const cameraZ = { current: 6.7 }
    camera.position.set(0, 0.12, cameraZ.current)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
      })
    } catch {
      geometry.dispose()
      material.dispose()
      return
    }

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    scene.add(points)

    const parent = canvas.parentElement
    const resize = () => {
      const host = parent ?? canvas
      const width = host.clientWidth
      const height = host.clientHeight
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }
    resize()

    const resizeObserver = new ResizeObserver(resize)
    if (parent) resizeObserver.observe(parent)

    let visible = true
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
    })
    if (parent) intersection.observe(parent)

    const section = canvas.closest('section')
    const trigger =
      section && !reduce
        ? ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              cameraZ.current = 6.7 - self.progress * 1.15
            },
          })
        : null

    const started = performance.now()
    let frame = 0
    const render = () => {
      const elapsed = reduce ? 1.6 : (performance.now() - started) / 1000
      material.uniforms.uTime.value = elapsed
      points.rotation.y = reduce ? 0.08 : Math.sin(elapsed * 0.12) * 0.08
      camera.position.z = cameraZ.current
      camera.position.y = 0.12 + (reduce ? 0 : Math.sin(elapsed * 0.2) * 0.04)
      camera.lookAt(0.35, 0, 0)
      if (visible) renderer.render(scene, camera)
      if (!reduce) frame = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(frame)
      trigger?.kill()
      resizeObserver.disconnect()
      intersection.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
