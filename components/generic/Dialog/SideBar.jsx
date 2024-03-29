import React from 'react';
import { Col, Row, ListGroup } from 'react-bootstrap';

const SideBar = ({ sidebarHeader, subHeaderText, enabled = false, links }) => {
   const renderedComponent = () =>
      enabled ? (
        <Col xs='12' className='mx-2'>
          <div className='p-4'>
            <Row className='pb-2'>
              <h6>
                <b>{sidebarHeader}</b>
              </h6>
            </Row>
            <Row>
              <p>
                <small>{subHeaderText}</small>
              </p>
            </Row>
          </div>
          <ListGroup variant='flush' className='d-flex h-100'>
            {links &&
                  links.map((link, index) => (
                    <ListGroup.Item key={index} className='py-2 pl-2 pr-2'>
                      <a className='text-success' href={link.url}>{link.title}</a>
                    </ListGroup.Item>
                     ))}
          </ListGroup>
        </Col>
      ) : null;

   return renderedComponent();
};

export default SideBar;
