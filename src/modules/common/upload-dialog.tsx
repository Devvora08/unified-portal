"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PDFUploadWidget } from "./pdf-uploader";
import { useMutation } from "@tanstack/react-query";
import { CreateProject } from "../../../actions/create-project";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ShareProjectDialog({
  studentId,
  guideId,
  open,
  onOpenChange,
}: {
  studentId: string;
  guideId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [projectName, setProjectName] = useState("");
  const [projectLink, setProjectLink] = useState("");

  const mutation = useMutation({
    mutationFn: () => CreateProject(studentId, guideId, projectName, projectLink),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Project shared successfully!");
      } else {
        toast.error(res.message || "Project already exists or something went wrong.");
      }
    },
    onError: (error) => {
      console.error("CreateProject failed:", error);
      toast.error("Something went wrong while creating the project.");
    },
  });

  const handleSubmit = () => {
    if (!projectName || !projectLink) {
      toast.error("Please fill out both fields.");
      return;
    }

    mutation.mutate(); // Triggers the action
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Share Your Project</DialogTitle>
          <DialogDescription>
            Upload your project files and send them to this guide for review.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Name input */}
          <div className="space-y-1">
            <label htmlFor="project-name" className="text-sm font-medium text-gray-700">
              Project Name
            </label>
            <Input
              id="project-name"
              placeholder="e.g. Smart Campus Tracker"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          {/* Link input */}
          <div className="space-y-1">
            <label htmlFor="project-link" className="text-sm font-medium text-gray-700">
              GitHub or Deployed Link
            </label>
            <Input
              id="project-link"
              placeholder="https://github.com/your-repo or live demo URL"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              type="url"
            />
          </div>

          {/* Submit */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              "Submit Name And Link"
            )}
          </Button>

          <p className="text-gray-700 text-muted-foreground">Add the name and link first, then upload the PDF</p>

          {/* Upload */}
          <PDFUploadWidget />
        </div>
      </DialogContent>
    </Dialog>
  );
}
