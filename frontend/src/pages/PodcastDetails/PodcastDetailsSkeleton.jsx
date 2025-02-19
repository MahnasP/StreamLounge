import React from "react";

function PodcastDetailsSkeleton() {
  return (
    <div className="flex w-52 flex-row gap-4">
        <div className="flex flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
}

export default PodcastDetailsSkeleton;
