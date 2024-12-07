import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function EpisodeUpload({ onEpisodeUploaded }) {
  const [episodeData, setEpisodeData] = useState({
    name: "",
    desc: "",
    mediaType: "video",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEpisodeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEpisodeData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleUploadEpisode = async () => {
    const formData = new FormData();
    formData.append("name", episodeData.name);
    formData.append("desc", episodeData.desc);
    formData.append("mediaType", episodeData.mediaType);
    formData.append("file", episodeData.file);

    try {
      setLoading(true);
      const response = await axios.post(
        "/api/podcast/episode/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const episode = response.data;
      if (episode) onEpisodeUploaded(episode);
    } catch (error) {
      toast.error("error uploading episode ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="episodeupload_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl pl-3">Upload Episode</h3>

        <div className="form-control">
          <input
            type="text"
            name="name"
            placeholder="Episode name"
            value={episodeData.name}
            onChange={handleInputChange}
            className="input input-bordered"
          />
          <textarea
            name="desc"
            placeholder="Episode Description"
            value={episodeData.desc}
            onChange={handleInputChange}
            className="textarea textarea-bordered"
          />
          {/* <select name="type" value={episodeData.type} onChange={handleInputChange} className="select select-bordered">
                <option value="video">Video</option>
                <option value="audio">Audio</option>
            </select> */}
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered"
          />
          <button
            className="btn btn-primary mt-4"
            onClick={handleUploadEpisode}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Upload Episode"
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default EpisodeUpload;
