"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/generated/prisma";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import { addUserDetails } from "../../../actions/user-details";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function StudentProfile({ user }: { user: User }) {
    const [formData, setFormData] = useState({
        college: "",
        session: "",
        interests: "",
    });

    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const mutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const parsedInterests = data.interests
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

            const payload = {
                collegeName: data.college,
                sem: parseInt(data.session),
                fields: parsedInterests,
            };

            return await addUserDetails(user.id, payload.collegeName, payload.sem, payload.fields);
        },
        onSuccess: () => {
            toast.success("Details Updated and Saved!");
            router.refresh(); // Optional if you're showing updated info on the page
            setFormData({
                college: "",
                session: "",
                interests: "",
            });
        },
        onError: () => {
            toast.error("Failed to save details");
        },
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

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
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="text-center text-sm text-gray-500 space-y-1">
                        <p>Joined: {format(new Date(user.createdAt), "MMMM d, yyyy")}</p>
                        <p>Last Updated: {format(new Date(user.updatedAt), "MMMM d, yyyy")}</p>

                    </div>
                </div>


                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <h3 className="text-lg font-medium mb-1 mt-10">Academic Details</h3>
                        <p className="text-sm text-muted-foreground">
                            Fill in your academic background and areas of interest.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="college">College Name</Label>
                        <Input
                            id="college"
                            name="college"
                            value={formData.college}
                            onChange={handleChange}
                            placeholder="e.g., VIT Vellore"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="session">Semester</Label>
                        <Input
                            id="session"
                            name="session"
                            value={formData.session}
                            onChange={handleChange}
                            placeholder="e.g. 3"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="interests">Fields of Interest</Label>
                        <Input
                            id="interests"
                            name="interests"
                            value={formData.interests}
                            onChange={handleChange}
                            placeholder="e.g., Web Dev, AI, Blockchain"
                        />
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            className="w-1/2 mt-4 sm:w-auto"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin w-4 h-4" />
                                    Saving
                                </span>
                            ) : (
                                "Save Details"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
