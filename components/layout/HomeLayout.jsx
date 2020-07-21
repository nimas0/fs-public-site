import React from 'react';
import Nav from '../Nav';
import HomeNav from '../navigation/HomeNav';
import withAuthUser from '../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../utils/pageWrappers/withLoginModal';

const HomeLayout = ({ AuthUser, showLoginModal, children }) => (
   <>
      <HomeNav AuthUser={AuthUser} showLoginModal={showLoginModal} />
      {children}
   </>
);

export default HomeLayout;
