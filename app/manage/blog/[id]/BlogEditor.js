'use client'

import { useState } from 'react'

export default function BlogEditor({ blog: initialBlog }) {
    const [blog, setBlog] = useState(initialBlog)
    const [isEditing, setIsEditing] = useState(false)


    async function updateBlog(e) {
        e.preventDefault()

        try {
            const response = await fetch(`https://666fd1750900b5f87248504e.mockapi.io/mudev/blogs/${blog.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blog)
            })

            if (!response.ok) {
                throw new Error("Failed to update blog")
            }

            setIsEditing(false)
            alert(JSON.stringify(await response.json()))
        } catch (error) {
            console.error(error)
        }
    }

    function handleChange(e) {
        setBlog({
            ...blog,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form onSubmit={updateBlog}>
            <div className="flex gap-2">
                {!isEditing ? (
                    <h1 className="font-semibold text-xl">{blog.name}</h1>
                ) : (
                    <input
                        name="name"
                        className="font-semibold text-xl text-black px-2 rounded-sm"
                        value={blog.name}
                        placeholder="Blog name"
                        onChange={handleChange}
                    />
                )}
                <button
                    type='button'
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-slate-800 px-2 rounded-md hover:bg-slate-700 font-medium"
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>
            <p>{blog.description}</p>
            <button
                className="bg-green-800 px-2 rounded-md hover:bg-green-700 font-medium mt-4"
                type='submit'
            >
                Update
            </button>
        </form>
    )
}