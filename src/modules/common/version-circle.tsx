"use client"

import React, { useState } from 'react'
import { ProjectVersion } from '@/generated/prisma'
import { Check, FileChartColumnIncreasingIcon, LoaderIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { SubmitFeedback } from '../../../actions/submit-feedback'
import { toast } from 'sonner'
import { AcceptVersion, RejectVersion } from '../../../actions/accept-reject'
import { useRouter } from 'next/navigation'

interface VersionCircleProps {
  version: ProjectVersion
  role: string
}

function VersionCircle({ role, version }: VersionCircleProps) {
  const [comment, setComment] = useState("")
  const router = useRouter()

  const { mutate: submitFeedback, isPending } = useMutation({
    mutationFn: async ({ versionId, feedback }: { versionId: string; feedback: string }) => {
      return await SubmitFeedback(versionId, feedback)
    },
    onSuccess: () => {
      toast.success("Feedback submitted!");
      setComment("");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to submit feedback.");
    },
  });

  const { mutate: acceptVersion } = useMutation({
    mutationFn: () => AcceptVersion(version.id),
    onSuccess: () => {
      toast.success("Version accepted")
      router.refresh()
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: rejectVersion } = useMutation({
    mutationFn: async () => {
      return await RejectVersion(version.id); // Replace with actual ID from props/state
    },
    onSuccess: () => {
      toast.success("Version rejected successfully.");
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong while rejecting.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback({ versionId: version.id, feedback: comment });
  }

  const handleApprove = () => {
    acceptVersion()
  }

  const handleReject = () => {
    rejectVersion(); // Your useMutation trigger
  }

  return (
    <div className="version-circle-wrapper">
      <div className="circle">
        <a
          href={version.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="download-icon-link"
        >
          <FileChartColumnIncreasingIcon className="download-icon" />
        </a>

        {/* Text Group */}
        <div className="text-group">
          <p className="filename">{version.name}</p>
          {version.link && <p className="link">{version.link}</p>}
          <div className="flex items-center gap-2 text-sm font-medium text-[#92400e]">
            <span>Status: {version.status}</span>

            {role === "GUIDE" && (
              <div className="flex gap-2 ml-2">
                <Button
                  size="icon"
                  className="rounded-full w-8 h-8 text-xs"
                  variant="default"
                  disabled={version.status !== "PENDING" || isPending}
                  onClick={handleApprove}
                >
                  {isPending ? <LoaderIcon /> : <Check />}
                </Button>


                <Button
                  size="icon"
                  className="rounded-full w-8 h-8 text-xs"
                  variant="default"
                  disabled={version.status !== "PENDING"}
                  onClick={handleReject}
                >
                  <X />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Form only for guide */}
        {role === "GUIDE" && (
          <form onSubmit={handleSubmit} className="w-[85%] max-w-[260px] flex flex-col gap-2 mt-2">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter feedback..."
              className="resize-none h-20 rounded-md border border-amber-200 p-2 text-sm font-medium"
            />
            <Button className="w-1/2 self-center" type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        )}
      </div>


      {/* 🔽 Vertical Connector Line */}
      <div className="connector-line" />

      <style jsx>{`
      .version-circle-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .circle {
        width: 340px;
        height: 340px;
        border-radius: 50%;
        background-color: #fef3c7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 1.5rem;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
        overflow: hidden;
      }

      .circle:hover {
        background-color: #fde68a;
      }

      .download-icon-link {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.75rem;
      }

      .download-icon {
        width: 64px;
        height: 64px;
        color: #d97706;
      }

      .text-group {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-bottom: 0.5rem;
      }

      .filename {
        font-size: 1.05rem;
        font-weight: 600;
        color: #b45309;
        word-break: break-word;
      }

      .link {
        font-size: 0.9rem;
        color: #b45309;
        text-decoration: underline;
        word-break: break-word;
      }

      .status {
        font-size: 0.85rem;
        color: #92400e;
        font-weight: 500;
      }

      .connector-line {
        width: 4px;
        height: 35vh;
        background-color: black;
        border-radius: 2px;
      }
    `}</style>
    </div>
  )

}

export default VersionCircle
