import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
 
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/", "/pricing", "/api/uploadthing(.*)", "/api/webhooks/(.*)"],
  afterAuth: async (auth, req: NextRequest) => {
    const { userId, orgId, sessionClaims } = auth;
    // Handle users who aren't authenticated
    if (!userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
    // Redirect logged in users to organization selection page if they are not active in an organization
    if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }
    // Catch users who doesn't have `onboardingComplete: true` in PublicMetata
    // Redirect them to the /onboarding out to complete onboarding
    // if (userId && orgId && !sessionClaims?.metadata?.onboardingComplete && !auth.isPublicRoute) {
    //   const onboardingUrl = new URL('/onboard', req.url)
    //   return NextResponse.redirect(onboardingUrl)
    // }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    if (auth.isPublicRoute) return NextResponse.next();
  },
  // Change debug to true to see more detailed auth logs
  debug: false,
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};