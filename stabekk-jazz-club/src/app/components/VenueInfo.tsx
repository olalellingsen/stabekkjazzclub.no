import Link from "next/link";
import React from "react";

interface VenueInfoProps {
  name: string;
  img1: string;
  img2?: string;
  address: string;
  mapsLink: string;
  info: string;
}

function VenueInfo({
  name,
  img1,
  img2,
  address,
  mapsLink,
  info,
}: VenueInfoProps) {
  return (
    <div className="py-4 md:py-8 grid gap-2 *:p-1">
      <h2 className="border-b border-gray-400">{name}</h2>
      <p>{info}</p>
      <Link target="blank" href={mapsLink}>
        {address}
      </Link>

      <div className="grid sm:grid-cols-2 gap-2 *:aspect-video *:object-cover">
        <img src={img1} alt={"Image of " + name + "1"} />
        {img2 && <img src={img2} alt={"Image of " + name + "2"} />}
      </div>
    </div>
  );
}

export default VenueInfo;