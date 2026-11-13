"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import logo from "@/app/images/logo.png"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useSession } from "@/lib/auth-client"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

const ctaClassName =
  "bg-violet-500 text-white hover:bg-violet-400 focus-visible:ring-violet-400/50"

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const {data: session} = useSession();
  console.log("Session in Navbar:", session);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-neutral-950/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Image src={logo} alt="HireLoop" priority className="h-8 w-auto" />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            {
              session ? (
                <span className="text-sm text-white/70">
                  Hi, {session.user?.name}
                </span>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "text-white hover:bg-white/10 hover:text-white"
                    )}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className={cn(buttonVariants(), ctaClassName)}
                  >
                    Get Started
                  </Link>
                </>
              )
            }
          </div>
        </div>

        {/* Mobile navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="text-white hover:bg-white/10 hover:text-white md:hidden"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-72 border-l border-white/10 bg-neutral-950 text-white sm:max-w-xs"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation
              </SheetDescription>
              <Link href="/" onClick={() => setOpen(false)}>
                <Image src={logo} alt="HireLoop" className="h-7 w-auto" />
              </Link>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-2 border-t border-white/10 p-4">
              {
                session ? (
                  <span
                    className="rounded-md px-2 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Hi, {session.user?.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "text-white hover:bg-white/10 hover:text-white"
                      )}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants(), ctaClassName)}
                    >
                      Get Started
                    </Link>
                  </>
                )
              }
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
