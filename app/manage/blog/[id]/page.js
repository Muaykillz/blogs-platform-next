import { Suspense } from 'react'
import BlogEditor from './BlogEditor'
import Link from 'next/link'

async function getBlog(id) {
    const response = await fetch(`https://666fd1750900b5f87248504e.mockapi.io/mudev/blogs/${id}`)
    if (!response.ok) {
        throw new Error("Failed to fetch blog")
    }
    return await response.json()
}


export default async function Page({ params }) {
    return (
        <div>
            <Link href="/manage/blog"><button className="bg-green-800 px-2 rounded-md hover:bg-green-700 font-medium mb-4">Back</button></Link>
            <Suspense fallback={<div>Loading...</div>}>
                <BlogDetails id={params.id} />
            </Suspense>
        </div>
    )
}

async function BlogDetails({ id }) {
    const blog = await getBlog(id)
    return <BlogEditor blog={blog} />
}