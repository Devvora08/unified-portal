"use server"

import prisma from "@/lib/prisma";

export async function fetchStudentProjects(studentId: string) {
    return await prisma.project.findMany({
        where: {
            studentId,
        },
        select: {
            id: true,
            guide: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    imageUrl: true,
                },
            },
            versions: {
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    createdAt: true,
                    fileUrl: true,
                    name: true,
                    link: true,
                    modification: true,

                },
            },
            createdAt: true,
            updatedAt: true,
        },
    });
}

export async function fetchGuideProjects(guideId: string) {
    return await prisma.project.findMany({
        where: {
            guideId,
        },
        select: {
            id: true,
            student: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    imageUrl: true,
                    college: true,
                    semester: true,
                },
            },
            versions: {
                orderBy: { createdAt: "desc" },
                take: 1, // latest version
                select: {
                    id: true,
                    createdAt: true,
                    fileUrl: true,
                    name: true,
                    link: true,
                    modification: true,
                },
            },
            createdAt: true,
            updatedAt: true,
        },
    });
}

export async function fetchProject(projectId: string) {
    return await prisma.project.findUnique({
        where: {
            id: projectId
        },
        select: {
            versions: {
                orderBy: {
                    createdAt: "desc", // oldest to latest
                },
            },
            guideId: true,
            studentId: true,
        }

    })
}

