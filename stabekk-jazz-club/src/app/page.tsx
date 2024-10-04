"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <img
        src="/home.jpg"
        alt="Stabekk Jazz Club"
        className="absolute top-0 left-0 h-full object-cover z-[-2]"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-[-1]" />

      <div className="absolute right-0 top-1/4 sm:top-1/3 w-full">
        <div
          className={` flex gap-2 flex-wrap justify-center text-white px-4 py-8 font-bold sm:text-4xl transform transition-opacity duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1>Velkommen til</h1>
          <h1>Stabekk Jazz Club</h1>
        </div>
        <div
          className={`flex flex-wrap justify-center gap-4 transform transition-opacity duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link href="/events">
            <button className="btn1">Se kommende konserter</button>
          </Link>
          <Link
            href="https://secure.officevisual.net/su/35481099518017"
            target="blank"
          >
            <button className="btn2">Motta vårt nyhetsbrev</button>
          </Link>
        </div>
      </div>
    </>
  );
}
