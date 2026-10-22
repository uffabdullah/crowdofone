import { Features } from '../components/landing/Features.tsx'
import { FinalCta } from '../components/landing/FinalCta.tsx'
import { Hero } from '../components/landing/Hero.tsx'
import { HowItWorks } from '../components/landing/HowItWorks.tsx'
import { Limits } from '../components/landing/Limits.tsx'
import { Problem } from '../components/landing/Problem.tsx'
import { Speed } from '../components/landing/Speed.tsx'

export default function LandingPage() {
  return (
    <main id="content">
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Speed />
      <Limits />
      <FinalCta />
    </main>
  )
}
