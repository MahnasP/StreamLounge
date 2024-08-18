import React from "react";
import { IoHeadset } from "react-icons/io5";
import { BsFillPlayFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";

function Card() {
    const type = "video";
    const navigate = useNavigate();

    function handleButtonClick(event) {
        event.preventDefault()
    event.stopPropagation();
    console.log("play from podcast card clicked!");
    }
    function handleFavClick(event) {
        event.preventDefault()
    event.stopPropagation();
    console.log("Favorite from podcast card clicked!");
  }

  return (
    
      <div onClick={()=>navigate("/search")} className="relative group cursor-pointer card card-compact bg-base-100 w-80 shadow-md shadow-primary-content/20 transition-all hover:-translate-y-1">
        
          <figure>
          <img
            src="https://images.pexels.com/photos/6136097/pexels-photo-6136097.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Shoes"
            className="transition-transform duration-300 group-hover:scale-105 select-none"
          />
          </figure>
          <button onClick={handleFavClick} className="absolute top-2 right-2 btn btn-ghost"><GrFavorite size={"1.5em"}/></button>
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
          <h2 className="card-title truncate">The show</h2>
          <p className=" truncate">
            If a dog chews shoes whose shoes does he choose?
          </p>
          <div className=" flex flex-row justify-between mt-4">
            <div className="avatar flex items-center">
              <div className="w-10 rounded-full">
                <img src="https://avatar.iran.liara.run/public" />
              </div>
              <h3 className="ml-2 font-semibold">Uploader</h3>
            </div>
            <div className="flex items-center">
              <p> 15 views</p>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Card;
