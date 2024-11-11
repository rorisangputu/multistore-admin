import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/:path*']);
const adminUserId = 'user_2nqyh0NLxzjVq090ZMDzFbJgUNw';

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // Protect all non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect();

    if (userId !== adminUserId) {
      return Response.redirect("http://localhost:3000", 302);
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
