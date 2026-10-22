import { lazy, Suspense, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteFooter } from './components/layout/SiteFooter.tsx'
import { SiteHeader } from './components/layout/SiteHeader.tsx'
import LandingPage from './pages/LandingPage.tsx'
import { initSmoothScroll, destroySmoothScroll, scrollToTarget, scrollToTop } from './lib/smooth-scroll.ts'

const DemoPage = lazy(() => import('./pages/DemoPage.tsx'))

function Shell() {
  const location = useLocation()

  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash
      const frame = requestAnimationFrame(() => scrollToTarget(hash))
      return () => cancelAnimationFrame(frame)
    }
    scrollToTop()
    return undefined
  }, [location.pathname, location.hash])

  return (
    <>
      <SiteHeader />
      <Suspense fallback={<div className="min-h-svh bg-bg" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <SiteFooter />
      </Suspense>
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </MotionConfig>
  )
}
