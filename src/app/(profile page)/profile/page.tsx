"use server"

import React from 'react'
import { fetchRole, fetchUser } from '../../../../actions/fetch-role'
import { auth } from '@clerk/nextjs/server'
import StudentProfile from '@/modules/student/student-profile'
import GuideProfile from '@/modules/guide/guide-profile'

async function ProfilePage() {
    const { userId } = await auth()

    const role = await fetchRole(userId)
    const user = await fetchUser(userId)

    switch (role) {
        case "STUDENT":
            return <StudentProfile user={user}/>
        case "GUIDE":
            return <GuideProfile user={user} />
    }
}

export default ProfilePage
