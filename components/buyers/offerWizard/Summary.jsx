import React from "react";
import { Field } from "formik";
import {
  Row,
  Col,
  Button,
  Card,
  Form,
  Spinner,
  Dropdown,
  Container,
  Navbar,
  Jumbotron,
  Table,
  ListGroup,
} from "react-bootstrap";
import { useRouter } from "next/router";
import _ from 'lodash'
import Body from "../../generic/Dialog/Body";
import SideBar from "../../generic/Dialog/SideBar";
import Footer from "../../generic/Dialog/Footer";
import { toTitleCase } from "../../../utils/helpers";

const Summary = ({
  errors,
  touched,
  handleChange,
  values,
  handleBlur,
  sending,
  previousStep,
  nextStep,
  goToStep,
  handleSubmit,
  ...rest
}) => {
  const router = useRouter();
  console.log("values", Object.entries(values))
  return (
    <>
      <Row data-test='step-summary'>
        <div className='d-flex justify-content-center'>
          {sending ? (
            <>
              <div className='m-5' />
              <div className=' m-auto'>
                <Spinner className='text-center' variant='primary' animation='border' />
              </div>
              <div className=' m-5' />
            </>
          ) : (
            <div className='m-5'>
              <div className='py-2'>
                <p>
                  After submitting, seller will be notified of offer. He/She
                  will have 24 hours to respond. Seller may accept, reject, or
                  counter terms.
                </p>
              </div>
              <b className='mb-5'>Please Review Offer before submitting:</b>
              <br />
              <div>
               
                {Object.entries(values).map((keyValueArray, idx) => (
                  <ListGroup as={Row} lg='2' key={keyValueArray[0]} horizontal='md' className="mx-2 my-3">
                    <ListGroup.Item className='bg-dark text-white '>{_.startCase(keyValueArray[0].toString())}</ListGroup.Item>
                    <ListGroup.Item>
                      {keyValueArray[1].toString()}
                    </ListGroup.Item>
                  </ListGroup>
                ))}
               

              </div>

              <Button
                onClick={() => goToStep(2)}
                className='rounded-lg mb-5 text-info'
                variant='light'
              >
                EDIT OFFER
              </Button>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          )}
        </div>
      </Row>

      <Navbar style={{backgroundColor: '#ededed', borderColor: '#bdbdbd', borderTopWidth: '.2ch', borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderRadius: 0, borderStyle: 'solid'}} fixed='bottom' className='p-4 d-flex justify-content-between align-items-center'>
        <Col xs='4' className='pl-1'>
          <Button
            onClick={rest.cancelAction}
            as='a'
            className='rounded-lg'
            variant='light'
          >
            CANCEL
          </Button>
        </Col>
        <Col xs='6' className='d-flex justify-content-end mr-5'>
          <Button
            size='lg'
            type='submit'
            className=' rounded-lg ml-3 my-1'
            variant='primary'
            block
          >
            Send Offer
          </Button>
        </Col>
      </Navbar>
    </>
  );
};

export default Summary;
