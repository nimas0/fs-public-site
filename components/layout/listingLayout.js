import React from 'react';
import Nav from '../Nav';

const ListingLayout = (props) => (
    <>
        <Nav search={true} />
        {props.children}
        <style jsx global>{`
        body {
         background-color: #ededed
        }
        h1 {
          font-weight: 700;
        }
        p {
          margin-bottom: 10px;
        }
      `}</style>
    </>
    </>
)

export default ListingLayout;