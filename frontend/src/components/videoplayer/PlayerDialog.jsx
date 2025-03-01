import React from "react";
import PlayerWrapper from "./PlayerWrapper";
import { useDispatch, useSelector } from "react-redux";
import { closePlayerModal } from "../../store/modalSlice";

const PlayerDialog = ({ episode }) => {
  const closeVideoPlayerModal = () => {
    dispatch(closePlayerModal());
    document.getElementById("video_player_modal").close();
  };

  const dispatch = useDispatch();

  const opened = useSelector((state) => state.modal.playerModalStatus);

  return (
    <dialog id="video_player_modal" className="modal">
      {opened && (
        <div className="modal-box w-11/12">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-4 text-lg"
            onClick={(e) => {
              e.preventDefault();
              closeVideoPlayerModal();
            }}
          >
            ✕
          </button>
          <div className="flex flex-col m-4">
            <div className="">
              <PlayerWrapper episodeLink={episode?.file} />
            </div>
            <h3 className="font-bold text-lg mt-4">
              {episode?.name || "Episode Name"}
            </h3>
            <p className="py-4">{episode?.desc || "Episode Description"}</p>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default PlayerDialog;
