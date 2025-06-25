"use client"

import { User } from '@/generated/prisma'
import { format } from 'date-fns';
import React from 'react'

function GuideProfile({ user }: { user: User }) {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6">
      <div className="w-full max-w-2xl mt-10 bg-white shadow-md rounded-2xl p-6 space-y-8">
        {/* Profile Header */}
        <div className="bg-gray-50 border rounded-xl p-6 shadow-sm space-y-4">
          {/* Profile Top (image + name/email/role) */}
          <div className="flex flex-col items-center gap-3 text-center">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover border"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg border">
                {user.name?.charAt(0)}
              </div>
            )}

            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <span className="inline-block px-3 py-0.5 text-xs rounded-full bg-pink-100 text-pink-700 font-medium capitalize">
                {user.role.toLowerCase()}
              </span>
              <p className="text-sm text-gray-600">{user.instituteMail}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="text-center text-sm text-gray-500 space-y-1">
            <p>Joined: {format(new Date(user.createdAt), "MMMM d, yyyy")}</p>
            <p>Last Updated: {format(new Date(user.updatedAt), "MMMM d, yyyy")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideProfile