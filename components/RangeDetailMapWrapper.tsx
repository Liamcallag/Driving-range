'use client';

import dynamic from 'next/dynamic';

const RangeDetailMap = dynamic(() => import('./RangeDetailMap'), { ssr: false });

export default function RangeDetailMapWrapper({ lat, lng }: { lat: number; lng: number }) {
  return <RangeDetailMap lat={lat} lng={lng} />;
}
