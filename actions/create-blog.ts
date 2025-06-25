"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function CreateBlog(
  guideId: string,
  title: string,
  content: string
) {
  try {
    // Basic validation
    if (!guideId || !title.trim() || !content.trim()) {
      throw new Error("Missing required fields.");
    }

    // Optional: Check if user is actually a guide
    const user = await prisma.user.findUnique({
      where: { id: guideId },
      select: { role: true },
    });

    if (!user || user.role !== "GUIDE") {
      throw new Error("Only guides can create blogs.");
    }

    // Create the blog
    const blog = await prisma.blog.create({
      data: {
        guideId,
        title: title.trim(),
        content: content.trim(),
      },
    });

    // Optional: Refresh cache for /
    revalidatePath("/");

    return { success: true, blog };
  } catch (error) {
    console.error("Failed to create blog:", error);
    return { success: false, error: (error as Error).message };
  }
}
