import React from "react";
import { FaPlay } from "react-icons/fa";

function EpisodeCard() {
  return (
    <div className=" w-full max-md:min-h-24 min-h-28 p-4 rounded-lg bg-base-100 shadow-md flex">
      <div className="relative max-md:w-16 max-md:h-16 w-20 h-20">
        <img
          className="w-full h-full object-cover rounded-xl"
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        />
        <button className="btn btn-circle btn-ghost absolute max-md:top-3 top-4 max-md:left-3 left-4 opacity-75 hover:scale-110">
          <FaPlay size={33} />
        </button>
      </div>
      <div className="flex-col max-md:max-w-48 max-w-2xl ml-5 text-wrap">
        <h1 className=" text-lg font-semibold ">
          1. abc 
        </h1>
        <p className="text-sm truncate mt-2">episode desc</p>
      </div>
    </div>
  );
}

export default EpisodeCard;
