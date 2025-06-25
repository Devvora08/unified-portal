import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { fetchRole } from '../../../actions/fetch-role'
import StudentNavbar from '../student/student-navbar'
import GuideNavbar from '../guide/guide-navbar'

async function Navbar() {

  const { userId } = await auth()

  if (!userId) return null

  const role = await fetchRole(userId)

  if (role === "STUDENT") return <StudentNavbar userId={userId}/>;
  if (role === "GUIDE") return <GuideNavbar />;
}

export default Navbar


