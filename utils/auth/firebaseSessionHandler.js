// Adapted from https://github.com/zeit/next.js/blob/canary/examples/with-firebase-authentication

import fetch from "isomorphic-unfetch";

export const setSession = (user) => {
  if (user) {
    // Log in
    return user.getIdToken().then((token) =>
      fetch("/api/login", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ token }),
      })
    );
  }
  // Log out
  return fetch("/api/logout", {
    method: "POST",
    credentials: "same-origin",
  });
};
