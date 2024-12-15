import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes
const isPublicRoute = createRouteMatcher([
  '/', // Home Page
  '/events/:id', // Event details
  '/api/webhooks(.*)', // Webhooks
  '/api/uploadthing', // File upload API
  '/sign-in(.*)', // Sign-in page
  '/sign-up(.*)', // Sign-up page
]);
// Middleware implementation
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // Protect all non-public routes
    await auth.protect();
  }
});

// Configuration for route matching
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
