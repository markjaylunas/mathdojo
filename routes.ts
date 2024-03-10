/**
 * An array of public routes that do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * An array of protected routes that require authentication
 * @type {string[]}
 */

export const protectedRoutes = ["/setting"];

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
export const DEFAULT_LOGIN_REDIRECT = "/user/setting";
