"use server"

import prisma from "@/lib/prisma";

export async function addUserDetails(
  id: string,
  collegeName: string,
  sem: number,
  fields: string[]
) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        college: collegeName,
        semester: sem,
        interestFields: fields,
      },
    });

    return { success: true, message: "User details updated", user };
  } catch (error) {
    console.error("❌ Error updating user details:", error);
    return { success: false, message: "Failed to update user details", user: null };
  }
}
