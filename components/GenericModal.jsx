import React from "react";
import { Modal, Button } from "react-bootstrap";

const GenericModal = ({
  header,
  body,
  show,
  onHide,
  showFooter = true,
  showHeader = true,
  padding,
  ...rest
}) => (
  <Modal
    contentClassName='home-code'
    className='p-0'
    dialogClassName='rounded-lg modal-border-0 bg-tranparent'
    {...rest}
    scrollable
    onHide={onHide}
    show={show}
    size='lg'
    aria-labelledby='contained-modal-title-vcenter'
    centered
  >
    {showHeader && (
      <Modal.Header className='bg-info text-white'>
        <Modal.Title id='contained-modal-title-vcenter'>{header}</Modal.Title>
      </Modal.Header>
    )}
    <Modal.Body
      className='p-0 m-0 rounded-lg border-0 bg-white'
      // className={padding ? "" : "home-code p-0"}
    >
      {body}
    </Modal.Body>
    {showFooter && (
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    )}
  </Modal>
);

export default GenericModal;
