'use server'

import { SignJWT, importJWK } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function handleSubmit(formAction, formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    /* ⭐️ Best practice
    const user = await getUserByEmail(email);
    if (!user) {
        return { message: 'Invalid email or password' };
    }

    const isValid = await compare(password, user.hashedPassword);
    if (!isValid) {
        return { message: 'Invalid email or password' };
    } 
    */
    if (email !== 'admin' || password !== '1234') {
        return { message: 'Login failed' }
    }

    const secretJWK = {
        kty: 'oct',
        k: process.env.JOSE_SECRET,
    }
    const secretKey = await importJWK(secretJWK, 'HS256')

    const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secretKey)

    cookies().set('token', token)

    redirect('/manage/blog')
}