// student to guide action
"use server"
import prisma from "@/lib/prisma";

export const becomeGuide = async (id: string, mail: string) => {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        role: "GUIDE",
        instituteMail: mail,
      
      },
    });

    return { success: true, message: "Role updated to GUIDE" };
  } catch (error) {
    console.error("❌ Failed to update user role:", error);
    return { success: false, message: "Failed to update role" };
  }
};
