import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="p-4">
      <h1 className="text-center">Stabekk Jazz Club</h1>
    </header>
  );
};

export default Navbar;
