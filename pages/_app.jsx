

import React, { useEffect } from 'react';
import Head from 'next/head';
import ErrorPage from 'next/error';
import '../styles.scss';
import '../style.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import 'swiper/swiper-bundle.min.css';
import 'rc-drawer/assets/index.css';
import gtm from '../config/gmt';

config.autoAddCss = false;


const MyApp = ({ Component, pageProps }) => {
  
  const gtmConfig = {containerId: "GTM-KSKMSHD"};
    

  

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);
  
   return (
     <>
       {/* prettier-ignore */}
       <Head>
         <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

         {/* Favicons */}
         <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
         <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
         {/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-32x32.png" /> */}
         <link rel="manifest" href="/site.webmanifest" />
         <link rel="stylesheet" href="/node_modules/owl.carousel/dist/assets/owl.carousel.min.css" />
         <link
           rel="stylesheet"
           href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
         />

         {/* Fonts */}
         <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700|Roboto:300,400,600,700&display=swap" rel="stylesheet" />
       </Head>

       {pageProps.statusCode ? (
         <ErrorPage statusCode={pageProps.statusCode} />
         ) : (
           <>
             <ToastProvider autoDismiss autoDismissTimeout={6000} placement='bottom-right'>
               <Component {...pageProps} />
             </ToastProvider>
           </>
         )}
     </>
   )}
         ;

         export default MyApp;
