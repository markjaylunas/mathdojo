import NextAuth from "next-auth";
import authConfig from "@lib/auth.config";
import {
  DEFAULT_SIGNIN_REDIRECT,
  DEFAULT_SIGNIN_PATH,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/src/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_SIGNIN_PATH, nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
