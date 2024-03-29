import React, { Fragment } from 'react';
import { Box } from 'theme-ui';
import RcDrawer from 'rc-drawer';

const Drawer = ({
  className,
  children,
  closeButton,
  closeButtonStyle,
  drawerHandler,
  toggleHandler,
  open,
  width,
  placement,
  drawerStyle,
  closeBtnStyle,
  ...props
}) => (
  <>
    <RcDrawer
      showMask={false}
      open={open}
      onClose={toggleHandler}
      className={`drawer ${className || ''}`.trim()}
      width={width}
      placement={placement}
      handler={false}
      level={null}
      duration='0.5s'
      {...props}
    >
      {closeButton && (
        <Box as='div' onClick={toggleHandler} sx={closeBtnStyle}>
          {closeButton}
        </Box>
      )}
      <Box sx={drawerStyle}>{children}</Box>
    </RcDrawer>
    <Box
      className='drawer__handler'
      style={{ display: 'inline-block' }}
      onClick={toggleHandler}
    >
      {drawerHandler}
    </Box>
  </>
);

Drawer.defaultProps = {
  width: '320px',
  placement: 'right',
};

export default Drawer;
