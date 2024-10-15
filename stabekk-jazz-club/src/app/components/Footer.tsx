import Link from "next/link";
import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-sky-900 dark:bg-sky-950 text-white p-8 gap-4 flex flex-wrap justify-between">
      <div className="grid gap-1">
        <p>
          <Link className="text-white" href="mailto:post@stabekkjazzclub.no">
            post@stabekkjazzclub.no
          </Link>
        </p>
        <p>
          <Link className="text-white" href="tel:91546098">
            915 46 098
          </Link>
        </p>
      </div>

      <div>
        <Link
          className="text-white"
          href="https://www.facebook.com/stabekkjazzclub/?locale=nb_NO"
          target="_blank"
        >
          <Image
            className="h-16 w-16 hover:scale-105 transition-transform duration-200"
            src="/facebook.png"
            alt="facebook"
            width={60}
            height={60}
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
