"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function CreateProject(
  studentId: string,
  guideId: string,
  name: string,
  link: string
) {
  const cookieStore = await cookies();

  // 1. Check if a project between student and guide already exists
  let project = await prisma.project.findFirst({
    where: {
      studentId,
      guideId,
    },
  });

  // 2. If not found, create the new Project
  if (!project) {
    project = await prisma.project.create({
      data: {
        studentId,
        guideId,
      },
    });
  }

  // 3. Create a new ProjectVersion (either first or next)
  const version = await prisma.projectVersion.create({
    data: {
      projectId: project.id,
      name,
      link,
      status: "PENDING",
      fileUrl: null,
    },
  });

  // 4. Set cookie for UploadThing to use in PDF step
  cookieStore.set("upload_version_id", version.id, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return {
    success: true,
    projectId: project.id,
    versionId: version.id,
    message: "Project version created successfully.",
  };
}
