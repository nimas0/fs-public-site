import React, { useState } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import clsx from "clsx";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import GenericModal from "../../GenericModal";

const RenderButtons = ({
  leadData,
  listing,
  verification,
  tourLinkAs,
  router,
  type,
  label,
  setModalShow,
  buyerId,
  listingId,
  handleLeadInitialization,
}) => {
  const breakpoint = useMediaBreakpoints();
  console.log("type", leadData);
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
          !!leadData && leadData.buyerMessageCounter > 0
            ? "outline-primary"
            : "primary"
        }
        onClick={() => {
          if (!leadData) handleLeadInitialization();
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
          !!leadData &&
            leadData.buyerMessageCounter > 0 &&
            ""
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
          !!leadData && leadData.buyerMessageCounter > 0
            ? "outline-primary"
            : "primary"
        }
        onClick={async () => {
          if (!leadData) await handleLeadInitialization();
          router.push(
            `/chat?chatId=${listingId}_${buyerId}&address=${listing.address[0]}`,
            `/chat/${listingId}_${buyerId}?address=${listing.address[0]}`
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
          !!leadData &&
            leadData.buyerMessageCounter > 0 &&
            "bg-white text-success border border-primary"
        )}
        style={breakpoint.up.lg ? { width: dateButtonsWidth - 4 } : {}}
      >
        {!!leadData && leadData.buyerMessageCounter > 0 ? (
          <b> 
            {' '}
            {leadData.buyerMessageCounter}
            {' '}
            New Message(s)
          </b>
        ) : (
          "Chat with Seller"
        )}
      </Button>
    ),
    proposal: () => {
  
      if (
        !!leadData &&
        leadData.proposal &&
        leadData.proposal.state === "accepted"
      )
        return null;
      if (
        !!leadData &&
        leadData.proposal &&
        leadData.proposal.state === "active"
      )
        return (
          <Button
            block
            variant='primary'
            onClick={async (e) => {
              e.preventDefault();
              if (!!leadData && !leadData)
                await handleLeadInitialization();
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
              !!leadData &&
                leadData.proposal &&
                leadData.proposal.state === "rejected" &&
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
            if (!leadData) await handleLeadInitialization();
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
            !!leadData &&
              leadData.proposal &&
              leadData.proposal.state === "rejected" &&
              "bg-danger"
          )}
          style={breakpoint.up.lg ? { width: dateButtonsWidth - 4 } : {}}
        >
          {!!leadData &&
          leadData.proposal &&
          leadData.proposal.state === "rejected"
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
