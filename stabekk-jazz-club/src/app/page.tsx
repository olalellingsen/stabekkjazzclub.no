"use client";

import Events from "./components/Events";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Navbar />
        <Events />
      </main>
      <footer className=""></footer>
    </div>
  );
}
