import { NextResponse } from 'next/server'
import { jwtVerify, importJWK } from 'jose'

export async function middleware(req) {
    try {
        const token = req.cookies.get('token').value

        const secretJWK = {
            kty: 'oct',
            k: process.env.JOSE_SECRET,
        }
        const secretKey = await importJWK(secretJWK, 'HS256')

        const { payload } = await jwtVerify(token, secretKey)
        if (!payload.email) {
            console.log('Invalid token')
            throw new Error('Invalid token')
        }

        const reqHeaders = new Headers(req.headers)
        reqHeaders.set('user', JSON.stringify({ email: payload.email }))


        return NextResponse.next({
            request: {
                headers: reqHeaders
            }
        })
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: '/manage/blog/:path*'
}