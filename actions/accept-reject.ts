"use server"

import prisma from "@/lib/prisma"

export async function AcceptVersion(versionId: string) {
    // 1. Get the current version
    const currentVersion = await prisma.projectVersion.findUnique({
        where: { id: versionId },
        include: { project: true },
    });

    if (!currentVersion) {
        throw new Error("Version not found");
    }

    // 2. Get all versions for the same project, sorted by createdAt
    const allVersions = await prisma.projectVersion.findMany({
        where: { projectId: currentVersion.projectId },
        orderBy: { createdAt: "asc" },
    });

    // 3. Check if this is the latest version
    const isLatest = allVersions[allVersions.length - 1]?.id === versionId;
    if (!isLatest) {
        throw new Error("Only the latest version can be accepted");
    }

    // 4. Check if any *earlier* versions are still pending
    const pendingBefore = allVersions
        .slice(0, -1) // all except current (since it's last)
        .some((v) => v.status === "PENDING");

    if (pendingBefore) {
        throw new Error("Previous versions must be reviewed before accepting this one");
    }

    // 5. Accept the version
    const updatedVersion = await prisma.projectVersion.update({
        where: { id: versionId },
        data: { status: "APPROVED" },
    });

    return updatedVersion;
}

export async function RejectVersion(versionId: string) {
    const currentVersion = await prisma.projectVersion.findUnique({
        where: { id: versionId },
        include: { project: true },
    });

    if (!currentVersion) {
        throw new Error("Version not found");
    }

    const allVersions = await prisma.projectVersion.findMany({
        where: { projectId: currentVersion.projectId },
        orderBy: { createdAt: "asc" },
    });

    const isLatest = allVersions[allVersions.length - 1]?.id === versionId;
    if (!isLatest) {
        throw new Error("Only the latest version can be rejected");
    }

    const pendingBefore = allVersions
        .slice(0, -1)
        .some((v) => v.status === "PENDING");

    if (pendingBefore) {
        throw new Error("Previous versions must be reviewed before rejecting this one");
    }

    const updatedVersion = await prisma.projectVersion.update({
        where: { id: versionId },
        data: { status: "REJECTED" },
    });

    return updatedVersion;
}