import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'

function GuideNavbar() {
    return (
        <nav className="w-full px-4 py-2 flex items-center justify-between border-b shadow-sm">
            {/* Left: Brand */}
            <div className="p-2">
                <Link href="/" className="text-black text-lg font-extrabold tracking-tight">
                    Unified Portal
                </Link>
            </div>

            {/* Center: Nav Links */}
            <div className="hidden md:flex items-center gap-6">
                <Link href="/students">
                    <span className="text-lg px-2">Students</span>
                </Link>
                <Link href="/track-projects">
                    <span className="text-lg px-2">Track Projects</span>
                </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <UserButton
                    userProfileUrl="/profile"
                    appearance={{
                        elements: {
                            userButtonPopoverActionButton__manageAccount: "before:content-['My_Profile']",
                        },
                    }}
                />
            </div>
        </nav>
    );
}

export default GuideNavbar
