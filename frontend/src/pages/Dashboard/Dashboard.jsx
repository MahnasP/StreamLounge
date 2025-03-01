import React, { useEffect, useState } from "react";
import CategoryContainer from "./CategoryContainer";
import Card from "../../components/Card";
import usePodcastApi from "../../hooks/usePodcastApi";
import toast from "react-hot-toast";
import CardSkeleton from "../../components/CardSkeleton";
import axios from "axios";
import { useSelector } from "react-redux";

function Dashboard() {
  const [mostPopular, setMostPopular] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comedy, setComedy] = useState([]);
  const [education, setEducation] = useState([]);
  const [news, setNews] = useState([]);
  const [user, setUser] = useState({});
  const isAuthenticated = useSelector((state) => state.auth.status);

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

  const token = localStorage.getItem("streamLoungeToken");
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in fetching user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPodcastsData();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  return (
    <div className=" w-full h-full flex flex-col overflow-y-scroll">
      <CategoryContainer
        title={"Most Popular"}
        to={"/displaypodcasts/Most Popular"}
      >
        {loading ? (
          <CardSkeleton />
        ) : mostPopular.length === 0 ? (
          <p>No series/podcasts in this category</p>
        ) : (
          mostPopular
            .slice(0, 7)
            .map((podcast) => (
              <Card key={podcast._id} podcast={podcast} user={user} />
            ))
        )}
      </CategoryContainer>
      <CategoryContainer title={"Comedy"} to={"/displaypodcasts/Comedy"}>
        {loading ? (
          <CardSkeleton />
        ) : comedy.length === 0 ? (
          <p>No series/podcasts in this category</p>
        ) : (
          comedy
            .slice(0, 7)
            .map((podcast) => (
              <Card key={podcast._id} podcast={podcast} user={user} />
            ))
        )}
      </CategoryContainer>
      <CategoryContainer title={"Education"} to={"/displaypodcasts/Education"}>
        {loading ? (
          <CardSkeleton />
        ) : education.length === 0 ? (
          <p>No series/podcasts in this category</p>
        ) : (
          education
            .slice(0, 7)
            .map((podcast) => (
              <Card key={podcast._id} podcast={podcast} user={user} />
            ))
        )}
      </CategoryContainer>
    </div>
  );
}

export default Dashboard;
