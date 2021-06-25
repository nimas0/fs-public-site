// Adapted from https://github.com/zeit/next.js/blob/canary/examples/with-firebase-authentication



import React from "react";
import { get } from "lodash/object";
import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render() {
    // Store initial props from request data that we need to use again on the
    // client. See
    // https://github.com/zeit/next.js/issues/3043#issuecomment-334521241
    // https://github.com/zeit/next.js/issues/2252#issuecomment-353992669
    const { AuthUserInfo } = this.props;
    return (
      <Html>
        <Head>
          <script
            id="__MY_AUTH_USER_INFO"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(AuthUserInfo, null, 2)
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async ctx => {
  // Get the AuthUserInfo object, set if the server-rendered page is wrapped in
  // the `withAuthUser` higher-order component
  const AuthUserInfo = get(ctx, "myCustomData.AuthUserInfo", null);

  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps, AuthUserInfo };
};

export default CustomDocument;
