"use server"

import { fetchUser } from "../../../../../actions/fetch-role"
import { format } from "date-fns"
import { ShareProjectDialog } from "@/modules/common/upload-dialog"
import { auth } from "@clerk/nextjs/server"

interface GuidePageProps {
    params: {
        guideId: string
    }
}

export default async function GuidePage({ params }: GuidePageProps) {

    const { guideId } = await params
    const guideUser = await fetchUser(guideId)

    const cUser = await auth()
    const studentId = cUser.userId

    return (
        <div className="w-full flex justify-center px-4 sm:px-6">
            <div className="w-full max-w-3xl mt-10 bg-white shadow-md rounded-2xl p-6 sm:p-8 space-y-8">

                {/* 👤 Profile Header */}
                <div className="bg-gray-50 border rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
                    {/* 🖼 Image + Info */}
                    <div className="flex flex-col items-center text-center space-y-3">
                        {guideUser.imageUrl ? (
                            <img
                                src={guideUser.imageUrl}
                                alt={guideUser.name}
                                className="h-10 w-10 rounded-full object-cover border"
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg border">
                                {guideUser.name?.charAt(0)}
                            </div>
                        )}

                        {/* ℹ️ Name + Email + Role */}
                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
                                {guideUser.name}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {guideUser.email}
                            </p>

                            <span className="inline-block px-3 py-0.5 text-xs rounded-full bg-pink-100 text-pink-700 font-medium capitalize">
                                {guideUser.role.toLowerCase()}
                            </span>

                            {guideUser.instituteMail && (
                                <p className="text-sm text-gray-500">
                                    Institute Mail: <span className="font-medium text-gray-700">{guideUser.instituteMail}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* 📅 Timestamps */}
                    <div className="text-center text-sm text-gray-500 space-y-1 pt-4 border-t mt-4">
                        <p>
                            <span className="font-medium text-gray-600">Joined:</span>{" "}
                            {format(new Date(guideUser.createdAt), "MMMM d, yyyy")}
                        </p>
                        <p>
                            <span className="font-medium text-gray-600">Last Updated:</span>{" "}
                            {format(new Date(guideUser.updatedAt), "MMMM d, yyyy")}
                        </p>
                    </div>

                    {/* 🚀 Share Project Dialog */}
                    <ShareProjectDialog studentId={studentId} guideId={guideId}/>
                </div>
            </div>
        </div>
    )
}