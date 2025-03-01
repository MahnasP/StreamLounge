import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryContainer({ title, to, children }) {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col bg-base-200 rounded-xl shadow-lg shadow-accent/10 p-8 m-7">
      <div className="w-full flex flex-row justify-between items-center mb-6">
        <h1 className=" font-semibold selection:text-primary text-lg m-1 mr-2">
          {title}
        </h1>
        {to && (
          <button
            onClick={() => navigate(to)}
            className="btn btn-ghost text-primary text-base"
          >
            View All
          </button>
        )}
      </div>
      <div className=" flex flex-wrap max-lg:justify-center gap-4 px-4 py-1">
        {children}
      </div>
    </div>
  );
}

export default CategoryContainer;
