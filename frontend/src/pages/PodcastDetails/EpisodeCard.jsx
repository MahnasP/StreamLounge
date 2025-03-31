import React from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openPlayerModal } from "../../store/modalSlice";

//TODO: Add functionality to play the episode

function EpisodeCard({ episode, thumbnail, num,setSelectedEpisode, addViewHandler }) {

  const dispatch = useDispatch();
  const playhandler = async () => {
    setSelectedEpisode(episode);
    await addViewHandler();
    dispatch(openPlayerModal());
    document.getElementById("video_player_modal").showModal();
    
  }

  return (
    <div className=" w-full max-md:min-h-24 min-h-28 p-4 rounded-lg bg-base-100 shadow-md flex">
      <div className="relative max-md:w-16 max-md:h-16 w-20 h-20 hover:scale-110">
        <img
          className="w-full h-full object-cover rounded-xl "
          src={
            thumbnail ||
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          }
        />
        <button
        onClick={playhandler}
         className="btn btn-circle btn-ghost absolute max-md:top-3 top-4 max-md:left-3 left-4 opacity-75 hover:scale-110">
          <FaPlay size={33} />
        </button>
      </div>
      <div className="flex-col max-md:max-w-48 max-w-2xl ml-5 text-wrap">
        <h1 className=" text-lg font-semibold ">
          {num + 1}. {episode.name}
        </h1>
        <p className="text-sm truncate mt-2">{episode.desc}</p>
      </div>
    </div>
  );
}

export default EpisodeCard;
