import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("common/pages/home-page.tsx"),
    route(
        "/login",
        "api/auth/pages/login.tsx"
    ),
    route(
        "/forgot-password",
        "api/auth/pages/forgot-password.tsx"
    ),
    route(
        "/register",
        "api/auth/pages/register.tsx"
    ),
    route(
        "/reset-password",
        "api/auth/pages/reset-password.tsx"
    ),
    route(
        "/stories",
        "api/stories/pages/stories.tsx"
    ),
    route(
        "/blog",
        "api/stories/pages/blog.tsx"
    ),
    route(
        "/grammer",
        "api/stories/pages/grammer.tsx"
    )
] satisfies RouteConfig;
