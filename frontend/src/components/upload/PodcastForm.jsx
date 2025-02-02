import React, { useState } from "react";
import EpisodeUpload from "./EpisodeUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

const categories = [
  "Culture",
  "Business",
  "Education",
  "Health",
  "Comedy",
  "News",
  "Science",
  "History",
  "Religion",
  "Development",
  "Sports",
  "Crime",
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
  const [loading, setLoading] = useState(false);

  const resetPodcastData = () => {
    setPodcastData({
      name: "",
      desc: "",
      thumbnail: null,
      category: "",
      episodes: [],
    });
    setEpisodeObjects([]);
  };

  const validatePodcastFormData = () => {
    if (
      !podcastData.name ||
      !podcastData.desc ||
      !podcastData.thumbnail ||
      !podcastData.category ||
      podcastData.episodes.length === 0
    )
      return false;
    return true;
  };

  const closePodcastFormModal = () => {
    resetPodcastData();
    document.getElementById("podcastform_modal").close();
  };

  const openEpisodeModal = () => {
    document.getElementById("episodeupload_modal").showModal();
  };
  const closeEpisodeModal = () => {
    document.getElementById("episodeupload_modal").close();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPodcastData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    setPodcastData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handleAddEpisode = (episode) => {
    setEpisodeObjects((prev) => [...prev, episode]);
    setPodcastData((prev) => ({
      ...prev,
      episodes: [...prev.episodes, episode._id],
    }));
    closeEpisodeModal();
  };

  const handleSubmit = async () => {
    if (!validatePodcastFormData()) {
      return toast.error("Fill all fields to proceed");
    }

    const formData = new FormData();
    formData.append("name", podcastData.name);
    formData.append("desc", podcastData.desc);
    formData.append("thumbnail", podcastData.thumbnail);
    formData.append("category", podcastData.category || categories[0]); // Default to first category
    formData.append("episodes", JSON.stringify(podcastData.episodes));
    const token = localStorage.getItem("streamLoungeToken");

    try {
      setLoading(true);
      await axios.post("/api/podcast/create", formData, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Podcast/Series created successfully!");
    } catch (error) {
      console.error("Error creating podcast:", error);
      toast.error("Error creating podcast:", error.message);
    } finally {
      setLoading(false);
      closePodcastFormModal();
    }
  };

  return (
    <>
      <dialog
        id="podcastform_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-4 text-lg"
              onClick={(e) => {
                e.preventDefault();
                closePodcastFormModal();
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl pl-3">Upload</h3>
          <div className="form-control space-y-3 mt-5">
            <input
              type="text"
              name="name"
              value={podcastData.name}
              onChange={handleInputChange}
              placeholder="Podcast/Series Name"
              className="input input-bordered"
            />
            <textarea
              name="desc"
              placeholder="Podcast/Series Description"
              value={podcastData.desc}
              onChange={handleInputChange}
              className="textarea textarea-bordered"
            />
            <label className="form-control">
              <span className="label-text ml-3 mb-1">Pick a thumbnail</span>

              <input
                type="file"
                accept="image/jpeg, image/png, image/gif"
                onChange={handleThumbnailChange}
                className="file-input file-input-bordered mb-2"
              />
            </label>

            <select
              name="category"
              value={podcastData.category}
              onChange={handleInputChange}
              className="select select-bordered sm:overflow-y-auto"
            >
              <option selected>Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Uploaded Episodes List */}
            <div className="border p-4 rounded-3xl">
              <h3 className="font-bold mb-2">Uploaded Episodes:</h3>
              {episodeObjects.length > 0 ? (
                <ul className=" p-3 ">
                  {episodeObjects.map((episode, index) => (
                    <li
                      key={index}
                      className="bg-base-200 rounded-full flex justify-between px-5 py-3"
                    >
                      <span className="font-medium truncate">
                        {episode.name}
                      </span>
                      <button
                        className="btn btn-sm btn-circle btn-ghost text-xl"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <MdOutlineDeleteForever />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-base select-none">
                  No episodes uploaded yet.
                </p>
              )}
              {/* Add Episode Button */}
              <button
                className="btn btn-outline btn-primary mt-2"
                onClick={() =>
                  document.getElementById("episodeupload_modal").showModal()
                }
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Add Episode"
                )}
              </button>
            </div>

            <button onClick={handleSubmit} className="btn btn-primary mt-4">
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </div>
      </dialog>
      <EpisodeUpload onEpisodeUploaded={handleAddEpisode} />
    </>
  );
}

export default PodcastForm;
