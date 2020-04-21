"use strict";

import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAudio,
  faFileCsv,
  faFileExcel,
  faFileImage,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  faFileDownload
} from "@fortawesome/free-solid-svg-icons";

export default ({ name, href, description, mimeType = "" }) => {
  return (
    <Row as="li" noGutters className="document mb-2">
      <Col xs="auto" className="mr-2">
        <FontAwesomeIcon icon={icon()} fixedWidth />
      </Col>
      <Col as="p">
        <a href={href} className="font-bold">
          {name}
        </a>
        {description && ` – ${description}`}
      </Col>
    </Row>
  );

  function icon() {
    switch (mimeType) {
      case "application/pdf":
        return faFilePdf;
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return faFileWord;
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return faFilePowerpoint;
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return faFileExcel;
      case "text/csv":
        return faFileCsv;
      default:
        if (mimeType.includes("image")) {
          return faFileImage;
        } else if (mimeType.includes("video")) {
          return faFileVideo;
        } else if (mimeType.includes("audio")) {
          return faFileAudio;
        } else {
          return faFileDownload;
        }
    }
  }
};
