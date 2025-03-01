import React, { useState, useEffect } from "react";
import { IoHeadset } from "react-icons/io5";
import { BsFillPlayFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import usePodcastApi from "../hooks/usePodcastApi";

function Card({ podcast, user }) {
  const type = podcast?.mediaType || "video";
  const navigate = useNavigate();
  const { favoritePodcast } = usePodcastApi();
  const isAuthenticated = useSelector((state) => state.auth.status);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (user?.favorites?.some((fav) => fav._id === podcast._id)) {
      setIsFav(true);
    }
  }, [podcast._id, user]);

  async function handleFavClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (isAuthenticated) {
      try {
        const res = await favoritePodcast(podcast._id);
        if (res) {
          setIsFav(!isFav);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error in favoriting podcast");
      }
    } else {
      toast.error("Please login to favorite a podcast");
    }
  }

  function handleButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/podcast/${podcast._id}`);
  }

  return (
    <div
      onClick={() => {
        navigate(`/podcast/${podcast._id}`);
      }}
      className="relative group cursor-pointer card card-compact bg-base-100 w-80 max-md:w-60 shadow-md shadow-primary-content/20 transition-all hover:-translate-y-1"
    >
      <figure>
        <img
          src={podcast.thumbnail}
          alt="thumbnail"
          className="object-cover transition-transform duration-300 group-hover:scale-105 select-none "
        />
      </figure>
      <button
        onClick={handleFavClick}
        className="absolute top-2 right-2 btn btn-ghost"
      >
        {isFav ? <MdFavorite size={"1.5em"} /> : <GrFavorite size={"1.5em"} />}
      </button>
      <button
        onClick={handleButtonClick}
        className="btn btn-primary absolute transition-all top-[51%] right-2 max-lg:scale-100  group-hover:z-10 scale-0 group-hover:scale-100 hover:shadow-lg hover:shadow-primary/30"
      >
        {type === "video" ? (
          <BsFillPlayFill size={"1.5rem"} />
        ) : (
          <IoHeadset size={"1.5rem"} />
        )}
      </button>
      <div className="card-body">
        <h2 className="card-title truncate">{podcast.name}</h2>
        <p className=" truncate">{podcast.desc}</p>
        <div className=" flex flex-row max-md:flex-wrap justify-between mt-4">
          <div className="avatar flex  items-center">
            <div className="w-10 rounded-full">
              <img
                src={
                  podcast.creator?.profilePic ||
                  "https://avatar.iran.liara.run/public"
                }
              />
            </div>
            <h3 className="ml-2 font-semibold text-ellipsis">
              {podcast.creator?.name}
            </h3>
          </div>
          <div className="flex max-md:mt-2 items-center text-ellipsis">
            <p> {podcast.views} views</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
