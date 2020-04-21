// Adapted from https://github.com/zeit/next.js/blob/canary/examples/with-firebase-authentication

"use strict";

import cookieSession from "./cookieSession";
import cookieSessionRefresh from "./cookieSessionRefresh";

export default handler => cookieSession(cookieSessionRefresh(handler));
