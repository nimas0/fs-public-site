"use strict";

import React from "react";
import Head from "next/head";
import ErrorPage from "next/error";
import "../styles.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default ({ Component, pageProps }) => {
  return (
    <>
      {/* prettier-ignore */}
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700|Open+Sans:300,400,600,700&display=swap" rel="stylesheet" />
      </Head>

      {pageProps.statusCode ? (
        <ErrorPage statusCode={pageProps.statusCode} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
};


