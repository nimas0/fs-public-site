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
  handleClose,
  ...rest
}) => (
  <Modal
    // contentClassName='home-code'
    className='p-0'
    dialogClassName='modal-border-0 bg-tranparent'
    {...rest}
    scrollable
    onHide={onHide}
    show={show}
    size='lg'
    aria-labelledby='contained-modal-title-vcenter'
    centered
  >
    {showHeader && (
      <Modal.Header className='bg-light text-dark'>
        <Modal.Title id='contained-modal-title-vcenter'>{header}</Modal.Title>
      </Modal.Header>
    )}
    <Modal.Body
      className='p-0 m-0  border-0 bg-white'
      // className={padding ? "" : "home-code p-0"}
    >
      {body}
    </Modal.Body>
    {showFooter && (
      <Modal.Footer className='bg-info'>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    )}
  </Modal>
);

export default GenericModal;
