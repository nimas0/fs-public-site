'use strict';

import React, { useState } from 'react';
import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import fetch from 'isomorphic-unfetch';
import { Settings as LuxonSettings, DateTime, Interval } from 'luxon';
import useMediaBreakpoints from '@tywmick/use-media-breakpoints';
import Nav from '../../../components/Nav';
import AtAGlance from '../../../components/AtAGlance';
import SchedulingWidget from '../../../components/SchedulingWidget';
import QuestionsAndAnswers from '../../../components/QuestionsAndAnswers';
import Documents from '../../../components/Documents';
import HomeDetails from '../../../components/HomeDetails';
import TabWidgets from '../../../components/TabWidgets';
import Footer from '../../../components/Footer';
import getSpecificAvailability from '../../../utils/getSpecificAvailability';
import withAuthUser from '../../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../../utils/pageWrappers/withLoginModal';

// URL to test: http://localhost:3000/listing/KDfFS1FtGblMYSrzLDCZ

const Listing = ({
   AuthUserInfo,
   listing,
   questions,
   documents,
   owner,
   schedules: stringSchedules,
   showLoginModal,
}) => {
   const { AuthUser = null } = AuthUserInfo;
   const breakpoint = useMediaBreakpoints();
   const { timeZone } = listing;
   LuxonSettings.defaultZoneName = timeZone;

   // Convert schedules to Intervals
   const schedules = {
      listing: stringSchedules.listing.map((tour) =>
         Interval.fromDateTimes(DateTime.fromISO(tour.start), DateTime.fromISO(tour.end))
      ),
      ...(stringSchedules.user && {
         user: stringSchedules.user.map((tour) =>
            Interval.fromDateTimes(DateTime.fromISO(tour.start), DateTime.fromISO(tour.end))
         ),
      }),
   };

   // Listing tour availability
   const { days: dayAvailability } = listing.generalAvailability;
   const {
      halfHourly: halfHourAvailability,
      hourly: hourAvailability,
      isHourly: hourly,
   } = listing.generalAvailability;
   const generalTimeAvailability = hourly ? hourAvailability : halfHourAvailability;

   /// Set first available date
   // Default to today if no availability in next month
   let tourFirstAvailableDate = DateTime.local().startOf('day');
   // Find first availability in next month
   for (
      let d = 0;
      DateTime.local().plus({ days: d }) <= DateTime.local().plus({ months: 1 });
      d++
   ) {
      // Check day-level general listing availability
      if (
         dayAvailability[
            DateTime.local()
               .plus({ days: d })
               .weekdayLong.toLowerCase()
         ]
      ) {
         // Check time availability
         if (
            getSpecificAvailability(
               generalTimeAvailability,
               hourly ? 1 : 0.5,
               schedules
            )(DateTime.local().plus({ days: d })).length > 0
         ) {
            // If date passes all these, set as tourFirstAvailableDate and exit loop
            tourFirstAvailableDate = DateTime.local()
               .startOf('day')
               .plus({ days: d });
            break;
         }
      }
   }

   // Other scheduling widget state
   const [tourFirstDate, setTourFirstDate] = useState(tourFirstAvailableDate);
   const [tourActiveDate, setTourActiveDate] = useState(null);

   return (
      <>
         <Head>
            <title>
               Finding Spaces – {listing.address[0]}, {listing.address[1]}
            </title>
         </Head>

         <Nav
            address={breakpoint.up.lg ? listing.address[0] + ', ' + listing.address[1] : false}
            {...{ AuthUser, showLoginModal }}
         />

         {/* Switch bsPrefix="container-md" to fluid="md" when react-bootstrap releases fix */}
         <Container bsPrefix='container-md'>
            {breakpoint.down.md && (
               <Row as='h1' className='h4 mx-auto mb-3' style={{ width: 'max-content' }}>
                  {listing.address[0]}
                  {breakpoint.xs ? <br /> : ', '}
                  {listing.address[1]}
               </Row>
            )}

            <Row as='main'>
               <Col lg>
                  <AtAGlance
                     activity={listing.activity}
                     price={listing.currentPrice}
                     beds={listing.bedrooms}
                     baths={listing.fullBaths + 0.5 * listing.halfBaths}
                     sqFt={listing.totalFinishedSqFt}
                     pricePerSqFt={Math.round(listing.currentPrice / listing.totalFinishedSqFt)}
                     photos={listing.photos}
                     address={`${listing.address[0]}, ${listing.address[1]}`}
                     ownerName={owner.displayName}
                     ownerPhotoSrc={owner.photoURL}
                  />

                  {breakpoint.down.md && (
                     <SchedulingWidget
                        firstAvailableDate={tourFirstAvailableDate}
                        firstDate={tourFirstDate}
                        setFirstDate={setTourFirstDate}
                        activeDate={tourActiveDate}
                        setActiveDate={setTourActiveDate}
                        dayAvailability={dayAvailability}
                        getTimeAvailability={getSpecificAvailability(
                           generalTimeAvailability,
                           hourly ? 1 : 0.5,
                           schedules
                        )}
                        {...{ timeZone, AuthUser, showLoginModal }}
                     />
                  )}

                  <QuestionsAndAnswers
                     as='section'
                     questions={questions}
                     limit={5}
                     AuthUser={AuthUser}
                  />

                  <Documents documents={documents} />

                  <HomeDetails details={listing.homeDetails} features={listing.homeFeatures} />

                  <TabWidgets />
               </Col>

               {breakpoint.up.lg && (
                  <Col lg='auto'>
                     <SchedulingWidget
                        firstAvailableDate={tourFirstAvailableDate}
                        firstDate={tourFirstDate}
                        setFirstDate={setTourFirstDate}
                        activeDate={tourActiveDate}
                        setActiveDate={setTourActiveDate}
                        dayAvailability={dayAvailability}
                        getTimeAvailability={getSpecificAvailability(
                           generalTimeAvailability,
                           hourly ? 1 : 0.5,
                           schedules
                        )}
                        {...{ timeZone, AuthUser, showLoginModal }}
                     />
                  </Col>
               )}
            </Row>
         </Container>

         <Footer />

         <style jsx global>{`
            body {
               background-color: #ededed;
            }
            h1 {
               font-weight: 700;
            }
            p {
               margin-bottom: 10px;
            }
         `}</style>
         
      </>
   );
};

