import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectSearchBox, connectHits , Configure } from 'react-instantsearch-dom';
import { Button, Card, CardGroup, Col, Container, Navbar, Form, InputGroup, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultPhoto from '../../public/assets/PhotosComingSoon.png'

const algoliaClient = algoliasearch('GY38ZZVNR6', '4b0d02e0ade7821557d7402d0a7f5a32');


const searchClient = {
    ...algoliaClient,
    search(requests) {
      return algoliaClient.search(requests);
    },
  };

  // 1. Create a React component
const CustomSearch = ({ currentRefinement, isSearchStalled, refine }) => (
  <Form onSubmit={(e) => e.preventDefault()} className='w-100 text-center' noValidate action="" role="search">
    <Form.Group className="m-3" controlId="formBasicEmail">
      {/* <Form.Label>
        Find a home
      </Form.Label> */}
      <InputGroup className='rounded-0'>
        <InputGroup.Text className='rounded-0'>
          <FontAwesomeIcon icon={faSearch}  /> 
        </InputGroup.Text>
        <Form.Control
          className='rounded-0'
          placeholder='Search Address, State, City, or home code'
          className='w-100 d-flex  flex-align-center'
          type="search"
          value={currentRefinement}
        
          onChange={event => {
            refine(event.currentTarget.value)}}
        />
      </InputGroup>
    </Form.Group>
    {/* <Button className='m-2' onClick={() => refine('')}>Search</Button> */}
    {/* <Button className='m-2' onClick={() => refine('')}>Reset</Button> */}
    {isSearchStalled ? 'My search is stalled' : ''}
  </Form>
  );
  
  // 2. Connect the component using the connector
  const CustomSearchBox = connectSearchBox(CustomSearch);


const Hit = ({hit}) => {
console.log("hit.photos[0].src", hit.photos[0].src)
    const router = useRouter();
    return (

      <Col xs={12} lg={4}>
        <Card className='  mt-2 mb-5 mx-2 border-0 bg-info'>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: "hidden"}}>
            <Card.Img style={{flexShrink: 0, minWidth: '100%', minHeight: '100%' }} variant="top" src={hit.photos[0].source || defaultPhoto} />
          </div>
          <Card.Body>
            <Card.Title className='text-left text-white'>{hit.fullAddress}</Card.Title>
            <Card.Text className='text-left text-white'>
              1. View Home Details  2. Schedule an appointment 3. Chat with seller  4. Make an offer
            </Card.Text>
            <Button block size='lg' onClick={() => router.push(`/listing/${hit.id}`)} variant="primary">Visit Home</Button>
          </Card.Body>
        </Card>
      </Col>


 
    );
  }

  const Hits = ({ hits }) => (
    <Container style={{padding: 0, width: '100%', margin: 0}} fluid>
      <Row>
        {hits.map(hit => (
          <Hit key={hit.objectID} hit={hit} />
       ))}
      </Row>
    </Container>
   );

  const CustomHits = connectHits(Hits);

const Search = () => {
   const [hide, setHide] = useState(true);


// comment
// comment
  
 
  
//    const handleChange = (e) => {
//     if(!e || e.query.length === 0) {
//         setHide(true)
//     } else {
//         setHide(false)
//     }
// }

// onSearchStateChange={(e) => handleChange(e)}
// attach above line to instant search to activate hiding


    return (
      <>
        <InstantSearch searchClient={searchClient} indexName="listings">
      
          <Navbar fixed='bottom' bg="dark" expand="lg">
            <CustomSearchBox reset={<img src="/reset.png" alt="ss" />} />
          </Navbar>
          <CustomHits  />
          <div style={{minHeight: '7rem'}} />
          
       
          {/* <Configure
            enablePersonalization
            
          /> */}
        </InstantSearch>
     

       

            
          
      </>
    )
}
  



export default Search;