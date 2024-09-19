"use client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`${
        open &&
        "bg-sky-50 dark:bg-sky-900 dark:md:bg-background md:bg-background"
      }`}
    >
      <div className="flex gap-2 justify-between py-4 px-4 md:px-8">
        <div>
          <a href="/" className="block w-full dark:text-white">
            <h1>Stabekk Jazz Club</h1>
          </a>
        </div>

        <div className={`${open ? "p-0" : "py-1"} md:hidden`}>
          <button onClick={() => setOpen(!open)}>
            <span
              className={`${
                open &&
                "rotate-45 translate-x-[1px] translate-y-[1px] transition-all duration-200 w-9"
              } block h-0.5 w-8 bg-body-color dark:bg-white`}
            ></span>
            <span
              className={`${
                open && "hidden"
              } my-2 block h-0.5 w-8 bg-body-color dark:bg-white transition-all duration-200`}
            ></span>
            <span
              className={`${
                open &&
                "-rotate-45 translate-x-[1px] -translate-y-[1px] transition-all duration-200 w-9"
              } block h-0.5 w-8 bg-body-color dark:bg-white`}
            ></span>
          </button>
        </div>
        {/* desktop menu */}
        <nav className="hidden md:flex">
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
          </ul>
        </nav>
      </div>

      {/* mobile menu */}
      <nav
        className={`${
          open ? "sticky" : "hidden"
        } bg-sky-50 dark:bg-sky-900 w-full p-4 md:hidden`}
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
        className="flex py-2 text-lg font-medium text-body-color hover:text-dark dark:text-white dark:hover:text-gray-400"
      >
        {children}
      </Link>
    </li>
  );
};
