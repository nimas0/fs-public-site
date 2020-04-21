"use strict";

import React, { useState } from "react";
import LoginModal from "../../components/LoginModal";

export default ComposedComponent => {
  const WithLoginModalComp = props => {
    const [modalShown, setModalShown] = useState(false);

    return (
      <>
        <ComposedComponent showLoginModal={() => setModalShown(true)} {...props} />
        <LoginModal shown={modalShown} setShown={setModalShown} />
      </>
    );
  };

  WithLoginModalComp.getInitialProps = async ctx => {
    let composedInitialProps = {};
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx);
    }

    return { ...composedInitialProps };
  };

  WithLoginModalComp.displayName = `WithLoginModal(${ComposedComponent.displayName})`;

  WithLoginModalComp.defaultProps = {};

  return WithLoginModalComp;
};
