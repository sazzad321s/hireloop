import Image from "next/image"
import {
  Briefcase,
  Building2,
  MapPin,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react"

import globe from "@/app/images/globe.png"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

const stats = [
  { value: "50K", label: "Active Jobs", icon: Briefcase },
  { value: "12K", label: "Companies", icon: Building2 },
  { value: "2M", label: "Job Seekers", icon: Users },
  { value: "97%", label: "Satisfaction Rate", icon: Star },
]

const ctaClassName =
  "bg-violet-500 text-white hover:bg-violet-400 focus-visible:ring-violet-400/50"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0d080b] text-white">
      {/* Ambient violet glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-128 bg-[radial-gradient(ellipse_60%_55%_at_50%_15%,rgba(124,58,237,0.25),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center ">
          <div className="inline-flex items-center gap-2 rounded-full border border-t-white border-x-white bg-black px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur">
            <span className="flex size-4 items-center justify-center rounded-lg bg-black">
              <Sparkles className="size-3 text-white" />
            </span>
            <span className="text-white">50,000+</span>
            <span className="text-white uppercase">New jobs this month</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="mx-auto mt-6 max-w-3xl text-center text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-center text-base text-pretty text-white/70 sm:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search */}
        <form
          className="mx-auto mt-9 flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-white/10 bg-neutral-950/70 p-2 backdrop-blur-md sm:flex-row sm:items-center"
          role="search"
        >
          <div className="flex flex-1 items-center gap-2 px-3">
            <Search className="size-4 shrink-0 text-white/50" />
            <input
              type="text"
              name="query"
              placeholder="Job title, skill or company"
              className="h-11 w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>
          <span
            aria-hidden
            className="hidden h-6 w-px shrink-0 bg-white/10 sm:block"
          />
          <div className="flex flex-1 items-center gap-2 px-3">
            <MapPin className="size-4 shrink-0 text-white/50" />
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              className="h-11 w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            aria-label="Search jobs"
            className={cn(ctaClassName, "h-11 w-full shrink-0 rounded-xl sm:w-11")}
          >
            <Search className="size-5" />
          </Button>
        </form>

        {/* Trending */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs">
          <span className="text-white/50">Trending Position</span>
          {trending.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Globe, caption, stats */}
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Image
          src={globe}
          alt=""
          aria-hidden
          priority
          className="pointer-events-none absolute top-0 left-1/2 w-175 max-w-none -translate-x-1/2 translate-y-[-42%] [mask-intersect] mask-[linear-gradient(to_bottom,transparent_0%,transparent_18%,black_34%),radial-gradient(ellipse_at_center,black_45%,transparent_78%)] opacity-90 mix-blend-screen sm:w-225 lg:w-262.5"
        />
        <p className="relative mx-auto max-w-2xl pt-6 pb-12 text-center text-xl font-medium text-balance text-white/90 sm:text-2xl">
          Assisting over 15,000 job seekers find their dream positions.
        </p>

        <div className="relative grid grid-cols-2 gap-4 pb-12 lg:grid-cols-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/0.04 p-6 backdrop-blur-sm"
            >
              <Icon className="size-5 text-white/70" />
              <div className="mt-4 text-3xl font-semibold tracking-tight">
                {value}
              </div>
              <div className="mt-1 text-sm text-white/60">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
