// Adapted from https://github.com/zeit/next.js/blob/canary/examples/with-firebase-authentication



import * as admin from "firebase-admin";

export const verifyIdToken = token => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        // https://stackoverflow.com/a/41044630/1332513
        privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
      }),
      databaseURL: process.env.DATABASE_URL
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(error => {
      throw error;
    });
};
