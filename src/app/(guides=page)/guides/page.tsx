"use server"
import React from 'react'
import { fetchAllGuides } from '../../../../actions/fetch-role'
import GuideCard from '@/modules/guide/guide-card'

async function GuidesPage() {

    const guides = await fetchAllGuides()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {guides.map((guide) => (
                <GuideCard key={guide.id} {...guide} />
            ))}
        </div>
    )

}

export default GuidesPage
