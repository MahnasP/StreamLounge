import React from "react";

function CardSkeleton() {
  return (
    <div className="flex w-80 max-md:w-60 flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
}

export default CardSkeleton;
