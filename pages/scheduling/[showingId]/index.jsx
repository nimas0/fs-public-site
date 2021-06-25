import { useRouter } from 'next/router';
import React from 'react'
import { Container, Col } from 'react-bootstrap';
import moment from 'moment'
import MobileNav from "../../../components/MobileNav";
import withAuthUser from '../../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../../utils/pageWrappers/withLoginModal';
import GenerateView from './GenerateView'


const SchedulingPage = ({
  AuthUserInfo,
  showLoginModal,
  address,
  scheduled,
  photoURL,
  listing,
  schedules: stringSchedules,
}) => {

const [sending, setSending] = React.useState(false);
const [success, setSuccess] = React.useState(false);
const [error, setError] = React.useState(false);
const [reason, setReason] = React.useState(null);
const [startDate, setStartDate] = React.useState(null)
const router = useRouter();

const { AuthUser = null } = AuthUserInfo;

async function handleCancelSubmit() {
  setSending(true);
  setError(false);
  try {
    if(reason === null) throw new Error('Must select a reason')
    // Send offer info through API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tour-status-change?showingId=${router.query.showingId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason,
          type: 'cancel'
        }),
      }
    );
    const message = await response.json();
    console.log('message', message)
    if (response.ok) {
      // Move on
      setSending(false);
      setSuccess(true);
      // Refresh page to disable conflicting times
      router.replace(
        "/listing/[listingId]",
        `/listing/${router.query.listingId}`
      );
    } else {
      // https://github.com/developit/unfetch#caveats
      throw new Error(message.message);

    }
  } catch (err) {
    // Add upload failure message
    setSuccess(false);
    setError(err)
    console.log('front end err', err.message);
    setSending(false);
  }
}



return (
  <>
    <MobileNav showLogo {...{ AuthUser, showLoginModal }} />
    <Container className='d-flex flex-column justify-content-center align-items-center my-5'>
      <Col className=' align-items-center' xs='12' lg='6'>
        <p className='text-danger  text-center pb-0 mb-0'>
          Your appointment is
          {' '}
          {moment(scheduled).fromNow()}

        </p>
        <h5 className='pb-3 mt-0 text-center'>{address}</h5>
        <h3 className='text-primary mb-0 text-center'><b>{moment(scheduled).format('dddd MMMM Do YYYY')}</b></h3>
        <div className='text-center pb-3'>
          <h3 className='text-primary d-inline mt-0 '>{moment(scheduled).format('h:mm a') }</h3>
          <h3 className='text-primary d-inline mt-0 '> - </h3>
          <h3 className='text-primary d-inline mt-0 '>{moment(scheduled).add(1, 'hours').format('h:mm a') }</h3>
        </div>
      </Col>
      <GenerateView
        photoURL={photoURL}
        AuthUser={AuthUser}
        stringSchedules={stringSchedules}
        showLoginModal={showLoginModal}
        listing={listing}
        setStartDate={setStartDate}
        startDate={startDate}
        reason={reason}
        setReason={setReason}
        sending={sending} 
        appointmentDateTime={moment(scheduled).format('dddd MMMM Do YYYY h:mm a ')}
        setSending={setSending} 
        success={success} 
        setSuccess={setSuccess}
        error={error}
        handleCancelSubmit={handleCancelSubmit}
      />
 
    </Container>
  </>
)



}

SchedulingPage.getInitialProps = async (ctx, req) => {

  // Handle if user reschedules or cancels
  const showingFetch = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tour-status-change?showingId=${ctx.query.showingId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

 // Get listing data
  const listingFetch = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/listing?id=${ctx.query.listingId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  // Get current tour schedules for listing and user
  const tourSchedulesFetch = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tour-schedules?listingId=${
      ctx.query.listingId
    }${
      ctx.myCustomData.AuthUserInfo.AuthUser
        ? `&userId=${ctx.myCustomData.AuthUserInfo.AuthUser.id}`
        : ""
    }`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );



  try {
    // Resolve both fetches
    const [showingResponse, listingResponse, tourSchedulesResponse] = await Promise.all([
      showingFetch,
      listingFetch,
      tourSchedulesFetch,
    ]);


  //  Handle response from API
    if (listingResponse.ok && tourSchedulesResponse.ok && showingResponse.ok) {
      const {
        listingSchedule,
        userSchedule,
      } = await tourSchedulesResponse.json();
      console.log('listingschedule', listingSchedule)
      const {
        doc,
        scheduled
      } = (await showingResponse.json());
     
      return {
        ...(await listingResponse.json()),
        schedules: {
          listing: listingSchedule,
          user: userSchedule,
        },
        address: doc.address, 
        scheduled,
        photoURL: doc.photoURL,
        listingId: doc.listingId
      };
    
    }

    if ([404, 503].includes(listingResponse.status)) {
      return { statusCode: listingResponse.status };
    }
    if ([404, 503].includes(tourSchedulesResponse.status)) {
      return { statusCode: tourSchedulesResponse.status };
    }
    if ([404, 503].includes(showingResponse.status)) {
      return { statusCode: showingResponse.status };
    }
   
    // // https://github.com/developit/unfetch#caveats
    const error = new Error(listingResponse.statusText);
    error.response = listingResponse;
    throw error;
  } catch (err) {
    console.log(err);
    return {
      statusCode:
        (err.response && err.response.status) || err.statusCode || 500,
    };
  }
};

export default withAuthUser(withAuthUserInfo(withLoginModal(SchedulingPage)));