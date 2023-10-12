import React from "react";

const NavBar = () => {
  return (
    <div className="bg-gray-800 flex justify-center">
      <div className="h-16 px-8 flex items-center">
        <p className="text-white font-bold uppercase"> Lab Report System </p>
      </div>
      <div className="flex justify-content-end">
        <button className="rounded bg-gray-600 text-white w-24 h-10 mt-2.5">
          Login
        </button>
      </div>
    </div>
  );
};

export default NavBar;
