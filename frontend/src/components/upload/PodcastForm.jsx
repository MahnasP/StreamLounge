import React, { useState } from 'react'

const categories = [
    "Culture", "Business",
    "Education", "Health",
    "Comedy", "News",
    "Science", "History",
    "Religion", "Development",
    "Sports", "Crime",
  ];

function PodcastForm() {
    const [podcastData, setPodcastData] = useState({
        name: "",
        desc: "",
        thumbnail: null,
        category: "",
        episodes: [],
    });

    const [episodeObjects, setEpisodeObjects] = useState([]);

    const openEpisodeModal = () => {
        document.getElementById("episodeupload_modal").showModal();
    }
    const closeEpisodeModal = () => {
        document.getElementById("episodeupload_modal").close();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPodcastData((prev) => ({ ...prev, [name]: value }));
    }

    const handleThumbnailChange = (e) => {
        setPodcastData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
    }

    const handleAddEpisode = (episode) => {
        setEpisodeObjects((prev) => [...prev, episode]);
        setPodcastData((prev) => ({ ...prev, episodes: [...prev.episodes, episode._id] }));
        closeEpisodeModal();
    }

  return (
    <div>PodcastForm</div>
  )
}

export default PodcastForm