import React from "react";
import EpisodeCard from "./EpisodeCard";

function PodcastDetails() {
  return (
    <div className="bg-base-200 w-full h-full flex flex-col overflow-y-scroll">
      <div className=" p-3 ">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            
              <div className="avatar flex items-center ">
                <div className="w-7 lg:w-8 rounded-full">
                  <img src="https://avatar.iran.liara.run/public" />
                </div>
                <h3 className="ml-2 font-semibold">
                  Uploader
                </h3>
              </div>
              <ul className="flex items-center flex-row space-x-3 mt-4">
                <li className=" list-item min-w-10">• {2} Views</li>
                <li className=" list-item">• {5} months ago</li>
              </ul>
            
          </div>
        </div>
      </div>
      <div className=" m-7 py-3 rounded-xl">
        <h1 className="text-2xl lg:text-3xl font-bold mb-3">Episodes</h1>
        <EpisodeCard/>
      </div>
    </div>
  );
}

export default PodcastDetails;
