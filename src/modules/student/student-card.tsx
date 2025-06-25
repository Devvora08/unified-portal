import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

interface StudentProps {
      id?: string,
      email: string,
      name: string,
      imageUrl: string,
      college: string,
      semester: number,
      interestFields: string[],
}

function StudentCard({ email, name, imageUrl, college, semester, interestFields} : StudentProps) {
  return (
      <Card className="border border-gray-200 hover:shadow-md transition-all rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col items-center gap-3 py-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-300 shadow-sm">
            <Image
              src={imageUrl || "/default-avatar.png"}
              alt={`${name}'s profile picture`}
              height={50}
              width={50}
              className="object-cover"
            />
          </div>
          <CardTitle className="text-xl font-semibold text-center">{name}</CardTitle>
        </CardHeader>


        <CardContent className="px-6 pb-6 space-y-4 mt-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-gray-600">College : :</span>
            <div className="truncate">{college || "Not provided"}</div>
            <div className="truncate">{semester || "Not provided"}</div>
          </div>


          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-gray-600">Email:</span>
            <div className="truncate">{email}</div>
          </div>


          {/* 🔥 INTEREST FIELDS */}
          <div className="pt-2">
            <p className="text-sm font-semibold text-gray-700 mb-2">Fields</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {interestFields.map((interest, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-medium"
                >
                  + {interest}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
  )
}

export default StudentCard
