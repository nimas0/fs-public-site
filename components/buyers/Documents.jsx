import React from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { capitalizeFirstLetter } from '../../utils/helpers';

const Documents = ({ docs, loading, error, setUploadView }) => {
   return (
      <>
         {error && <strong>Error: {JSON.stringify(error)}</strong>}
         {loading && <span>Document: Loading...</span>}
         {docs && (
            <div className='mt-5'>
               <Card className='p-0 docBody'>
                  <Card.Header className=' text-muted header border-left-0 border-right-0 d-flex justify-content-between rounded-0'>
                     <h4 className='pt-3'>Documents</h4>
                     <Button
                        onClick={() => setUploadView((prevState) => !prevState)}
                        size='md'
                        className='text-primary'
                        variant='white'>
                        <FontAwesomeIcon size='lg' icon={faPlus} />
                     </Button>
                  </Card.Header>
                  <Card.Body className='doc'>
                     <ListGroup variant='flush' className='listGroup'>
                        {docs.map((doc, index) => (
                           <ListGroupItem key={index} as='a' href={doc.url} target="_blank" className='listGroupItem'>
                              {capitalizeFirstLetter(doc.name)}
                           </ListGroupItem>
                        ))}
                     </ListGroup>
                  </Card.Body>
               </Card>
               <style jsx>{`
                  .header {
                     background-color: rgb(247, 247, 247);
                     border: 1px solid #d3d3d3;
                  }

                  .headerBack:hover {
                     background-color: rgb(154, 216, 159, 0.2);
                  }
               `}</style>
            </div>
         )}
      </>
   );
};

export default Documents;
