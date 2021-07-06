/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from "react-share";
import _ from 'lodash'
import PropTypes from 'prop-types';


const Share = ({address, listingId}) => {
    
    const shareUrl = `${process.env.HOST}/listing/${listingId}`;
    const title = _.startCase(address);
        
    
    return (
      <Row>
        <Col className="Demo__some-network">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </Col>
        <Col className="Demo__some-network">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <div className="Demo__some-network__share-count">&nbsp;</div>
        </Col>
        <Col className="Demo__some-network">
          <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </Col>
      </Row>
    )
}

Share.propTypes = {
    address: PropTypes.string.isRequired,
    listingId: PropTypes.number.isRequired
}

export default Share


