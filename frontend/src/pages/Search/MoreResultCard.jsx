import React from "react";
import { Link } from "react-router-dom";

function calculateMonthsAgo(createdAt) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const diffInTime = currentDate.getTime() - createdDate.getTime();
  const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30.44;
  const monthsAgo = Math.floor(diffInTime / millisecondsInMonth);
  return monthsAgo;
}

function MoreResultCard({ podcast }) {
  return (
    <Link
      to={`/podcast/${podcast._id}`}
      className="bg-base-100 flex items-center p-4 rounded-xl gap-5 transition-transform duration-400 ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg"
      style={{ textDecoration: "none" }}
    >
      <img
        src={
          podcast.thumbnail ||
          "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
        }
        alt={podcast.name}
        className="h-20 w-36 rounded-lg object-cover sm:h-15 sm:w-25"
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">{podcast.name}</div>
        <div className="flex gap-2 text-sm max-md:flex-col max-md:text-xs">
          <div className="mr-3">{podcast.creator.name}</div>
          <div>• {podcast.views} Views</div>
          <div>• {calculateMonthsAgo(podcast.createdAt)} months ago</div>
        </div>
      </div>
    </Link>
  );
}

export default MoreResultCard;
