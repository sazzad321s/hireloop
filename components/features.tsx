import {
  Bookmark,
  Building2,
  CircleDashed,
  FileText,
  LineChart,
  MousePointerClick,
  Search,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

const features: Feature[] = [
  {
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: Search,
  },
  {
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: LineChart,
  },
  {
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    icon: Building2,
  },
  {
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    icon: Bookmark,
  },
  {
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process",
    icon: MousePointerClick,
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: FileText,
  },
  {
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: CircleDashed,
  },
  {
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: TrendingUp,
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="relative isolate overflow-hidden bg-[#0d080b] py-20 text-white sm:py-24"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_50%_70%_at_50%_0%,rgba(124,58,237,0.12),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center justify-center gap-3">
          <span aria-hidden className="size-1 rounded-full bg-violet-500" />
          <span className="text-[11px] font-medium tracking-[0.28em] text-white/70 uppercase">
            Features Job
          </span>
          <span aria-hidden className="size-1 rounded-full bg-violet-500" />
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-[1.1]">
          Everything you need
          <br className="hidden sm:block" /> to succeed
        </h2>

        {/* Feature grid */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <Icon className="size-5 text-white/85" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 pt-0.5">
                <h3 className="text-[15px] leading-tight font-medium text-white">
                  {title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/45">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
