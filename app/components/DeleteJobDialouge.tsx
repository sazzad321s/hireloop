"use client"
import { Trash, Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Job } from "@/types/job"
import { deleteJob } from "@/lib/actions/jobs"
import { useState } from "react"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

export function DeleteJobDialog({ job }: { job: Job }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const res = await deleteJob(job._id)
    console.log(`Deleting job with ID:`, job._id, res)
    if (res.deletedCount) {
      setOpen(false)
      toast.add({
        title: "Job Deleted",
        description: "The job has been deleted permanently.",
      })
      router.refresh()
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            aria-label={`Delete ${job.title}`}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon-sm",
              }),
              "text-muted-foreground hover:text-red-400"
            )}
          >
            <Trash className="size-4" />
          </button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this job posting. View{" "}
            <a href="#">Settings</a> to delete any memories saved during this
            job posting.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
