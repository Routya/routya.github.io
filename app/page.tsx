import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { Performance } from '@/components/performance'
import { Documentation } from '@/components/documentation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Performance />
      <Documentation />
      <Footer />
    </div>
  )
}
