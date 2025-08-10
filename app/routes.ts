import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("features/main/pages/home-page.tsx"),
    // auth routes
    route(
        "/login",
        "features/auth/pages/login.tsx"
    ),
    route(
        "/forgot-password",
        "features/auth/pages/forgot-password.tsx"
    ),
    route(
        "/verification",
        "features/auth/pages/verification.tsx"
    ),
    route(
        "/register",
        "features/auth/pages/register.tsx"
    ),
    route(
        "/registration-success",
        "features/auth/pages/registration-success.tsx"
    ),
    route(
        "/reset-password",
        "features/auth/pages/reset-password.tsx"
    ),
    // learning routes
    route(
        "/stories",
        "features/learning/pages/stories.tsx"
    ),

    route(
        "/stories/:storyId",
        "features/learning/chapters/pages/chapters.tsx"
    ),
    route(
        "/stories/:storyId/:chapterId",
        "features/learning/contents/pages/content.tsx"
    ),
    route(
        "/stories/:storyId/:chapterId/quiz",
        "features/learning/contents/pages/quiz.tsx"
    ),
    route(
        "/stories/:storyId/:chapterId/recording",
        "features/learning/contents/pages/recording.tsx"
    ),
    route(
        "/stories/:storyId/:chapterId/complete",
        "features/learning/contents/pages/complete.tsx"
    ),
    route(
        "/blog",
        "features/learning/stories/pages/blog.tsx"
    ),
    route(
        "/grammer",
        "features/learning/stories/pages/grammer.tsx"
    )
] satisfies RouteConfig;
