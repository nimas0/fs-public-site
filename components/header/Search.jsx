import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectSearchBox, connectHits , Configure } from 'react-instantsearch-dom';
import { Button, Card, CardGroup, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const algoliaClient = algoliasearch('GY38ZZVNR6', '4b0d02e0ade7821557d7402d0a7f5a32');


const searchClient = {
    ...algoliaClient,
    search(requests) {
      return algoliaClient.search(requests);
    },
  };

  // 1. Create a React component
const CustomSearch = ({ currentRefinement, isSearchStalled, refine }) => (
  <Form className='w-100 text-center' noValidate action="" role="search">
    <Form.Group className="mb-3" controlId="formBasicEmail">
      {/* <Form.Label>
        Find a home
      </Form.Label> */}
      <InputGroup>
        <InputGroup.Text className='rounded-0'>
          <FontAwesomeIcon icon={faSearch}  /> 
        </InputGroup.Text>
        <Form.Control
          placeholder='Search Address, State, City, or home code'
          className='w-100 d-flex  flex-align-center'
          type="search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
        />
      </InputGroup>
    </Form.Group>
    <Button className='m-2' onClick={() => refine('')}>Search</Button>
    <Button className='m-2' onClick={() => refine('')}>Reset</Button>
    {isSearchStalled ? 'My search is stalled' : ''}
  </Form>
  );
  
  // 2. Connect the component using the connector
  const CustomSearchBox = connectSearchBox(CustomSearch);


const Hit = ({hit}) => {

    const router = useRouter();
    return (

      <div className='d-flex justify-content-center'>
        <Card className='m-5 w-75 border-0 justify-content-center bg-info'>
          <Card.Img variant="top" src={hit.photos[0].src} />
          <Card.Body>
            <Card.Title className='text-white'>{hit.fullAddress}</Card.Title>
            <Card.Text className='text-white'>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button onClick={() => router.push(`/listing/${hit.id}`)} variant="primary">Visit Home</Button>
          </Card.Body>
        </Card>
      </div>


 
    );
  }

  const Hits = ({ hits }) => (
    <div style={{width: '100%', display: 'inline'}}>
      {hits.map(hit => (
        <Hit key={hit.objectID} hit={hit} />
       ))}
    </div>
   );

  const CustomHits = connectHits(Hits);

const Search = () => {
   const [hide, setHide] = useState(true);


// comment
// comment
  
 
  
   const handleChange = (e) => {
    if(!e || e.query.length === 0) {
        setHide(true)
    } else {
        setHide(false)
    }
}



    return (
      <>
        <InstantSearch onSearchStateChange={(e) => handleChange(e)} searchClient={searchClient} indexName="listings">
      

          <CustomSearchBox reset={<img src="/reset.png" alt="ss" />} />

      
          {
            !hide && (
            <CustomHits  />
            )
          }
         
       
          {/* <Configure
            enablePersonalization
            
          /> */}
        </InstantSearch>
     

       

            
          
      </>
    )
}
  



export default Search;