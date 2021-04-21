

import React from "react";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import QuickStats from "./QuickStats";
import PhotoGrid from "./PhotoGrid";
import HomeownerInfo from "./HomeownerInfo";

export default ({
  activity,
  price,
  beds,
  baths,
  sqFt,
  pricePerSqFt,
  photos,
  address,
  ownerName,
  ownerPhotoSrc,
  skeleton,
  setSkeleton,
  setModalShow,
  AuthUser,
  verification
}) => {
  const breakpoint = useMediaBreakpoints();

  return (
    <section id="at-a-glance" aria-label="Home at a Glance" className="mb-5">
      <SkeletonTheme color="#e5e5e5" highlightColor="#ffffff">

        <QuickStats
          verification={verification}
          AuthUser={AuthUser}
          setModalShow={setModalShow}
          skeleton={skeleton}
          setSkeleton={setSkeleton}
          address={address}
          activity={activity}
          price={price}
          beds={beds}
          baths={baths}
          sqFt={sqFt}
          pricePerSqFt={pricePerSqFt}
        />
      
        {!skeleton ? (
          <PhotoGrid
            photos={photos}
            tilesWide={breakpoint.xs ? 2 : 3}
            address={address}
          />
      ) : (
        <Skeleton delay={1000} height={350}  />
      )}
        <HomeownerInfo photoSrc={ownerPhotoSrc} name={ownerName} />
            
      </SkeletonTheme>
    </section>
  );
};
