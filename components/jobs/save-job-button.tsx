"use client"

import { useState } from "react"
import { Bookmark } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SaveJobButton({ title }: { title: string }) {
  const [saved, setSaved] = useState(false)

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={saved ? `Unsave ${title}` : `Save ${title}`}
      aria-pressed={saved}
      title={saved ? "Unsave job" : "Save job"}
      onClick={() => setSaved((previous) => !previous)}
      className="size-11 border border-white/5 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white focus-visible:ring-violet-400/50"
    >
      <Bookmark
        aria-hidden="true"
        className={cn("size-4", saved && "fill-current text-violet-400")}
      />
    </Button>
  )
}
