import React from "react";
import Search from "./Search";

export default function Header() {
  return (
    <header className="w-full h-14 bg-black">
      <div className="max-w-[80rem] h-full mx-auto flex justify-between items-center px-4 text-white">
        <div>
          <h1>CodeTest</h1>
        </div>
        <Search />
      </div>
    </header>
  );
}
