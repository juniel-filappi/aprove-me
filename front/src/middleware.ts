import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const hasToken = request.cookies.has('token')

    if (hasToken) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: '/dashboard/:path*',
}