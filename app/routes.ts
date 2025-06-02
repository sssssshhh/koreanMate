import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("common/pages/home-page.tsx"),
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
] satisfies RouteConfig;
