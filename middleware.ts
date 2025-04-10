
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

interface CustomSessionClaims {
    metadata?: {
        role?: string;
    };
}


const isProtectedRoute = createRouteMatcher(['/admin(.*)', '/Pages/checkout(.*)', "/Pages/orders(.*)"])
const isAdminCheck = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
    if (req.nextUrl.pathname == '/') {
        return NextResponse.redirect(new URL('/Pages', req.url))
    }
    const pathname = req.nextUrl.pathname
    const isApi = pathname.startsWith('/api')

    if (isProtectedRoute(req)) await auth.protect()
    if (!isApi) {
        const session = await auth()
        if (isAdminCheck(req) && (session?.sessionClaims as CustomSessionClaims)?.metadata?.role !== 'admin') {
            return NextResponse.redirect(new URL('/Pages', req.url))
        }
        if (!isAdminCheck(req) && (session?.sessionClaims as CustomSessionClaims)?.metadata?.role === 'admin') {
            return NextResponse.redirect(new URL('/admin/dashboard', req.url))
        }
    }
    return NextResponse.next()
})


export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}