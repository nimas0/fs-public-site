import React from "react";
import { Media, Image } from "react-bootstrap";

export default ({ photoSrc, name, greeting }) => {
  const defaultGreeting =
    "Greetings! Have a look around my home's site and be sure to check out the common questions section below. Still have questions unanswered? Feel free to post a no-commitment question and I will respond as soon as possible.";

  return (
    <Media style={{ clear: "left", marginTop: 40 }}>
      <Image
        width={95}
        height={95}
        className='mr-3'
        src={
          photoSrc ||
          "https://jmcp.edu.pk/wp-content/uploads/2020/10/blank-profile-picture-973460_1280-300x300-1.jpg"
        }
        alt={`Homeowner ${name}`}
        rounded
      />
      <Media.Body>
        <h5>
          {name}
          {' '}
          Homeowner
        </h5>
        <p className='mb-0' style={{ fontSize: "0.9em" }}>
          {greeting || defaultGreeting}
        </p>
      </Media.Body>
    </Media>
  );
};
