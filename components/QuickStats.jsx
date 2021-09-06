import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Button } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import Stat from "./Stat";
import Approval from "./buyers/dashboard/approval/Approval";

const QuickStats = ({
  address,
  activity,
  price,
  beds,
  baths,
  sqFt,
  skeleton,
  setSkeleton,
  setModalShow,
  pricePerSqFt,
  AuthUserInfo,
  verification,
  listing,
  showLoginModal,
}) => {
  const breakpoint = useMediaBreakpoints();
  const { AuthUser = null } = AuthUserInfo;
  return (
    <SkeletonTheme color='#e5e5e5' highlightColor='#ffffff'>
      <Row
        noGutters
        className='justify-content-between align-items-center mb-2'
      >
        {/* Activity */}
        {breakpoint.down.md ? (
          <Col xs={12} className='h3 primary '>
            {/* <FontAwesomeIcon icon={faFire} style={{ color: "#fab92d" }} />  */}

            {skeleton ? (
              <Skeleton
                style={{ marginBottom: "1rem" }}
                delay={1000}
                height={50}
                count={1}
              />
  ) : (
  
    <h4 className=''>{address}</h4>
  )}
          </Col>
        )
      :
      (
        <Col xs={12} className='h3 primary mb-2'>
          {/* <FontAwesomeIcon icon={faFire} style={{ color: "#fab92d" }} />  */}

          {skeleton ? (
            <Skeleton
              style={{ marginBottom: "1rem" }}
              delay={1000}
              height={50}
              count={1}
            />
        ) : (
          <h4>{address}</h4>
        )}
        </Col>
      )}
        {/* //asdfasdf */}
        {/* <Approval
          key={1}
          verification={verification}
          AuthUser={AuthUser}
          setModalShow={setModalShow}
          showLoginModal={showLoginModal}
        /> */}
        {/* Quick stats */}
        <Col
          xs={12}
          sm={12}
          className='d-flex text-info pr-1 d-md-inline-flex flex-wrap justify-content-start mt-3'
        >
          <Stat loading label='Price' stat={price} unitPre='$' />
          <Stat loading label='Beds' stat={beds} />
          <Stat loading label='Baths' stat={baths} />
          <Stat loading label='Sq.Ft.' stat={sqFt} />
          <Stat
            loading
            label='per Sq.Ft.'
            stat={pricePerSqFt}
            unitPre='$'
            last
          />
        </Col>
      </Row>
    </SkeletonTheme>
  );
};

export default QuickStats;
