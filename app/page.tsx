import { CallToAction } from "@/components/cta"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"

export default function Page() {
  return (
    <div className="min-h-svh bg-[#0d080b]">
      <Navbar />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  )
}
