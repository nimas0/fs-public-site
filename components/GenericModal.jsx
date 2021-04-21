import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const GenericModal = ({ header, body, show, onHide, showFooter = true, ...rest }) => (
  <Modal {...rest} scrollable={false} onHide={onHide} show={show} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
    <Modal.Header className='bg-info text-white'>
      <Modal.Title id='contained-modal-title-vcenter'>{header}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    {
     showFooter && (
     <Modal.Footer>
       <Button onClick={onHide}>Close</Button>
     </Modal.Footer>
  )
}
  </Modal>
   );

export default GenericModal;
