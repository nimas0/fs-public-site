import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const id = '1Qw34tY7';
  console.log(id);
  useEffect(() => {
    router.push('/listing/[listingId]', `/listing/${id}`);
  }, []);

  return <div />;
};

export default index;
