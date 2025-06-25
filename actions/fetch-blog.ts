"use server";

import prisma from "@/lib/prisma";

export async function FetchBlog(id: string) {
  try {
    if (!id) throw new Error("Blog ID is required");

    const blog = await prisma.blog.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        guide: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!blog) throw new Error("Blog not found");

    return blog;
  } catch (error) {
    console.error("FetchBlog error:", error);
    throw error;
  }
}


export async function FetchAllBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        guide: {
          select: {
            name: true,
          },
        },
      },
    });

    return blogs;
  } catch (error) {
    console.error("FetchAllBlogs error:", error);
    throw error;
  }
}