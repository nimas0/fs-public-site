import React from "react";
import { Button, Card, Row, Col, Navbar } from "react-bootstrap";

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or custom if `custom` prop is true).
 */

const Footer = (props) => {
  // return custom footer
  // props.custom = boolean
  if (props.custom) {
    return (
   
      <Navbar style={{backgroundColor: '#ededed', borderColor: '#bdbdbd', borderTopWidth: '.2ch', borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderRadius: 0, borderStyle: 'solid'}} fixed='bottom' className='p-4 d-flex justify-content-between align-items-center'>
        {props.children}
      </Navbar>
     
    );
  }

  // default => return standard navigation footer
  return (
    <Navbar style={{backgroundColor: '#ededed', borderColor: '#bdbdbd', borderTopWidth: '.2ch', borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderRadius: 0, borderStyle: 'solid'}} fixed='bottom' className='p-4 d-flex justify-content-between align-items-center'>

      <Col className='d-flex justify-content-end mr-5'>
        <Button
          disabled={props.disabledBack}
          onClick={props.previousStep}
          className='rounded-lg text-dark'
          variant='light'
        >
          BACK
        </Button>
        <Button
          disabled={props.disabledNext}
          onClick={props.nextStep}
          className='rounded-lg ml-3'
          variant='primary'
        >
          {props.customButtonName || "NEXT"}
          {props.customButtonIcon || null}
        </Button>
      </Col>
    </Navbar>
  );
};

export default Footer;
