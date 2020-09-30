"use strict";

import React from "react";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
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
  ownerPhotoSrc
}) => {
  const breakpoint = useMediaBreakpoints();

  return (
    <section id="at-a-glance" aria-label="Home at a Glance" className="mb-5">
      <QuickStats
        address={address}
        activity={activity}
        price={price}
        beds={beds}
        baths={baths}
        sqFt={sqFt}
        pricePerSqFt={pricePerSqFt}
      />

      <PhotoGrid
        photos={photos}
        tilesWide={breakpoint.xs ? 2 : 3}
        address={address}
      />

      <HomeownerInfo photoSrc={ownerPhotoSrc} name={ownerName} />
    </section>
  );
};
