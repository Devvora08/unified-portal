"use server";

import prisma from "@/lib/prisma";

export async function fetchRole(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { role: true, },
  });

  return user?.role ?? null;
}


export async function fetchUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user
}

export async function fetchAllGuides() {
  // query to retrieve array of all users of role == guide
  const guides = await prisma.user.findMany({
    where:{
      role: "GUIDE"
    },
    select: {
      id: true,
      email: true,
      name: true,
      imageUrl: true,
      instituteMail: true,
    }
  })

  return guides
}

export async function fetchAllStudents() {
  // query to retrieve array of all users of role == student
  const guides = await prisma.user.findMany({
    where:{
      role: "STUDENT"
    },
    select: {
      id: true,
      email: true,
      name: true,
      imageUrl: true,
      college: true,
      semester: true,
      interestFields: true,
    }
  })

  return guides
}