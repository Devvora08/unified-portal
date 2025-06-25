"use server"

import prisma from "@/lib/prisma";
import { createUploadthing, type FileRouter } from "uploadthing/server";
import { cookies } from "next/headers"; // ✅ to access cookies in middleware

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const cookieStore = await cookies(); // ✅ Use await for your current Next.js version
      const versionId = cookieStore.get("upload_version_id")?.value;

      if (!versionId) {
        throw new Error("❌ No versionId cookie found");
      }

      const userId = "some-clerk-or-auth-id"; // Replace this with Clerk logic later

      return { userId, versionId }; // ✅ send to onUploadComplete
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ Upload complete for versionId:", metadata.versionId);
      console.log("📄 PDF file URL:", file.url);

      await prisma.projectVersion.update({
        where: { id: metadata.versionId },
        data: { fileUrl: file.url },
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
