import React from 'react';
import Nav from '../Nav';

const HomeLayout = (props) => (
    <>
        <Nav search={true} />
        {props.children}
    </>
)

export default HomeLayout;