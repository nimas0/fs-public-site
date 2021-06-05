import React, { useRef, useState } from "react";
import {
  Card,
  Row,
  Col,
  Tab,
  Tabs,
  Image,
  Button,
  Nav,
  Dropdown,
  Alert,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHamburger,
  faEllipsisV,
  faArrowRight,
  faHeart,
  faShareAlt,
  faCommentDots,
  faCommentsDollar,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import clsx from "clsx";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import { useDocument } from "react-firebase-hooks/firestore";
import Details from "./Details";
import Action from "./Action";
import GenericModal from "../../../GenericModal";
import useResizeObserver from "../../../../utils/useResizeObserver";
import WidgetAction from "../../../WidgetAction";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=''
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <FontAwesomeIcon icon={faEllipsisV} />
    {children}
  </a>
));

const handleUnsubscribe = async (interestId) => {
  // setSuccess(false);
  // setFailure(false);
  // setSending(true);
  console.log("test");
  try {
    // Send offer info through API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/unsubscribe-listing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interestId }),
    });

    // Set up message object, create key, and post to firebase real time //
    // const { amount, deposit } = values;
    // const responseJson = await response.json()
    // const docId = responseJson.docId;

    if (response.ok) {
      // Move on

      // await router.push('/buyer/dashboard')
      // addToast(`Offer has been successfully submitted! You will be notified within 48 hours or less with the sellers response`, { appearance: 'success' })
      // setSending(false);
      // setSuccess(true);
      console.log(await response.json());
      console.log("unsubscribe successful");
    } else {
      // https://github.com/developit/unfetch#caveats
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (err) {
    // Add upload failure message
    // setSuccess(false);
    console.log(err);
    console.error("Either a coding error or network issues", err.response);
    // addToast(
    //    `Sorry something went wrong. Please try again. If this error persists please contact customer support. ${err.response.status} ${err}`,
    //    {
    //       appearance: 'error',
    //    }
    // );

    // setSending(false);
  }
};

