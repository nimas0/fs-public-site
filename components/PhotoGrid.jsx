import React, { useState } from "react";
import { Accordion, Row, Col, Button } from "react-bootstrap";
import Carousel, { Modal, ModalGateway } from "react-images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import LinkTile from "./LinkTile";
import formatPhotoArray from "../utils/formatPhotoArray";
import useResizeObserver from "../utils/useResizeObserver";

export default ({ photos, tilesWide, address }) => {
  // Process photo array
  const { photoBlocks, photoSources } = formatPhotoArray(photos, tilesWide);

  // Configuration
  const gutterWidth = 8; // in pixels
  const widthToHeightRatio = 1.618; // default: golden ratio (~1.618)

  // Set up dimensions/positioning
  const { ref: container, width: containerWidth = 0 } = useResizeObserver({
    type: "offset",
  });
  const tileWidth = containerWidth / tilesWide;
  const tileHeight = tileWidth / widthToHeightRatio;
  const {
    ref: toggleButton,
    width: toggleButtonWidth = 0,
    height: toggleButtonHeight = 0,
  } = useResizeObserver({ type: "client" });
  const toggleButtonPosition = {
    marginLeft: containerWidth / 2 - toggleButtonWidth / 2,
    marginTop: -toggleButtonHeight / 2 - gutterWidth / 2,
  };

  // Grid expansion
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Lightbox gallery
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const toggleLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(!lightboxOpen);
  };

  // Address for map tile
  const urlEncodedAddress = encodeURIComponent(address).replace(/%20/g, "+");
  console.log("photo", photos);
  return (
    <Accordion
      ref={container}
      className='mb-4'
      style={{ margin: -gutterWidth / 2 }}
    >
      {/* First block (always shown) */}
      <Row noGutters>
        {photoBlocks[0].columns.map((column, columnIndex) => (
          <Col
            key={`0-${columnIndex}`}
            xs={(12 * column.tilesWide) / tilesWide}
          >
            {column.photos.map((photo, photoIndex) => (
              <div
                key={`0-${columnIndex}-${photoIndex}`}
                className='photo-wrapper'
                style={{
                  padding: gutterWidth / 2,
                  height: (tileHeight + gutterWidth) * photo.tilesTall,
                }}
              >
                {photo.map ? (
                  <LinkTile
                    icon={faMapMarkerAlt}
                    text='View on map'
                    href={`https://www.google.com/maps/search/?api=1&query=${urlEncodedAddress}`}
                  />
                ) : (
                  <img
                    src={photo.src}
                    onClick={() => {
                      toggleLightbox(photo.index);
                    }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      // Toggle lightbox on Enter or Space
                      if ([13, 32].includes(e.keyCode)) {
                        toggleLightbox(photo.index);
                      }
                    }}
                    className='hover-focus-opacity-90'
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                )}
              </div>
            ))}
          </Col>
        ))}
      </Row>

      {/* Remaining blocks (shown when toggled) */}
      <Accordion.Collapse eventKey='0'>
        <>
          {photoBlocks.slice(1).map((block, blockIndex) => (
            <Row key={`${blockIndex}`} noGutters>
              {block.columns.map((column, columnIndex) => (
                <Col
                  key={`${blockIndex}-${columnIndex}`}
                  xs={(12 * column.tilesWide) / tilesWide}
                >
                  {column.photos.map((photo, photoIndex) => (
                    <div
                      key={`${blockIndex}-${columnIndex}-${photoIndex}`}
                      className='photo-wrapper'
                      style={{
                        padding: gutterWidth / 2,
                        height: (tileHeight + gutterWidth) * photo.tilesTall,
                      }}
                    >
                      {photo.map ? (
                        <LinkTile
                          icon={faMapMarkerAlt}
                          text='View on map'
                          href={`https://www.google.com/maps/search/?api=1&query=${urlEncodedAddress}`}
                        />
                      ) : (
                        <img
                          src={photo.src}
                          onClick={() => {
                            toggleLightbox(photo.index);
                          }}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            // Toggle lightbox on Enter or Space
                            if ([13, 32].includes(e.keyCode)) {
                              toggleLightbox(photo.index);
                            }
                          }}
                          className='hover-focus-opacity-90'
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </Col>
              ))}
            </Row>
          ))}
        </>
      </Accordion.Collapse>

      {/* Toggle button, overlapping with end of last block via position-relative */}
      <Accordion.Toggle
        eventKey='0'
        as={Button}
        variant='info'
        ref={toggleButton}
        className='navShadow border-0 float-left position-relative h4-icon'
        style={Object.assign(toggleButtonPosition)}
        onClick={toggleExpanded}
        aria-label={`${expanded ? "Collapse" : "Expand"} photo grid`}
      >
        <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} />
      </Accordion.Toggle>

      {/* Lightbox gallery */}
      <ModalGateway>
        {lightboxOpen && (
          <Modal
            onClose={toggleLightbox}
            allowFullscreen={false}
            closeOnBackdropClick
          >
            <Carousel currentIndex={lightboxIndex} views={photoSources} />
          </Modal>
        )}
      </ModalGateway>
    </Accordion>
  );
};
