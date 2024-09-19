"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${open && "bg-sky-50 md:bg-background"}`}>
      <div className="flex gap-2 justify-between py-4 px-4 md:px-8">
        <div>
          <a href="/" className="block w-full">
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
        <nav className="hidden md:flex ">
          <ul className="flex gap-8 ">
            <ListItem NavLink="/">Hjem</ListItem>
            <ListItem NavLink="/events">Konserter</ListItem>
            <ListItem NavLink="/about">Om klubben</ListItem>
          </ul>
        </nav>
      </div>

      {/* mobile menu */}
      <nav
        className={`${
          open ? "fixed" : "hidden"
        } bg-sky-50 w-full p-4 md:hidden`}
      >
        <ul>
          <ListItem NavLink="/">Hjem</ListItem>
          <ListItem NavLink="/events">Konserter</ListItem>
          <ListItem NavLink="/about">Om klubben</ListItem>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

const ListItem = ({
  children,
  NavLink,
}: {
  children: React.ReactNode;
  NavLink: string;
}) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-2 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white"
        >
          {children}
        </a>
      </li>
    </>
  );
};
