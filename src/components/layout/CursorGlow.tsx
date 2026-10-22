import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) {
      glow.style.display = 'none'
      return
    }

    let frame = 0
    let x = window.innerWidth * 0.7
    let y = window.innerHeight * 0.35
    let tx = x
    let ty = y

    const onMove = (event: PointerEvent) => {
      tx = event.clientX
      ty = event.clientY
    }

    const loop = () => {
      x += (tx - x) * 0.14
      y += (ty - y) * 0.14
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove)
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[45] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(118,185,0,0.22),transparent_68%)] mix-blend-screen"
    />
  )
}
