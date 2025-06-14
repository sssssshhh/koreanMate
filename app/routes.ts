import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("features/main/pages/home-page.tsx"),
    route(
        "/login",
        "features/auth/pages/login.tsx"
    ),
    route(
        "/forgot-password",
        "features/auth/pages/forgot-password.tsx"
    ),
    route(
        "/register",
        "features/auth/pages/register.tsx"
    ),
    route(
        "/reset-password",
        "features/auth/pages/reset-password.tsx"
    ),
    route(
        "/stories/:storyId",
        "features/chapters/pages/chapters.tsx"
    ),
    route(
        "/stories/:storyId/:chapterId",
        "features/content/pages/content.tsx"
    ),
    route(
        "/blog",
        "features/stories/pages/blog.tsx"
    ),
    route(
        "/grammer",
        "features/stories/pages/grammer.tsx"
    )
] satisfies RouteConfig;
