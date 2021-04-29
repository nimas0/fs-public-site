import React, { useState } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import clsx from "clsx";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import GenericModal from "../../GenericModal";

const RenderButtons = ({
  subscriptionData,
  verification,
  tourLinkAs,
  router,
  type,
  label,
  setModalShow,
  buyerId,
  listingId,
  handleSubscribe,
}) => {
  const breakpoint = useMediaBreakpoints();
  console.log("type", type);
  const [dateButtonsWidth, setDateButtonsWidth] = useState(0);

  //   const GenericButton = (onClick, label) => (
  //     <Button
  //       onClick={onClick}
  //       variant='primary'
  //       block
  //       className={clsx(
  //         breakpoint.down.md && "px-5",
  //         "buttonShadow",
  //         "d-block",
  //         "my-1",
  //         "text-center"
  //       )}
  //       style={breakpoint.up.lg ? { width: dateButtonsWidth - 4 } : {}}
  //     >
  //       {label}
  //     </Button>
  //   );

  const ButtonType = {
    scheduling: () => (
      <Button
        block
        variant={
          subscriptionData.buyerMessageCounter > 0
            ? "outline-primary"
            : "primary"
        }
        onClick={() => {
          if (!subscriptionData) handleSubscribe();
          router.push(tourLinkAs);
        }}
        className={clsx(
          breakpoint.down.md && "px-5",
          "buttonShadow",
          "d-block",
          "my-1",
          "text-center",
          "align-center",
          "bg-primary",
          subscriptionData.buyerMessageCounter > 0 &&
            "bg-white text-primary border border-primary"
        )}
        style={breakpoint.up.lg ? { width: dateButtonsWidth - 4 } : {}}
      >
        {label}
      </Button>
    ),
    chat: () => (
      <Button
        block
        variant={
          subscriptionData.buyerMessageCounter > 0
            ? "outline-primary"
            : "primary"
        }
        onClick={async (e) => {
          e.preventDefault();
          if (!subscriptionData) await handleSubscribe();
          router.push(
            `/buyer/interest?interestId=${listingId}_${buyerId}`,
            `/buyer/interest/${listingId}_${buyerId}`
          );
        }}
        className={clsx(
          breakpoint.down.md && "px-5",
          "buttonShadow",
          "d-block",
          "my-1",
          "text-center",
          "align-center",
          "bg-primary",
          subscriptionData.buyerMessageCounter > 0 &&
            "bg-white text-primary border border-primary"
        )}
        style={breakpoint.up.lg ? { width: dateButtonsWidth - 4 } : {}}
      >
        {subscriptionData.buyerMessageCounter > 0 ? (
          <b> {subscriptionData.buyerMessageCounter} New Message(s)</b>
        ) : (
          "Chat with Seller"
        )}
      </Button>
    ),
    proposal: () => {
      console.log("subscription", subscriptionData.proposal.state);
      if (subscriptionData.proposal.state === "accepted") return null;
      if (subscriptionData.proposal.state === "active")
        return (
          <Button
            block
            variant='primary'
            onClick={async (e) => {
              e.preventDefault();
              if (!subscriptionData) await handleSubscribe();
              router.push(
                `/buyer/interest?interestId=${listingId}_${buyerId}`,
                `/buyer/interest/${listingId}_${buyerId}`
              );
            }}
            className={clsx(
              breakpoint.down.md && "px-5",
              "buttonShadow",
              "d-block",
              "my-1",
              "text-center",
              subscriptionData.proposal &&
                subscriptionData.proposal.state === "rejected" &&
                "bg-danger"
            )}
            style={breakpoint.up.lg ? { width: dateButtonsWidth - 4 } : {}}
          >
            View Proposal
          </Button>
        );
      return (
        <Button
          block
          variant='primary'
          onClick={async (e) => {
            e.preventDefault();
            if (!subscriptionData) await handleSubscribe();
            router.push(
              `/buyer/Offer/[Offer]`,
              `/buyer/Offer/${listingId}_${buyerId}`
            );
          }}
          className={clsx(
            breakpoint.down.md && "px-5",
            "buttonShadow",
            "d-block",
            "my-1",
            "text-center",
            subscriptionData.proposal &&
              subscriptionData.proposal.state === "rejected" &&
              "bg-danger"
          )}
          style={breakpoint.up.lg ? { width: dateButtonsWidth - 4 } : {}}
        >
          {subscriptionData.proposal &&
          subscriptionData.proposal.state === "rejected"
            ? "Propose Another Offer"
            : "Propose Offer"}
        </Button>
      );
    },
    unverified: () => (
      <>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setModalShow(true);
          }}
          variant='primary'
          block
          className={clsx(
            breakpoint.down.md && "px-5",
            "buttonShadow",
            "d-block",
            "my-1",
            "text-center"
          )}
          style={breakpoint.up.lg ? { width: dateButtonsWidth - 4 } : {}}
        >
          {label}
        </Button>
      </>
    ),
  };

  return (ButtonType[type] || ButtonType.unverified)();
};

export default RenderButtons;
