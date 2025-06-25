"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner"; // if you're using toast
import { useMutation } from "@tanstack/react-query";
import { CreateBlog } from "../../../actions/create-blog";

export default function AddBlogDialog({ guideId }: { guideId: string }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const mutation = useCreateBlog();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        setLoading(true);

        mutation.mutate(
            { guideId: guideId, title, content },
            {
                onSuccess: (res) => {
                    if (!res.success) {
                        toast.error(res.error || "Something went wrong");
                        return;
                    }

                    toast.success("Blog posted successfully");
                    setTitle("");
                    setContent("");
                    setOpen(false);
                },
                onError: (err) => {
                    console.error(err);
                    toast.error("Failed to post blog");
                },
                onSettled: () => {
                    setLoading(false);
                },
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="absolute top-40 right-32 bg-black text-white rounded-full p-2 hover:bg-gray-800 transition"
                    aria-label="Add Blog"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogTitle className="text-xl font-semibold mb-4">
                    Create New Blog
                </DialogTitle>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium block mb-1">Title</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">Content</label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your blog here..."
                            rows={6}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex mt-4 justify-start">
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Posting..." : "Post Blog"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}


function useCreateBlog() {
    return useMutation({
        mutationFn: async ({
            guideId,
            title,
            content,
        }: {
            guideId: string;
            title: string;
            content: string;
        }) => {
            return await CreateBlog(guideId, title, content);
        },
    });
}