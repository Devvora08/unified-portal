"use server"

import React from 'react'
import { fetchProject } from '../../../../../actions/fetch-projects'
import { ProjectVersion } from '@/generated/prisma'
import { fetchRole } from '../../../../../actions/fetch-role'
import { auth } from '@clerk/nextjs/server'
import VersionCircle from '@/modules/common/version-circle'
import { ShowHideDialog } from '../../../../../actions/show-hide-dialog'
import { ReuploadDialogWrapper } from '@/modules/common/wrapper'

interface Project {
    params: Promise<{
        projectId: string
    }>
}

export default async function ProjectStatus({ params }: Project) {
    const { projectId } = await params
    const project = await fetchProject(projectId)

    const { userId } = await auth()
    const role = await fetchRole(userId)

    if (!project) {
        return <div className="text-center text-red-500 mt-10">Project not found.</div>
    }

    const latestVersion = project.versions.at(-1);
    const showButton = latestVersion ? await ShowHideDialog(latestVersion.id) : false;


    return (
        <div className="relative w-full flex flex-col items-center gap-6">

            {/* ➕ Button Row */}
            <div className="w-full max-w-3xl flex justify-end px-4">
                <ReuploadDialogWrapper
                    studentId={project.studentId}
                    guideId={project.guideId}
                    showButton={showButton}
                />
            </div>

            {/* Version Circles */}
            <div className="flex flex-col items-center gap-8">
                {project.versions.map((version: ProjectVersion) => (
                    <VersionCircle key={version.id} role={role} version={version} />
                ))}
            </div>

        </div>
    );

}





