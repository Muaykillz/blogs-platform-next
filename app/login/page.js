'use client'

import { useFormState } from 'react-dom'
import { handleSubmit } from './action.js'

export default function Page() {
    const initState = {}
    const [state, formAction] = useFormState(handleSubmit, initState)

    return (
        <>
            <h1>Login</h1>
            <form action={formAction}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" className="text-black" />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" className="text-black" />
                </div>
                <button type="submit" className="bg-green-800 px-2 rounded-md hover:bg-green-700 font-medium mb-4">Login</button>
            </form>

        </>
    )
}