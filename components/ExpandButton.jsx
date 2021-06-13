

import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import useResizeObserver from "../utils/useResizeObserver";

const ExpandButton = ({
  direction,
  overlap,
  small,
  onClick,
  disabled,
  hidden,
  className
}) => {
  // Icon
  const icon =
    direction === "up"
      ? faChevronUp
      : direction === "down"
      ? faChevronDown
      : direction === "left"
      ? faChevronLeft
      : direction === "right"
      ? faChevronRight
      : faChevronDown;

  // Button styles
  const sizeStyle = small
    ? { fontSize: "0.75rem", padding: "0.28125rem 0.5625rem" }
    : {};
  const {
    ref: button,
    width: buttonWidth = 1,
    height: buttonHeight = 1
  } = useResizeObserver({ type: "offset" });
  const overlapStyle = Object.assign(
    overlap ? { position: "relative", zIndex: 4 } : {},
    overlap === "up"
      ? {
          bottom: buttonHeight / 2,
          marginBottom: -buttonHeight / 2
        }
      : overlap === "down"
      ? {
          top: buttonHeight / 2,
          marginTop: -buttonHeight / 2
        }
      : overlap === "left"
      ? {
          right: buttonWidth / 2,
          marginRight: -buttonWidth / 2
        }
      : overlap === "right"
      ? {
          left: buttonWidth / 2,
          marginLeft: -buttonWidth / 2
        }
      : {}
  );

  return (
    <Button
      ref={button}
      variant="primary"
      className={clsx(hidden && "invisible", className)}
      style={{ ...sizeStyle, ...overlapStyle }}
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

export default ExpandButton;
