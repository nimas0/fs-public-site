/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useCallback } from 'react';
import Sticky from 'react-stickynode';
import { Waypoint } from 'react-waypoint';
import {
  useStickyState,
  useStickyDispatch,
} from '../contexts/app/app.provider';

import Header from './header/header';
import Footer from './footer/footer';

export default function Layout({ auth, showLoginModal, children }) {
  const isSticky = useStickyState('isSticky');
  const dispatch = useStickyDispatch();
  const setSticky = useCallback(() => dispatch({ type: 'SET_STICKY' }), [
    dispatch,
  ]);
  const removeSticky = useCallback(() => dispatch({ type: 'REMOVE_STICKY' }), [
    dispatch,
  ]);

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (currentPosition === 'above') {
      setSticky();
    }
    if (currentPosition === 'below') {
      removeSticky();
    }
  };

  return (
    <React.Fragment>
      <Sticky enabled={isSticky} innerZ={991}>
        <Header
          showLoginModal={showLoginModal}
          auth={auth}
          className={`${isSticky ? 'sticky' : 'unSticky'}`}
        />
      </Sticky>
      <Waypoint
        onEnter={removeSticky}
        // onLeave={setSticky}
        onPositionChange={onWaypointPositionChange}
      />
      <main
        sx={{
          variant: 'layout.main',
        }}
      >
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
}
