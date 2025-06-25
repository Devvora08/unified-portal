"use server";

import prisma from "@/lib/prisma";

export const ShowHideDialog = async (versionId: string): Promise<boolean> => {
  // Get the current version
  const currentVersion = await prisma.projectVersion.findUnique({
    where: { id: versionId },
    include: { project: true },
  });

  if (!currentVersion) {
    throw new Error("Version not found");
  }

  // Get all versions for this project
  const allVersions = await prisma.projectVersion.findMany({
    where: { projectId: currentVersion.projectId },
    select: { status: true }, // Only need the status field
  });

  // Check if *any* version is not rejected
  const hasNonRejected = allVersions.some(
    (v) => v.status === "PENDING" || v.status === "APPROVED"
  );

  // Only show if ALL are rejected
  return !hasNonRejected;
};
