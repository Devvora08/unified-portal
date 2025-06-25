"use server"
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { fetchRole } from '../../../../actions/fetch-role'
import StudentProjects from '@/modules/student/student-projects'
import GuideProjects from '@/modules/guide/guide-projects'

async function TrackProjects() {
  
  const {userId} = await auth()  
  const role = await fetchRole(userId)  
    
  if (role == "STUDENT") return <StudentProjects id={userId}/>
  if (role == "GUIDE") return <GuideProjects id={userId}/>
}

export default TrackProjects
