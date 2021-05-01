import React from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import clsx from "clsx";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import GenericModal from "../../GenericModal";

const RenderView = (type) => {
  const breakpoint = useMediaBreakpoints();
  const [modalShow, setModalShow] = React.useState(false);
  const ModalBody = () => (
    <>
      <ListGroup>
        <h6 className='mb-5 mt-2 p-2'>
          <b> Congratulations!</b> You and the seller have agreed on the
          essential terms of the offer. Below are the steps needed to complete
          the remainder of the process and get the keys to your new home!
        </h6>
        <ListGroup.Item>
          <h5>
            <b> 1. Acquire a purchase agreement</b>
          </h5>
          Now, since you and the seller have agreed to the essential terms, it's
          time to make it official. A purchase agreement is a document (required
          by law) that states all terms and timelines of a real estate
          transaction. Download our free purchase agreement contract. It has
          been drafted by and reviewed by attorneys in Arizona and meets all the
          binding contract requirements.
          <Button variant='outlined' size='lg' className='text-primary'>
            <h6 className='pt-3 text-primary'>
              <b>Download Purchase Agreement</b>
            </h6>
          </Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>
            <b>2. Fill out purchase agreement</b>
          </h5>{" "}
          Fill out the purchase agreement according to the terms and conditions
          you and the seller agreed on. The contract will have more information
          to fill out; make sure to read thoroughly and contact a lawyer if you
          run into any complications.
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>
            <b>3. Send to Seller</b>
          </h5>{" "}
          After completion of the purchase agreement, the seller will need to
          review and sign. We recommend that you upload your document directly
          to the seller through the Finding Spaces dashboard; This will allow
          you and the seller to communicate and hash out terms quickly.
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>
            <b>4. Notify Title Company</b>
          </h5>{" "}
          Next, deliver the completed and signed contract with the agreed amount
          of earnest deposit to the title company stated in the agreement. You
          and the seller can negotiate who hires a title company and pays
          associated fees. The title company will order the title, property tax
          information, loan balances, and other necessary paperwork. You can
          typically use your title company as an escrow agent at no extra
          charge. The escrow agent will also serve as a third party who holds
          money in a trust until a property sale closes.
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>
            <b>5. Contengencies</b>
          </h5>{" "}
          It's your responsibility to remove all contingencies in the proper
          timelines stated in the contract. The Finding Spaces dashboard will
          remain available for you to chat, schedule appointments, and exchange
          documents with the seller.{" "}
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>
            <b>6. Home Sold</b>
          </h5>{" "}
          Once all contingencies have been uplifted, it will be time to close
          the deal. The title company will provide you with the documents you
          need for the closing process. After the documents are signed and
          recorded and the funds transferred to the seller, you will receive the
          keys to your new home!
        </ListGroup.Item>
      </ListGroup>
    </>
  );

  const instructions = () => (
    <>
      <p className='m-2 '>
        Congratulations! You and the seller have agreed on the essential terms
        of the offer. Below are the s teps needed to complete the remainder of
        the process and get the keys to your new home!
      </p>
      <Button
        block
        className='border border-primary m-4 '
        onClick={() => setModalShow(true)}
      >
        <b>See Next Steps</b>
      </Button>
    </>
  );

  const Views = {
    active: () => (
      <>
        <h2
          id='tour-this-home-heading'
          className={clsx(
            "text-center w-100  text-primary mt-4 pb-1 pl-1",
            breakpoint.lg && "h3"
          )}
        >
          Offer Submitted
        </h2>
        <p className='px-3 pb-3  w-100  pt-1 text-center'>
          Seller will respond within 48 hours with an
          <br />
          accept or reject.
        </p>

        <GenericModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          header='Informal Offer Accepted'
          body={<ModalBody />}
        />
      </>
    ),
    accepted: () => (
      <>
        <h2
          className={clsx(
            "text-center w-100  text-primary mt-4 pb-2 pl-1",
            breakpoint.lg && "h3"
          )}
        >
          Offer Accepted
        </h2>
        {instructions()}
        <GenericModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          header='Informal Offer Accepted'
          body={<ModalBody />}
        />
      </>
    ),
    default: () => (
      <h2
        className={clsx(
          "text-center w-100 border-0 text-primary mt-4 pb-2 pl-1",
          breakpoint.lg && "h3"
        )}
      >
        Tour This Home.
      </h2>
    ),
    rejected: () => (
      <>
        <h4
          className={clsx(
            "text-center w-100 text-danger mt-5 pl-3",
            breakpoint.lg && "h3"
          )}
        >
          {" "}
          Offer Rejected.
        </h4>
        <h6
          id='tour-this-home-heading'
          className={clsx(
            "text-center w-100 pb-4 text-error  pl-3",
            breakpoint.lg && "h6"
          )}
        >
          Try chatting with the buyer to resolve any issues. Once resolved, you
          can resubmit a new offer.
        </h6>
      </>
    ),
  };

  return (Views[type] || Views.default)();
};

export default RenderView;
