import React from "react";
import { Link } from "react-router-dom";

function TopResultCard({ className }) {
    return (
        <div className={`h-[min-content] transition-all max-w-lg max-lg:max-w-sm ${className} hover:-translate-y-1 hover:brightness-105`} >
      <Link>
        <div className="card lg:card-side bg-base-100 shadow-xl ">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              alt="Album"
              className="bg-cover"
            />
          </figure>
          <div className="card-body lg:max-w-72">
            <h2 className="card-title">New album</h2>
            <div className=" flex gap-2">
              <p className="font-light text-xs">• 500 views</p>
              <p className="font-light text-xs">• 2 months ago</p>
              <p className="text-xs">UPLOADER</p>
            </div>
            <p
              className="overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TopResultCard;
