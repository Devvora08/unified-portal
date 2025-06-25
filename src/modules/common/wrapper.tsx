"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { ShareProjectDialog } from "./upload-dialog";

export function ReuploadDialogWrapper({
  studentId,
  guideId,
  showButton,
}: {
  studentId: string;
  guideId: string;
  showButton: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {showButton && (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-[#1e293b] p-3 hover:bg-[#0f172a] transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          <PlusCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Always mount the dialog, but it only opens if open === true */}
      <ShareProjectDialog
        open={open}
        onOpenChange={setOpen}
        studentId={studentId}
        guideId={guideId}
      />
    </>
  );
}

