/* eslint-disable react/jsx-wrap-multilines */
import React, { useContext } from 'react';
import { Button, Box } from 'theme-ui';
import { Scrollbars } from 'react-custom-scrollbars';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { Link as ScrollLink } from 'react-scroll';
import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from 'antd';
import logoDark from '../../public/assets/logo-dark.svg';
import Logo from '../logo';

import { DrawerContext } from '../../contexts/drawer/drawer.context';
import menuItems from './header.data';
import Drawer from '../drawer';
import logout from '../../utils/auth/logout';
import Image from '../image';

const UserDrawer = ({ AuthUser, showLoginModal }) => {
  const { state, dispatch } = useContext(DrawerContext);
  const router = useRouter();
  console.log('AuthUser', AuthUser);
  const [
    subscriptions,
    loadingSubscriptions,
    errorSubscriptions,
  ] = useCollection(
    firebase
      .firestore()
      .collection('subscriptions')
      .where('buyerUid', '==', (AuthUser && AuthUser.id) || '1')
    // {
    //   snapshotListenOptions: { includeMetadataChanges: true },
    // }
  );

  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: 'TOGGLE',
    });
  }, [dispatch]);

  const logoutRefresh = async () => {
    try {
      await logout();
      console.log('routerpath', router.pathname);
    } finally {
      toggleHandler();
      if (router.pathname.match(/listing/)) {
        router.replace(router.pathname, router.asPath);
      } else {
        router.push('/');
      }
    }
  };

  const handleLogin = async () => {
    toggleHandler();
    await showLoginModal();
  };

  if (errorSubscriptions)
    return <strong>Error: {/* {JSON.stringify(error)} */}</strong>;

  return (
    <Drawer
      width='320px'
      drawerHandler={
        <Box sx={styles.handler}>
          {AuthUser ? (
            <div>
              <Avatar sx={styles.profile} src={AuthUser.photoURL} />
            </div>
          ) : (
            <FontAwesomeIcon color='darkGrey' size='2x' icon={faUserCircle} />
          )}
        </Box>
      }
      //   {isListingPage && (
      //     <Link
      //       path='https://seller.findingspaces.com'
      //       ml={2}
      //       sx={styles.profileButton}
      //     >
      //       {auth ? (
      //         <Avatar src={auth.photoURL} />
      //       ) : (
      //         <FontAwesomeIcon
      //           color='darkGrey'
      //           size='2x'
      //           icon={faUserCircle}
      //         />
      //       )}
      //     </Link>
      //   )}

      open={state.isOpen}
      toggleHandler={toggleHandler}
      closeButton={<IoMdClose size='24px' color='#02073E' />}
      drawerStyle={styles.drawer}
      closeBtnStyle={styles.close}
    >
      <Scrollbars autoHide>
        <Box sx={styles.content}>
          {AuthUser ? (
            <div>
              <Avatar sx={styles.profile} src={AuthUser.photoURL} />
              <h5 style={{ marginTop: '1rem' }}>{AuthUser.displayName}</h5>
            </div>
          ) : (
            <FontAwesomeIcon color='darkGrey' size='2x' icon={faUserCircle} />
          )}
          {loadingSubscriptions && 'Loading...'}
          {subscriptions &&
            subscriptions.docs.map((subscription) => (
              <div className='rounded-sm my-3  '>
                <button
                  onClick={() =>
                    router.push(`/listing/${subscription.data().listingId}`)
                  }
                  size='lg'
                  className='bg-info py-2 text-white w-100'
                >
                  <FontAwesomeIcon
                    className='mr-2'
                    size='sm'
                    icon={faHome}
                    color='white'
                  />{' '}
                  {subscription.data().listing.address[0]}
                </button>
              </div>
            ))}
          <Box sx={styles.menu}>
            {[
              // { path: 'asdfasdf', label: 'Learn More' },
              // { path: 'asdfasdf', label: 'Settings' },
            ].map(({ path, label }, i) => (
              <ScrollLink
                activeClass='active'
                to={path}
                spy
                smooth
                offset={10}
                duration={500}
                key={i}
              >
                {label}
              </ScrollLink>
            ))}
          </Box>

          <Box sx={styles.menuFooter}>
            <Button
              as='a'
              href='https://seller.findingspaces.com'
              variant='primary'
              sx={styles.button1}
            >
              Go to Seller Dashboard
            </Button>
            <Button
              variant='primary'
              sx={styles.button2}
              onClick={AuthUser ? logoutRefresh : handleLogin}
            >
              {AuthUser ? 'Logout' : 'Login'}
            </Button>
          </Box>
        </Box>
      </Scrollbars>
    </Drawer>
  );
};

const styles = {
  handler: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    width: '26px',
    mx: '1rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  profile: {},
  drawer: {
    width: '100%',
    height: '100%',
    background: '#fff',
  },

  close: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '30px',
    right: '30px',
    zIndex: '1',
  },

  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    pt: '30px',
    pb: '40px',
    px: '30px',
  },

  menu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',

    a: {
      fontSize: '16px',
      fontWeight: '400',
      color: 'black',
      py: '5px',
      cursor: 'pointer',
    },
  },

  menuFooter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mb: 'auto',
  },
  button1: {
    fontSize: '15px',
    fw: '700',
    height: '48px',
    borderRadius: '3px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'green',
    justifyContent: 'center',
    py: '0',
  },
  button2: {
    fontSize: '15px',
    fw: '700',
    height: '48px',
    borderRadius: '3px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    py: '0',
    my: '7px',
    backgroundColor: 'green',
    color: '#fff',
  },
};

export default UserDrawer;
