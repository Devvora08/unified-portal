"use client"
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { FileUp } from "lucide-react"; // ⬅️ you can change the icon as per style

export function PDFUploadWidget() {
  return (
    <div className="p-6 border border-gray-300 rounded-2xl bg-gray-50 shadow-sm flex flex-col items-center space-y-4">
      <div className="flex items-center gap-2 text-gray-700">
        <FileUp className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Upload your PDF</h2>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Accepted format: <span className="font-medium">.pdf</span><br />
        Max size: 4MB
      </p>
      <UploadButton
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          console.log("Upload complete!", res);
          toast.success("PDF uploaded successfully!");
        }}
        onUploadError={(err) => {
          console.error(err);
          toast.error("Upload failed");
        }}
        appearance={{
          button:
            "bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 text-white font-medium px-4 py-2 rounded-md",
          container: "w-full flex justify-center",
        }}
      />
    </div>
  );
}
