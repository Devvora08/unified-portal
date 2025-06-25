
"use server"
import React from 'react'
import { fetchAllStudents } from '../../../../actions/fetch-role'
import StudentCard from '@/modules/student/student-card'

async function StudentsPage() {
 const students = await fetchAllStudents()
 
     return (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
             {students.map((guide) => (
                 <StudentCard key={guide.id} {...guide} />
             ))}
         </div>
     )
}

export default StudentsPage