const SubscriptionCard = ({
  subscriptionData,
  verification,
  interestId,
  firebase,
}) => {
  const [key, setKey] = useState("action");
  const miniWidget = useRef(0);
  const router = useRouter();
  const [modalShow, setModalShow] = React.useState(false);
  const breakpoint = useMediaBreakpoints();
  const instructions = () => (
    <ListGroup>
      <p className='mb-5'>
        Congratulations! You and the seller have agreed on the essential terms
        of the offer. Below are the steps needed to complete the remainder of
        the process and get the keys to your new home!
      </p>
      <Button className='bg-primary' onClick={() => setModalShow(true)}>
        See Next Steps
      </Button>
    </ListGroup>
  );

  // react hook for firebase firestore listener
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`interest/${interestId}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const ModalBody = () => (
    <>
      <ListGroup>
        <h6 className='mb-5 mt-2 p-2'>
          <b> Congratulations!</b>
          {' '}
          You and the seller have agreed on the
          essential terms of the offer. Below are the steps needed to complete
          the remainder of the process and get the keys to your new home!
        </h6>
        <ListGroup.Item>
          <h5>
            <b> 1. Acquire a purchase agreement</b>
          </h5>
          Now, since you and the seller have agreed to the essential terms, it's
          time to make it official. A purchase agreement is a document (required
          by law) that states all terms and timelines of a real estate
          transaction. Download our free purchase agreement contract. It has
          been drafted by and reviewed by attorneys in Arizona and meets all the
          binding contract requirements.
          <Button variant='outlined' size='lg' className='text-primary'>
            <h6 className='pt-3 text-primary'>
              <b>Download Purchase Agreement</b>
            </h6>
          </Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>
            <b>2. Fill out purchase agreement</b>
          </h5>
          {" "}
          Fill out the purchase agreement according to the terms and conditions
          you and the seller agreed on. The contract will have more information
          to fill out; make sure to read thoroughly and contact a lawyer if you
          run into any complications.
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>
            <b>3. Send to Seller</b>
          </h5>
          {" "}
          After completion of the purchase agreement, the seller will need to
          review and sign. We recommend that you upload your document directly
          to the seller through the Finding Spaces dashboard; This will allow
          you and the seller to communicate and hash out terms quickly.
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>
            <b>4. Notify Title Company</b>
          </h5>
          {" "}
          Next, deliver the completed and signed contract with the agreed amount
          of earnest deposit to the title company stated in the agreement. You
          and the seller can negotiate who hires a title company and pays
          associated fees. The title company will order the title, property tax
          information, loan balances, and other necessary paperwork. You can
          typically use your title company as an escrow agent at no extra
          charge. The escrow agent will also serve as a third party who holds
          money in a trust until a property sale closes.
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>
            <b>5. Contengencies</b>
          </h5>
          {" "}
          It's your responsibility to remove all contingencies in the proper
          timelines stated in the contract. The Finding Spaces dashboard will
          remain available for you to chat, schedule appointments, and exchange
          documents with the seller.
          {" "}
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>
            <b>6. Home Sold</b>
          </h5>
          {" "}
          Once all contingencies have been uplifted, it will be time to close
          the deal. The title company will provide you with the documents you
          need for the closing process. After the documents are signed and
          recorded and the funds transferred to the seller, you will receive the
          keys to your new home!
        </ListGroup.Item>
      </ListGroup>
    </>
  );

  const SubscriptionView = (type) => {
    const Views = {
      accepted: () => (
        <h2
          id='tour-this-home-heading'
          className={clsx(
            "text-center w-100  text-primary mt-5 pb-4 pl-1",
            breakpoint.lg && "h3"
          )}
        >
          Offer Accepted
        </h2>
      ),
      acceptedContent: () => (
        <>
          <Alert variant='primary'>
            You are getting closer to buying a home!
          </Alert>
          {instructions()}
        </>
      ),
      default: () => (
        <h5
          id='tour-this-home-heading'
          className={clsx(
            "text-center w-100  text-primary mt-5 pb-4 pl-1",
            breakpoint.lg && "h3"
          )}
        >
          Tour this Home
        </h5>
      ),
      defaultContent: () => <p>asldfj</p>,
      rejected: () => (
        <>
          <h4
            className={clsx(
              "text-center w-100 text-success mt-5 pl-3",
              breakpoint.lg && "h3"
            )}
          >
            {" "}
            Offer Rejected.
          </h4>
          <h6
            id='tour-this-home-heading'
            className={clsx(
              "text-center w-100 pb-4 text-error  pl-3",
              breakpoint.lg && "h3"
            )}
          >
            Try chatting with the buyer to resolve any issues. Once resolved,
            you can resubmit a new offer.
          </h6>
        </>
      ),
      rejectedContent: () => (
        <>
          <Alert variant='success'>
            Don't worry! It is common to get a rejection. Just chat with seller
            and see if you can work out the differences.
          </Alert>
          <ListGroup>
            {/* <h6>You can submit another proposal at anytime.</h6> */}
          </ListGroup>
        </>
      ),
    };

    return (Views[type] || Views.default)();
  };

  if (error) return (
    <strong>
      Error:
      {' '}
      {/* {JSON.stringify(error)} */}
    </strong>
);
  if (loading) return "loading";
  console.log(
    "subscriptionData.proposal.state",
    subscriptionData.proposal.state
  );
  return (
    <>
      <Row>
        <Col>
          <Card className=' rounded-0 border-0 bg-white mb-4'>
            <Tab.Container
              id='left-tabs-example'
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Button
                id='tour-this-home2'
                aria-labelledby='tour-this-home-heading'
                className={` w-100  border-0 rounded-0 bg-primary text-white py-3 px-4 mx-n5 mx-md-n3 mx-lg-0 pb-2 mb-5 my-n2 ${
                  breakpoint.up.lg ? " position-sticky" : ""
                }`}
                style={
                  breakpoint.up.lg
                    ? { top: "8rem", zIndex: 1030 }
                    : { zIndex: 1030 }
                }
              >
                <Row>
                  <Col xs='10'>Sign up and Sell your home</Col>
                  <Col xs='auto'>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Col>
                </Row>
              </Button>

              <Card.Header
                className='pt-4 mt-1  bg-white text-muted  mb-0'
                as='h5'
              >
                <Row
                  style={
                    breakpoint.up.lg
                      ? { top: "8rem", zIndex: 1030 }
                      : { zIndex: 1030 }
                  }
                  className=''
                >
                  <Col xs={11} className=' pb-4'>
                    {subscriptionData.buyerMessageCounter > 0 ? (
                      <Badge
                        variant='success'
                        className='px-3 py-1 mr-3 text-white'
                      >
                        {subscriptionData.buyerMessageCounter}
                        {' '}
                        New Messages
                      </Badge>
                    ) : null}
                  </Col>
                  {/* { Generate SideBar} */}
                  {subscriptionData &&
                    SubscriptionView(
                      (subscriptionData.proposal &&
                        subscriptionData.proposal.state) ||
                        "default"
                    )}
                </Row>
              </Card.Header>
              <Card.Body className='text-center pb-3'>
                <Tab.Content>
                  <Tab.Pane eventKey='action'>
                    <Action
                      verification={verification}
                      subscriptionData={subscriptionData}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey='details'>
                    <Details quickFacts={subscriptionData.quickFacts} />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
              <Card.Body>
                {subscriptionData &&
                  SubscriptionView(
                    (subscriptionData.proposal &&
                      `${subscriptionData.proposal.state}Content`) ||
                      "defaultContent"
                  )}
              </Card.Body>
            </Tab.Container>
            <Row
              noGutters
              className='text-center mx-auto mb-3'
              style={{ width: breakpoint.lg ? "16rem" : "100%" }}
            >
              <Col xs={7} sm={3} lg={7} xl={6} className='mb-3'>
                <WidgetAction
                  // handleClick={handleSubscribe}
                  label='Subscribe to Updates'
                  icon={faHeart}
                  href='#'
                  isSubscribed={!!value.data()}
                />
              </Col>
              <Col xs={5} sm={3} lg={5} xl={6} className='mb-3'>
                <WidgetAction
                  // handleClick={handleSubscribe}
                  label='Share'
                  icon={faShareAlt}
                  href='#'
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* <Card
          ref={miniWidget}
          id='tour-this-home-mini'
          className='position-sticky py-2 px-2 mx-n2 mx-md-n3 mb-5'
          style={{
            marginTop: -miniWidget.current.clientHeight - 2 - 3 * 16 || 0,
            top: 0,
            zIndex: 1020,
          }}
        > */}

        {/* </Card> */}
      </Row>
      <GenericModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        header='Informal Offer Accepted'
        body={<ModalBody />}
      />
    </>
  );
};

export default SubscriptionCard;