Listing.getInitialProps = async (ctx) => {
   // Get current listing data from database
   const listingFetch = fetch(`${process.env.HOST}/api/listing?id=${ctx.query.listingId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
   });

   // Get current tour schedules for listing and user
   const tourSchedulesFetch = fetch(
      `${process.env.HOST}/api/tour-schedules?listingId=${ctx.query.listingId}${
         ctx.myCustomData.AuthUserInfo.AuthUser
            ? `&userId=${ctx.myCustomData.AuthUserInfo.AuthUser.id}`
            : ''
      }`,
      {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
      }
   );

   try {
      // Resolve both fetches
      const [listingResponse, tourSchedulesResponse] = await Promise.all([
         listingFetch,
         tourSchedulesFetch,
      ]);

      // Handle response from API
      if (listingResponse.ok && tourSchedulesResponse.ok) {
         const { listingSchedule, userSchedule = null } = await tourSchedulesResponse.json();
         return {
            ...(await listingResponse.json()),
            schedules: {
               listing: listingSchedule,
               ...(userSchedule && { user: userSchedule }),
            },
         };
      } else if ([404, 503].includes(listingResponse.status)) {
         return { statusCode: listingResponse.status };
      } else if ([404, 503].includes(tourSchedulesResponse.status)) {
         return { statusCode: tourSchedulesResponse.status };
      } else {
         // https://github.com/developit/unfetch#caveats
         let error = new Error(listingResponse.statusText);
         error.response = listingResponse;
         throw error;
      }
   } catch (err) {
      console.log(err);
      return {
         statusCode: (err.response && err.response.status) || err.statusCode || 500,
      };
   }
};

// `withAuthUser` gets the authed user server-side, which disables static
// rendering. `withAuthUserInfo` includes the authed user as a prop to the
// component.
export default withAuthUser(withAuthUserInfo(withLoginModal(Listing)));
