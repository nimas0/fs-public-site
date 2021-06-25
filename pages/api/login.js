// Adapted from https://github.com/zeit/next.js/blob/canary/examples/with-firebase-authentication



import commonMiddleware from "../../utils/middleware/commonMiddleware";
import { verifyIdToken } from "../../utils/auth/firebaseAdmin";

const handler = (req, res) => {
  if (!req.body) {
    return res.status(400).end();
  }

  const { token } = req.body;

  // Decode the user's Firebase token and store it in a cookie. Use
  // express-session (or similar) to store the session data server-side.
  return verifyIdToken(token)
    .then(decodedToken => {
      req.session.decodedToken = decodedToken;
      req.session.token = token;
      return decodedToken;
    })
    .then(decodedToken => res.status(200).json({ status: true, decodedToken }))
    .catch(error => res.status(500).json({ error }));
};

export default commonMiddleware(handler);
