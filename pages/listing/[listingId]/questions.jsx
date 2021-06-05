import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import fetch from "isomorphic-unfetch";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import Nav from "../../../components/Nav";
import QuestionsAndAnswers from "../../../components/QuestionsAndAnswers";
import Footer from "../../../components/Footer";
import withAuthUser from "../../../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../../../utils/pageWrappers/withAuthUserInfo";
import withLoginModal from "../../../utils/pageWrappers/withLoginModal";

const Questions = ({ listing, questions, AuthUserInfo, showLoginModal }) => {
  const { AuthUser = null } = AuthUserInfo;
  const breakpoint = useMediaBreakpoints();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          Questions &amp; Answers – {listing.address[0]}, {listing.address[1]} –
          Finding Spaces
        </title>
      </Head>

      <Nav
        address={
          breakpoint.up.lg
            ? `${listing.address[0]}, ${listing.address[1]}`
            : false
        }
        {...{ AuthUser, showLoginModal }}
      />

      {/* Switch bsPrefix="container-md" to fluid="md" when react-bootstrap releases fix */}
      <Container bsPrefix='container-md'>
        {breakpoint.down.md && (
          <div className='h4 mx-auto mb-4' style={{ width: "max-content" }}>
            {listing.address[0]}
            {breakpoint.xs ? <br /> : ", "}
            {listing.address[1]}
          </div>
        )}

        <div className='mb-4'>
          <Link
            href='/listing/[listingId]'
            as={`/listing/${router.query.listingId}`}
            passHref
          >
            <a>
              <FontAwesomeIcon icon={faLongArrowAltLeft} className='mr-1' />
              Return to listing
            </a>
          </Link>
        </div>

        <QuestionsAndAnswers
          as='main'
          questions={questions}
          AuthUser={AuthUser}
        />
      </Container>

      <Footer />
    </>
  );
};

Questions.getInitialProps = async (ctx) => {
  try {
    // Get current listing data from database
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/listing?id=${ctx.query.listingId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    // Handle response from API
    if (response.ok) {
      return response.json();
    }
    if ([404, 503].includes(response.status)) {
      return { statusCode: response.status };
    }
    // https://github.com/developit/unfetch#caveats
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  } catch (err) {
    console.log(err);
    return { statusCode: response.status || err.statusCode || 500 };
  }
};

export default withAuthUser(withAuthUserInfo(withLoginModal(Questions)));
