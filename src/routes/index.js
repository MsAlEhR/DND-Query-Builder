/* eslint-disable global-require */

// The top-level (parent) route
import { CONTEXT_PATH } from "../constants/local-urls";

const routes = {
  path: CONTEXT_PATH,

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: "",
      load: () => import(/* webpackChunkName: 'add-rule' */ "./login")
    },    {
      path: "/",
      load: () => import(/* webpackChunkName: 'add-rule' */ "./login")
    },

      {
      path: "/add-rule",
      load: () => import(/* webpackChunkName: 'add-rule' */ "./add-rule")
    },

      {
          path: "/login",
          load: () => import(/* webpackChunkName: 'login' */ "./login")
      },
      // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
      {
          path: "(.*)",
          load: () => import(/* webpackChunkName: 'not-found' */ "./not-found")
      }

  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || "Untitled Page"}`;
    route.description = route.description || "";

    return route;
  }
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: "/error",
    action: require("./error").default
  });
}

export default routes;
