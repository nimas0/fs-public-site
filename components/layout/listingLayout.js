import React from 'react';
import Nav from '../Nav';

const ListingLayout = (props) => (
    <>
        <Nav search={true} />
        {props.children}
    </>
)

export default ListingLayout;