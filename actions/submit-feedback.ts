"use server"

import prisma from "@/lib/prisma"

export async function SubmitFeedback(versionId: string, feedback: string) {
    const projectVersion = await prisma.projectVersion.update({
        where: { id: versionId },
        data: { modification: feedback }
    });

    return projectVersion;
}
