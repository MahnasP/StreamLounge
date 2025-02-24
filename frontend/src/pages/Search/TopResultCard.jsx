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

function TopResultCard({ className, podcast }) {
  return (
    <div
      className={`h-[min-content] transition-all max-w-lg max-lg:max-w-sm ${className} hover:-translate-y-1 hover:brightness-105`}
    >
      <Link to={`/podcast/${podcast?._id}`}>
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src={
                podcast.thumbnail ||
                "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              }
              alt={podcast.name}
              className="bg-cover"
            />
          </figure>
          <div className="card-body lg:max-w-72">
            <h2 className="card-title">{podcast.name}</h2>
            <div className=" flex gap-2">
              <p className="font-light text-xs">• {podcast.views} views</p>
              <p className="font-light text-xs">
                • {calculateMonthsAgo(podcast.createdAt)} months ago
              </p>
              <p className="text-xs">{podcast.creator.name}</p>
            </div>
            <p
              className="overflow-hidden text-ellipsis text-xs"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {podcast.desc}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TopResultCard;
