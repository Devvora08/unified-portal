"use client";

import React, { useState } from "react";
import Link from "next/link";
import {  UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { becomeGuide } from "../../../actions/become-guide";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentNavbar({ userId }: { userId: string }) {

    const router = useRouter()

    const [guideDetails, setGuideDetails] = useState({
        fullName: "",
        institutionEmail: "",
        specialization: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuideDetails({ ...guideDetails, [e.target.name]: e.target.value });
    };

    const guideMutation = useMutation({
        mutationFn: ({ id, mail }: { id: string; mail: string }) => becomeGuide(id, mail),
        onSuccess: () => {
            toast.success("You're now a guide!");
            router.refresh();
        },
        onError: (error) => {
            toast.error(error?.message || "Something went wrong.");
        },
    });

    const handleSubmit = () => {
        if (!userId) return toast.error("User not authenticated");

        guideMutation.mutate({ id: userId, mail: guideDetails.institutionEmail });
    };

    return (
        <nav className="w-full px-4 py-2 flex items-center justify-between border-b shadow-sm">
            {/* Left: Brand */}
            <div className="p-2">
                <Link href="/" className="text-gray-300 text-lg font-extrabold tracking-tight">
                    Unified Portal
                </Link>
            </div>

            {/* Center: Nav Links */}
            <div className="hidden md:flex items-center gap-6">
                <Link href="/guides">
                    <span className="text-lg px-2">Guides</span>
                </Link>
                <Link href="/track-projects">
                    <span className="text-lg px-2">Track Projects</span>
                </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default" className="text-sm">
                            Become Guide
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-xl shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">Become a Guide</DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                                Provide your professional details below. We will verify and upgrade your role.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Dr. A. P. J. Abdul Kalam"
                                    value={guideDetails.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="institutionEmail">Institution Email</Label>
                                <Input
                                    id="institutionEmail"
                                    name="institutionEmail"
                                    placeholder="you@university.edu"
                                    value={guideDetails.institutionEmail}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="specialization">Specialization</Label>
                                <Input
                                    id="specialization"
                                    name="specialization"
                                    placeholder="e.g. Artificial Intelligence"
                                    value={guideDetails.specialization}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleSubmit}
                            className="w-full flex items-center justify-center gap-2 transition-opacity duration-200"
                            disabled={guideMutation.isPending}
                        >
                            {guideMutation.isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Request"
                            )}
                        </Button>
                    </DialogContent>
                </Dialog>

                <UserButton
                    userProfileMode="navigation"
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
