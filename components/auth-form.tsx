"use client"

import * as React from "react"
import type { SVGProps } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

type AuthMode = "sign-in" | "sign-up"

const content = {
  "sign-in": {
    title: "Welcome back",
    subtitle: "Sign in to continue your job search.",
    submit: "Sign in",
    footerText: "Don't have an account?",
    footerLink: "Sign up",
    footerHref: "/sign-up",
  },
  "sign-up": {
    title: "Create your account",
    subtitle: "Join HireLoop and land your dream job faster.",
    submit: "Create account",
    footerText: "Already have an account?",
    footerLink: "Sign in",
    footerHref: "/sign-in",
  },
} as const

const MIN_PASSWORD_LENGTH = 8
const DEFAULT_ERROR = "Something went wrong. Please try again."

const fieldClassName =
  "h-10 border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:border-violet-400 focus-visible:ring-violet-400/30"

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12.02 12.02 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  )
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const c = content[mode]
  const router = useRouter()

  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState<"email" | "google" | null>(null)
  const isPending = pending !== null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const name = String(formData.get("name") ?? "").trim()

    if (mode === "sign-up" && !name) {
      setError("Please enter your full name.")
      return
    }
    if (!email) {
      setError("Please enter your email address.")
      return
    }
    if (!password) {
      setError("Please enter your password.")
      return
    }
    if (mode === "sign-up" && password.length < MIN_PASSWORD_LENGTH) {
      setError(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      )
      return
    }

    setPending("email")

    try {
      const { error: authError, data:userdata } =
        mode === "sign-in"
          ? await authClient.signIn.email({
              email,
              password,
              callbackURL: "/",
            })
          : await authClient.signUp.email({
              name,
              email,
              password,
              callbackURL: "/",
            })
       console.log(userdata)
      if (authError) {
        setError(authError.message ?? DEFAULT_ERROR)
        setPending(null)
        return
      }

      router.push("/")
      router.refresh()
    } catch {
      setError("We couldn't reach the server. Please try again.")
      setPending(null)
    }
  }

  async function handleGoogleSignIn() {
    setError(null)
    setPending("google")

    try {
      const { error: authError } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })

      if (authError) {
        setError(authError.message ?? DEFAULT_ERROR)
        setPending(null)
      }
    } catch {
      setError("We couldn't reach the server. Please try again.")
      setPending(null)
    }
  }

  return (
    <main className="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-[#0d080b] px-4 py-16 text-white">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-112 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(124,58,237,0.22),transparent_70%)]"
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-md sm:p-8">
          <h1 className="text-center text-2xl font-semibold tracking-tight">
            {c.title}
          </h1>
          <p className="mt-2 text-center text-sm text-white/60">{c.subtitle}</p>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isPending}
            className="mt-6 h-10 w-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {pending === "google" ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <GoogleIcon className="size-4" />
            )}
            Continue with Google
          </Button>

          <div className="my-6 flex items-center gap-3">
            <span aria-hidden className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/40">
              or continue with email
            </span>
            <span aria-hidden className="h-px flex-1 bg-white/10" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            {mode === "sign-up" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">
                  Full name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  required
                  className={fieldClassName}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={fieldClassName}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                {mode === "sign-in" && (
                  <Link
                    href="#"
                    className="text-xs font-medium text-violet-400 hover:text-violet-300"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete={
                  mode === "sign-in" ? "current-password" : "new-password"
                }
                required
                minLength={mode === "sign-up" ? MIN_PASSWORD_LENGTH : undefined}
                aria-describedby={
                  mode === "sign-up" ? "password-hint" : undefined
                }
                className={fieldClassName}
              />
              {mode === "sign-up" && (
                <p id="password-hint" className="text-xs text-white/40">
                  At least {MIN_PASSWORD_LENGTH} characters.
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="h-10 w-full bg-violet-500 text-white hover:bg-violet-400 focus-visible:ring-violet-400/50"
            >
              {pending === "email" && (
                <LoaderCircle className="size-4 animate-spin" />
              )}
              {pending === "email" ? "Please wait…" : c.submit}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            {c.footerText}{" "}
            <Link
              href={c.footerHref}
              className="font-medium text-violet-400 hover:text-violet-300"
            >
              {c.footerLink}
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          By continuing, you agree to HireLoop&apos;s Terms of Service and
          Privacy Policy.
        </p>
      </div>
    </main>
  )
}
