import React from 'react';
import Nav from '../Nav';
import MainNav from '../navigation/MainNav';
import Head from 'next/head'

const MainLayout = (props) => (
  <>
    <Head>
      <body />
    </Head>
    <MainNav search={true} />
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
)

export default MainLayout;