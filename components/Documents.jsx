"use strict";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import Document from "./Document";

export default ({ documents }) => (
  <section id="documents" aria-labelledby="documents-heading" className="mb-5">
    <h2 id="documents-heading" className="mb-4">
      <FontAwesomeIcon icon={faFileAlt} fixedWidth /> Documents
    </h2>

    <ul className="list-unstyled px-3 mb-n3">
      {documents.map((document, index) => (
        <Document
          key={index}
          name={document.label}
          href={document.url}
          description={document.description}
          mimeType={document.type}
        />
      ))}
    </ul>
  </section>
);
