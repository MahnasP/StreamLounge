import React, { useEffect, useState } from "react";
import CategoryContainer from "./CategoryContainer";
import Card from "../../components/Card";
import usePodcastApi from "../../hooks/usePodcastApi";
import toast from "react-hot-toast";
import CardSkeleton from "../../components/CardSkeleton";

function Dashboard() {
  const [mostPopular, setMostPopular] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comedy, setComedy] = useState([]);
  const [education, setEducation] = useState([]);
  const [news, setNews] = useState([]);

  const { getMostPopular, getPodcastByCategory } = usePodcastApi();

  const getPodcastsData = async () => {
    setLoading(true);
    try {
      setMostPopular(await getMostPopular());
      setComedy(await getPodcastByCategory("Comedy"));
      setEducation(await getPodcastByCategory("Education"));
      setNews(await getPodcastByCategory("News"));
    } catch (error) {
      console.error(error);
      toast.error("Error in fetching podcasts/series");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPodcastsData();
  }, []);

  return (
    <div className=" w-full h-full flex flex-col overflow-y-scroll">
      <CategoryContainer
        title={"Most Popular"}
        to={"/displaypodcasts/Most Popular"}
      >
        {loading ? (
          <CardSkeleton />
        ) : (
          mostPopular
            .slice(0, 7)
            .map((podcast) => <Card key={podcast._id} podcast={podcast} />)
        )}
      </CategoryContainer>
      <CategoryContainer title={"Comedy"} to={"/displaypodcasts/Comedy"}>
        {loading ? (
          <CardSkeleton />
        ) : (
          comedy
            .slice(0, 7)
            .map((podcast) => <Card key={podcast._id} podcast={podcast} />)
        )}
      </CategoryContainer>
      <CategoryContainer title={"Education"} to={"/displaypodcasts/Education"}>
        {loading ? (
          <CardSkeleton />
        ) : (
          education
            .slice(0, 7)
            .map((podcast) => <Card key={podcast._id} podcast={podcast} />)
        )}
      </CategoryContainer>
    </div>
  );
}

export default Dashboard;
