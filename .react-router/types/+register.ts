import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/login": {};
  "/forgot-password": {};
  "/register": {};
  "/reset-password": {};
  "/stories/:storyId": {
    "storyId": string;
  };
  "/stories/:storyId/:chapterId": {
    "storyId": string;
    "chapterId": string;
  };
  "/stories/:storyId/:chapterId/quiz": {
    "storyId": string;
    "chapterId": string;
  };
  "/stories/:storyId/:chapterId/recording": {
    "storyId": string;
    "chapterId": string;
  };
  "/stories/:storyId/:chapterId/complete": {
    "storyId": string;
    "chapterId": string;
  };
  "/blog": {};
  "/grammer": {};
};