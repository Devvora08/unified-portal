import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// 👇 Add your public routes here
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/api/webhooks/(.*)',
  '/api/(.*)' // ✅ allow webhooks to bypass auth
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes (like webhooks)
    '/(api|trpc)(.*)',
  ],
}
