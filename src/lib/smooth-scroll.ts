import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const HEADER_OFFSET = 84

let lenis: Lenis | null = null

function onTick(time: number) {
  lenis?.raf(time * 1000)
}

function refreshTriggers() {
  ScrollTrigger.refresh()
}

export function getLenis() {
  return lenis
}

/** Lenis drives native scroll. GSAP's ticker is the only rAF loop. */
export function initSmoothScroll() {
  if (lenis) return lenis

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  lenis = new Lenis({
    autoRaf: false,
    lerp: reduce ? 1 : 0.1,
    smoothWheel: !reduce,
    anchors: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add(onTick)
  gsap.ticker.lagSmoothing(0)

  if (document.readyState === 'complete') refreshTriggers()
  else window.addEventListener('load', refreshTriggers, { once: true })
  void document.fonts?.ready.then(refreshTriggers)

  return lenis
}

export function destroySmoothScroll() {
  if (!lenis) return
  window.removeEventListener('load', refreshTriggers)
  gsap.ticker.remove(onTick)
  lenis.destroy()
  lenis = null
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true })
    return
  }
  window.scrollTo(0, 0)
}

export function scrollToTarget(target: string | Element | number) {
  if (lenis) {
    lenis.scrollTo(target, {
      offset: typeof target === 'number' ? 0 : -HEADER_OFFSET,
      duration: 1.05,
    })
    return
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }

  const node = typeof target === 'string' ? document.querySelector(target) : target
  node?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
