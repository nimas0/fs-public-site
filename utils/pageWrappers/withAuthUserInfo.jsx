// Adapted from https://github.com/zeit/next.js/blob/canary/examples/with-firebase-authentication

"use strict";

import React from "react";
import { get } from "lodash/object";
import { AuthUserInfoContext } from "../auth/hooks";

// Provide an AuthUserInfo prop to the composed component
export default ComposedComponent => {
  const WithAuthUserInfoComp = props => {
    const { AuthUserInfo: AuthUserInfoFromSession, ...otherProps } = props;
    return (
      <AuthUserInfoContext.Consumer>
        {AuthUserInfo => (
          <ComposedComponent
            {...otherProps}
            AuthUserInfo={AuthUserInfo || AuthUserInfoFromSession}
          />
        )}
      </AuthUserInfoContext.Consumer>
    );
  };

  WithAuthUserInfoComp.getInitialProps = async ctx => {
    const AuthUserInfo = get(ctx, "myCustomData.AuthUserInfo", null);

    // Evaluate the composed component's getInitialProps()
    let composedInitialProps = {};
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx);
    }

    return {
      ...composedInitialProps,
      AuthUserInfo
    };
  };

  WithAuthUserInfoComp.displayName = `WithAuthUserInfo(${ComposedComponent.displayName})`;

  WithAuthUserInfoComp.defaultProps = {};

  return WithAuthUserInfoComp;
};
