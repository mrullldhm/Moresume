import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public (unauthenticated) routes using a regular expression matcher
// These routes will NOT require users to be signed in
const isPublicRoute = createRouteMatcher([
  "/", // Homepage
  "/sign-in(.*)", // Sign-in page and any nested routes
  "/sign-up(.*)", // Sign-up page and any nested routes
  "/api/stripe-webhook", // Stripe webhook endpoint
]);

// Middleware handler to protect routes by default, except public ones
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect(); // Enforce authentication for private routes
  }
});

// Next.js matcher config to determine which routes middleware runs on
export const config = {
  matcher: [
    // Run middleware for all routes except:
    // - _next (Next.js internals)
    // - static files (js, css, images, fonts, etc.)
    // This uses a negative lookahead to exclude those paths
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always include API and tRPC routes for protection
    "/(api|trpc)(.*)",
  ],
};
