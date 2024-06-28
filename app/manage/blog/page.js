import { headers } from "next/headers";
import Link from "next/link"

async function getBlogs() {
    const response = await fetch("https://666fd1750900b5f87248504e.mockapi.io/mudev/blogs")

    if (!response.ok) {
        throw new Error("Failed to fetch blogs")
    }

    return await response.json()
}

export default async function Page() {
    const header = headers();
    const user = JSON.parse(header.get("user"));

    const blogs = await getBlogs()

    return (
        <div>
            <h1>Manage Blog</h1>
            <p>This is the manage blog page. <b>{user.email}</b></p>
            <div className="flex flex-col gap-1">
                {
                    blogs.map((blog, idx) => (
                        <div key={idx} className="flex gap-2">
                            {blog.id}. {blog.name}
                            <Link href={`/manage/blog/${blog.id}`}><button className="bg-green-800 px-2 rounded-md hover:bg-green-700 font-medium">Edit</button></Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}