/**
 * An array of public routes that do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/new-verification"];

/**
 * An array of protected routes that require authentication
 * @type {string[]}
 */

export const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/auth/error",
  "/forgot-password",
  "/reset-password",
];

/**
 * The prefix for the API authentication routes
 * Routes that start with this prefix are used for API authentication
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default login redirect path
 * @type {string}
 */
export const DEFAULT_SIGNIN_REDIRECT = "/setting";

/**
 * The default sign in path
 * @type {string}
 */
export const DEFAULT_SIGNIN_PATH = "/sign-in";

/**
 * The default sign up path
 * @type {string}
 */

export const DEFAULT_SIGNUP_PATH = "/sign-up";

/**
 * The default forgot password path
 * @type {string}
 */

export const DEFAULT_FORGOT_PASSWORD_PATH = "/forgot-password";
