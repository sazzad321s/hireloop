"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleCheck,
  Globe,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { createJob } from "@/lib/actions/jobs"
import {
  DEFAULT_JOB_APPLICANTS,
  DEFAULT_JOB_STATUS,
  FREQUENCIES,
  JOB_CATEGORIES,
  JOB_TYPES,
  type Frequency,
  type JobCategory,
  type JobFormData,
  type JobType,
} from "@/types/job"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

const fieldClassName = "h-11"

const iconFieldClassName = "h-11 pl-9"

const ctaClassName =
  "bg-violet-500 text-white hover:bg-violet-400 focus-visible:ring-violet-400/50"

function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-xs font-medium text-muted-foreground">
        {index}
      </span>
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
    </div>
  )
}

export default function NewJobPage() {
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const value = (key: string) => String(formData.get(key) ?? "").trim()

    const job: JobFormData = {
      title: value("title"),
      company: value("company"),
      category: value("category") as JobCategory,
      jobType: value("jobType") as JobType,
      remoteAllowed: formData.get("remoteAllowed") === "on",
      location: value("location"),
      deadline: value("deadline"),
      minSalary: Number(value("minSalary") || 0),
      maxSalary: Number(value("maxSalary") || 0),
      frequency: value("frequency") as Frequency,
      responsibilities: value("responsibilities"),
      qualifications: value("qualifications"),
      status: DEFAULT_JOB_STATUS,
      applicants: DEFAULT_JOB_APPLICANTS,
    }

    
    const result = await createJob(job)
    if(result.insertedId){
      toast.add({
        title: "Job Created",
        description: "The job listing has been successfully created."
      })
      router.push(`/dashboard/recruiter/jobs`);
    }

    setSubmitted(true)
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit}>
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Link
                href="/dashboard/recruiter/jobs"
                className="transition-colors hover:text-foreground"
              >
                Manage Jobs
              </Link>
              <ChevronRight className="size-3.5" />
              <span>Create New Listing</span>
            </nav>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Post a New Job
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Fill in the position specifics to attract qualified talent across
              our network.
            </p>
          </div>
        </header>

        {submitted && (
          <div
            role="status"
            className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400"
          >
            <CircleCheck className="size-4 shrink-0" />
            Job data collected. Open the console to view the payload.
          </div>
        )}

        <div className="space-y-8 pt-8">
          {/* 1. Basic Information */}
          <section className="space-y-5 border-b border-border pb-8">
            <SectionHeading index={1} title="Basic Information" />

            <Field>
              <FieldLabel htmlFor="title">
                Job Title <span className="text-violet-400">*</span>
              </FieldLabel>
              <Input
                id="title"
                name="title"
                required
                placeholder="Frontend Developer"
                className={fieldClassName}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="company">
                  Company Name <span className="text-violet-400">*</span>
                </FieldLabel>
                <Input
                  id="company"
                  name="company"
                  required
                  placeholder="HireHub Network"
                  className={fieldClassName}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="category">
                  Job Category <span className="text-violet-400">*</span>
                </FieldLabel>
                <Select name="category" required>
                  <SelectTrigger id="category" className="h-11! w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <FieldSet>
              <FieldLegend variant="label">
                Job Type <span className="text-violet-400">*</span>
              </FieldLegend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {JOB_TYPES.map((type, index) => (
                  <label
                    key={type}
                    className={cn(
                      "flex h-11 cursor-pointer items-center justify-center rounded-lg border border-border text-sm text-muted-foreground transition-colors select-none",
                      "hover:bg-muted/50 hover:text-foreground",
                      "has-checked:border-violet-400 has-checked:bg-violet-500/10 has-checked:text-foreground",
                      "has-focus-visible:ring-3 has-focus-visible:ring-violet-400/40"
                    )}
                  >
                    <input
                      type="radio"
                      name="jobType"
                      value={type}
                      required
                      defaultChecked={index === 0}
                      className="sr-only"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </FieldSet>
          </section>

          {/* 2. Location, Compensation & Timeline */}
          <section className="space-y-5 border-b border-border pb-8">
            <SectionHeading
              index={2}
              title="Location, Compensation & Timeline"
            />

            <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-400">
                <Globe className="size-4" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium">
                  Remote Work Allowed{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (optional)
                  </span>
                </span>
                <span className="block text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </span>
              </span>
              <Switch
                name="remoteAllowed"
                aria-label="Remote work allowed"
                className="data-checked:bg-violet-500"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="location">
                  Job Location <span className="text-violet-400">*</span>
                </FieldLabel>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    required
                    placeholder="New York, USA"
                    className={iconFieldClassName}
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="deadline">
                  Application Deadline{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    className={iconFieldClassName}
                  />
                </div>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="minSalary">Min Salary / Rate</FieldLabel>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                    €
                  </span>
                  <Input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    min={0}
                    placeholder="25"
                    className={iconFieldClassName}
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="maxSalary">Max Salary / Rate</FieldLabel>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                    €
                  </span>
                  <Input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    min={0}
                    placeholder="40"
                    className={iconFieldClassName}
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
                <Select name="frequency" defaultValue="per hour">
                  <SelectTrigger id="frequency" className="h-11! w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCIES.map((frequency) => (
                      <SelectItem key={frequency} value={frequency}>
                        {frequency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </section>

          {/* 3. Responsibilities & Requirements */}
          <section className="space-y-5">
            <SectionHeading index={3} title="Responsibilities & Requirements" />

            <Field>
              <FieldLabel htmlFor="responsibilities">
                Key Responsibilities <span className="text-violet-400">*</span>
              </FieldLabel>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                required
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                className="min-h-28"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="qualifications">
                Qualifications & Requirements{" "}
                <span className="text-violet-400">*</span>
              </FieldLabel>
              <Textarea
                id="qualifications"
                name="qualifications"
                required
                placeholder={
                  "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
                }
                className="min-h-28"
              />
            </Field>
          </section>
          <section>
            <Button
              type="submit"
              className={cn(ctaClassName, "h-10 rounded-xl px-4")}
            >
              Publish Job
              <ArrowRight className="size-4" />
            </Button>
          </section>
        </div>
      </form>
    </div>
  )
}
