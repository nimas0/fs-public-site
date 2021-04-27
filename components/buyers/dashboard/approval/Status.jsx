import React from "react";
import { Card, Row, Col, Button, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFrownOpen,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export const Pending = () => (
  <Row>
    <Card className='border-0 bg-transparent'>
      <Card.Body className='text-center py-1'>
        <div className='text-success d-flex justify-content-start py-3 '>
          <FontAwesomeIcon size='2x' icon={faCheck} />
          <h4 className='ml-3 text-success pt-1'>Pending Review</h4>
        </div>
        <h6 className='text-dark text-left px-1 mt-0 pt-0'>
          Scheduling has been unlocked. You will be notified of your approval
          within 3 hours of submittion.
        </h6>
      </Card.Body>
    </Card>
  </Row>
);

export const Approved = ({
  verification: { createdAt, lender, loanType, verifType, amount, documentURL },
}) => (
  <>
    <Card className='rounded-0 bg-transparent border-0 mx-0 px-0 w-100 my-1'>
      <Card.Body className='bg-transparent text-center pt-0 pb-1 '>
        <Row xs={12} className='pt-1 pl-0'>
          <h5 className='text-primary pl-0'>
            <FontAwesomeIcon
              size='2x'
              color='primary'
              className='pr-2 pl-0 mt-n1'
              icon={faCheck}
            />
            You are approved{" "}
          </h5>
          <p className='text-primary'>
            <Button
              variant='h5'
              as='a'
              href={documentURL}
              target='_blank'
              className=' pb-0   mb-n3  text-primary'
            >
              <b>View Document</b>
            </Button>
          </p>
        </Row>
        <Row>
          <p className='text-left'>
            This is a short explaination of the purpose of this
            approvalasldfjsljdfalsdjf asldf jasldf jsld jfasld fjsld f sdf
            asdfasdfsdfasdfasdfasdf
          </p>
        </Row>
        <Row>
          <h6 className='pr-3'>
            <b>Lender: </b> {lender}
          </h6>
          <h6 className='pr-1'>
            <b>Loan Type: </b>
          </h6>
          <h6>{loanType}</h6>
          <h6 className='pl-3'>
            <b>Amount: </b>
          </h6>
          <h6>{amount}</h6>

          {/* <h6 className='text-success'>
              Expires{" "}
              {moment(createdAt)
                .add(10, "days")
                .format("LL")}
            </h6> */}
        </Row>
        <Row />
        <Row />
      </Card.Body>
    </Card>
  </>
);

export const Denied = ({ reset }) => (
  <>
    <Card className='border-0 my-2'>
      <Card.Body className='text-left py-5'>
        <div className='text-warning d-flex justify-content-start px-3 '>
          <FontAwesomeIcon size='2x' icon={faFrownOpen} />
          <h4 className='ml-3 text-dark pt-1'>Something went wrong</h4>
        </div>

        <Card.Text className=' text-dark text-left px-4 pt-0 mt-0 pt-2'>
          <h6>
            Your pre-approval did not qualify based on the this home's
            qualifications. Please review the home policy and try again. If you
            believe this to be a mistake please contact support at
            team@findingspaces.com
          </h6>
          <Button className='mt-2' onClick={reset}>
            Try Again
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  </>
);

export const Expired = ({ uploadPageRedirect }) => (
  <span>
    <Card className='border-0 my-2'>
      <Card.Body className='text-center py-3 '>
        <div className='text-danger d-flex justify-content-start px-3 '>
          <FontAwesomeIcon size='2x' icon={faBell} />
          <h4 className='ml-3 text-danger pt-1'>
            Your qualification has expired.
          </h4>
        </div>

        <Card.Text className=' text-dark text-left px-4 pt-0 mt-0 pt-2'>
          <h6>
            In order to view a home you will need to update your Verification
            document.
          </h6>
          <Button
            variant='danger'
            className='rounded-lg mt-2'
            onClick={uploadPageRedirect}
          >
            Update Verification
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  </span>
);
