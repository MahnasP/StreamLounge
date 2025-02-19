import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

function usePodcastApi() {
  const podcastapi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/podcast`,
  });

  const token = localStorage.getItem("streamLoungeToken");

  //get all podcasts
  const getAllPodcasts = async () => {
    try {
      const response = await podcastapi.get("/all");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Error in fetching podcasts/series");
    }
  };

  //get podcast by category
  const getPodcastByCategory = async (category) => {
    try {
      const response = await podcastapi.get(`/category?q=${category}`);
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Error in fetching podcasts/series by category");
    }
  };

  //get podcast by id
  const getPodcastById = async (id) => {
    try {
      const response = await podcastapi.get(`/get/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Error in fetching podcast/series");
    }
  };

  //get most popular podcasts
  const getMostPopular = async () => {
    try {
      const response = await podcastapi.get("/mostpopular");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Error in fetching most popular podcasts/series");
    }
  };

  //add view to podcast
  const addView = async (id) => {
    try {
      await podcastapi.post(`/addview/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Error in adding view");
    }
  };

  //add podcast to favorites
  const favoritePodcast = async (id) => {
    try {
      const response = await podcastapi.post(
        "/favorite",
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error in adding podcast to favorites");
    }
  };

  //search podcasts
  const searchPodcasts = async (query) => {
    try {
      const response = await podcastapi.get(`/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Error in searching podcasts/series");
    }
  };

  return {
    getAllPodcasts,
    getPodcastByCategory,
    getPodcastById,
    getMostPopular,
    addView,
    favoritePodcast,
    searchPodcasts,
  };
}

export default usePodcastApi;
