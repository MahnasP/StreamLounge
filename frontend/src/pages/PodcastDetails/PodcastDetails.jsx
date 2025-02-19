import React, { useEffect, useState } from "react";
import EpisodeCard from "./EpisodeCard";
import { useParams } from "react-router-dom";
import usePodcastApi from "../../hooks/usePodcastApi";
import { use } from "react";
import { set } from "mongoose";
import EpisodeCardSkeleton from "./EpisodeCardSkeleton";
import PodcastDetailsSkeleton from "./PodcastDetailsSkeleton";

function PodcastDetails() {
  const {id}= useParams();
  const [loading, setLoading] = useState(false);
  const [podcast, setPodcast] = useState({});
  const { getPodcastById } = usePodcastApi();
  
  const getPodcast = async () => {
    setLoading(true);
    try {
      setPodcast(await getPodcastById(id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPodcast();
    
  }, []);

  function calculateMonthsAgo(createdAt) {
    const createdDate = new Date(createdAt); // convert createdAt string to Date object
    const currentDate = new Date(); // current date
    const diffInTime = currentDate.getTime() - createdDate.getTime(); // difference in time in milliseconds
    
    // Convert milliseconds to months (approx. 30.44 days per month)
    const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30.44;
    const monthsAgo = Math.floor(diffInTime / millisecondsInMonth);
    
    
    return monthsAgo;
  }
  
//TODO: Add favorite button and functionality  

  return (
    <div className="bg-base-200 w-full h-full flex flex-col overflow-y-scroll">
      <div className=" p-3 ">
        {
          loading ? <PodcastDetailsSkeleton/> :
          <div className="hero-content flex-col md:flex-row md:justify-start">
          <img
            src={podcast.thumbnail}
            alt="thumbnail"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">{
              podcast.name
              }</h1>
            <p className="py-6">
              {
                podcast.desc
              }
            </p>
            
              <div className="avatar flex items-center ">
                <div className="w-7 lg:w-8 rounded-full">
                  <img src={podcast.creator?.profilepic || "https://avatar.iran.liara.run/public"} />
                </div>
                <h3 className="ml-2 font-semibold">
                  {podcast.creator?.name}
                </h3>
              </div>
              <ul className="flex items-center flex-row space-x-3 mt-4">
                <li className=" list-item min-w-10">• {
                  podcast.views
                  } {" Views"}</li>
                <li className=" list-item">• {
                  
                  calculateMonthsAgo(podcast.createdAt)
                  } {" months ago"}</li>
              </ul>
            
          </div>
        </div>}
      </div>
      <div className=" m-7 py-3 rounded-xl">
        <h1 className="text-2xl lg:text-3xl font-bold mb-3">Episodes</h1>
        <div className="flex flex-col gap-2">
        {loading ? (
          <EpisodeCardSkeleton />
        ) : (
          podcast.episodes?.map((episode,index) => <EpisodeCard key={episode._id} episode={episode} thumbnail={podcast.thumbnail} num={index} />)
        )}
        </div>
      </div>
    </div>
  );
}

export default PodcastDetails;
