import Blog from "@/modules/common/blogs";
import { fetchRole } from "../../actions/fetch-role";
import { auth } from "@clerk/nextjs/server";
import AddBlogDialog from "@/modules/common/blog-dialog";
import { FetchAllBlogs } from "../../actions/fetch-blog";

export default async function Home() {

  const { userId } = await auth()
  const role = await fetchRole(userId)

  // 🔁 Dummy blogs list for now, to be replaced with real data
  const blogs = await FetchAllBlogs()

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-3xl flex items-center justify-between mb-8">
        {/* Title */}
        <h1 className="text-4xl font-bold">Blogs</h1>

        {/* ➕ Add Blog Button */}
        {role === "GUIDE" && <AddBlogDialog guideId={userId} />}
      </div>

      {/* Blog List */}
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            createdAt={blog.createdAt}
            guide={blog.guide}
          />
        ))}
      </div>
    </main>

  );

}
