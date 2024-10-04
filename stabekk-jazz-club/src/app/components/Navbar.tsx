"use client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`bg-sky-900`}>
      <div className="flex gap-2 justify-between py-3 px-4 lg:px-8">
        <div>
          <Link href="/" className="block w-full text-white mt-1">
            <h1>Stabekk Jazz Club</h1>
          </Link>
        </div>

        <div className={`${open ? "p-0" : "pt-1"} lg:hidden mt-1`}>
          <button onClick={() => setOpen(!open)}>
            <span
              className={`${
                open &&
                "rotate-45 translate-x-[1px] translate-y-[1px] transition-all duration-200 w-9"
              } block h-0.5 w-8 bg-white`}
            ></span>
            <span
              className={`${
                open && "hidden"
              } my-2 block h-0.5 w-8 bg-white transition-all duration-200`}
            ></span>
            <span
              className={`${
                open &&
                "-rotate-45 translate-x-[1px] -translate-y-[1px] transition-all duration-200 w-9"
              } block h-0.5 w-8 bg-white`}
            ></span>
          </button>
        </div>
        {/* desktop menu */}
        <nav className="hidden lg:flex">
          <ul className="flex gap-8">
            <ListItem NavLink="/" setOpen={setOpen}>
              Hjem
            </ListItem>
            <ListItem NavLink="/events" setOpen={setOpen}>
              Konserter
            </ListItem>
            <ListItem NavLink="/about" setOpen={setOpen}>
              Om klubben
            </ListItem>
            <ListItem NavLink="/venues" setOpen={setOpen}>
              Våre lokaler
            </ListItem>
            <ListItem NavLink="/contact" setOpen={setOpen}>
              Kontakt oss
            </ListItem>
          </ul>
        </nav>
      </div>

      {/* mobile menu */}
      <nav
        className={`z-10 ${
          open ? "sticky" : "hidden"
        } bg-sky-900 w-full p-4 lg:hidden`}
      >
        <ul>
          <ListItem NavLink="/" setOpen={setOpen}>
            Hjem
          </ListItem>
          <ListItem NavLink="/events" setOpen={setOpen}>
            Konserter
          </ListItem>
          <ListItem NavLink="/about" setOpen={setOpen}>
            Om klubben
          </ListItem>
          <ListItem NavLink="/venues" setOpen={setOpen}>
            Våre lokaler
          </ListItem>
          <ListItem NavLink="/contact" setOpen={setOpen}>
            Kontakt oss
          </ListItem>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

const ListItem = ({
  children,
  NavLink,
  setOpen,
}: {
  children: React.ReactNode;
  NavLink: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Close the menu after clicking a link
  const handleClick = () => {
    setOpen(false);
  };

  return (
    <li>
      <Link
        href={NavLink}
        onClick={handleClick} // Close the mobile menu when a link is clicked
        className="flex py-2 text-lg font-medium text-white hover:text-gray-300"
      >
        {children}
      </Link>
    </li>
  );
};
