import Link from "next/link"

async function getBlog(id) {
    const response = await fetch(`https://666fd1750900b5f87248504e.mockapi.io/mudev/blogs/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch blog")
    }

    return await response.json()
}

export default async function Page({ params }) {
    const blog = await getBlog(params.id)

    return (
        <div>
            <Link href="/"><button className="bg-green-800 px-2 rounded-md hover:bg-green-700 font-medium mb-4">Back</button></Link>
            <h1 className="font-semibold text-xl">{blog.name}</h1>
            <p>{blog.description}</p>
        </div>
    )
}