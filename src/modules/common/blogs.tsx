import React from 'react';
import { format } from 'date-fns';

interface Blog {
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    guide: {
        name: string;
    };
}

function Blog({ content, createdAt, title, guide }: Blog) {
    return (
        <div className="border border-gray-300 rounded-xl p-6 shadow-sm bg-white space-y-4">
            {/* Title */}
            <h2 className="text-2xl font-bold tracking-tight mb-5 text-gray-900">{title}</h2>

            {/* Meta Info */}
            <div className="text-sm mt-4 text-muted-foreground">
                Posted by <span className="font-medium bg-amber-100 p-1 rounded-full text-gray-800">{guide.name}</span> •{" "}
                {format(new Date(createdAt), "do MMMM yyyy, h:mm a")}
            </div>

            {/* Content */}
            <p className="text-base mt-4 leading-relaxed whitespace-pre-line text-gray-800">
                {content}
            </p>
        </div>
    );
}

export default Blog;
