require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const optimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');

const nextConfiguration = {
  target: 'serverless', // will output independent pages that don't require a monolithic server. It's only compatible with next start or Serverless deployment platforms (like ZEIT Now) — you cannot use the custom server API.
};

module.exports = withSass(
  withCSS({
    env: {
      API_KEY: process.env.API_KEY,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      DATABASE_URL: process.env.DATABASE_URL,
      PROJECT_ID: process.env.PROJECT_ID,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      APP_ID: process.env.APP_ID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID,
      PRIVATE_KEY: process.env.PRIVATE_KEY,
      CLIENT_EMAIL: process.env.CLIENT_EMAIL,
      SESSION_SECRET_CURRENT: process.env.SESSION_SECRET_CURRENT,
      SESSION_SECRET_PREVIOUS: process.env.SESSION_SECRET_PREVIOUS,
      HOST: process.env.HOST,
    },
  })
);

module.exports = withPlugins(
  [optimizedImages],
  [
    withCSS({
      env: {
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        DATABASE_URL: process.env.DATABASE_URL,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        MEASUREMENT_ID: process.env.MEASUREMENT_ID,
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        CLIENT_EMAIL: process.env.CLIENT_EMAIL,
        SESSION_SECRET_CURRENT: process.env.SESSION_SECRET_CURRENT,
        SESSION_SECRET_PREVIOUS: process.env.SESSION_SECRET_PREVIOUS,
        HOST: process.env.HOST,
      },
    }),
  ],
  [withSass()],
  nextConfiguration
);
