import React from "react";

function Footer() {
  return (
    <footer className="bg-sky-900 text-white p-8 gap-4 flex flex-wrap justify-between">
      <div className="grid gap-1">
        <p>
          <a className="text-white" href="mailto:stabekkjazzclub@gmail.com">
            stabekkjazzclub@gmail.com
          </a>
        </p>
        <p>
          <a className="text-white" href="tel:91546098">
            915 46 098
          </a>
        </p>
      </div>

      <div>
        <a
          className="text-white"
          href="https://www.facebook.com/stabekkjazzclub/?locale=nb_NO"
        >
          <img
            className="h-16 hover:scale-105 transition-transform duration-200"
            src="https://img.icons8.com/ios-filled/500/FFFFFF/facebook-new.png"
            alt="facebook-new"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;