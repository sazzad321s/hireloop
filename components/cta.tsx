import Image from "next/image"
import Link from "next/link"

import ctaBg from "@/app/images/cta-bg.png"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CallToAction() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b0609] text-white">
      {/* Violet glow behind the arch */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(ellipse_55%_65%_at_50%_-15%,rgba(122,82,255,0.62),rgba(76,42,180,0.2)_45%,transparent_75%)]"
      />

      {/* Arch grid */}
      <Image
        src={ctaBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 w-full max-w-none scale-y-105 mask-[linear-gradient(to_bottom,black_0%,black_55%,transparent_95%)] opacity-80 mix-blend-screen select-none"
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 pt-32 pb-36 text-center sm:px-6 sm:pt-44 sm:pb-32">
        <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.08]">
          Your next role is
          <br className="hidden sm:block" /> already looking for you
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-pretty text-white/55 sm:text-lg">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants(),
              "h-11 w-full rounded-xl bg-white px-5 text-sm font-medium text-black hover:bg-white/90 focus-visible:ring-white/40 sm:w-auto"
            )}
          >
            Create a free account
          </Link>
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 w-full rounded-xl border-white/15 bg-white/[0.04] px-5 text-sm text-white hover:bg-white/10 hover:text-white focus-visible:ring-white/20 sm:w-auto"
            )}
          >
            View pricing
          </Link>
        </div>
      </div>

      {/* Fade into the footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#070405]"
      />
    </section>
  )
}
