import React, { useEffect, useState } from "react";
import CategoryContainer from "../Dashboard/CategoryContainer";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import toast from "react-hot-toast";
import CardSkeleton from "../../components/CardSkeleton";
import { use } from "react";
import usePodcastApi from "../../hooks/usePodcastApi";

function DisplayPodcast() {
  const { type } = useParams();
  //console.log(type);

  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {getMostPopular, getPodcastByCategory} = usePodcastApi();

  const getPodcasts = async () => {
    setLoading(true);
    try {
      if (type === "Most Popular") {
        setPodcasts(await getMostPopular());
      } else {
        setPodcasts(await getPodcastByCategory(type));
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in fetching podcasts/series");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPodcasts();
  }, []);

  return (
    <div className=" w-full h-full flex flex-col overflow-y-scroll">
      <CategoryContainer title={type}>
        {podcasts.length===0?"No Podcasts/series in this category":(loading ? (
          <CardSkeleton />
        ) : (
          podcasts.map((podcast) => (
            <Card key={podcast._id} podcast={podcast} />
          ))
        ))}
      </CategoryContainer>
    </div>
  );
}

export default DisplayPodcast;
