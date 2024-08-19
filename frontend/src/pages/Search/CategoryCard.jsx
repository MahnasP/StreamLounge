import React from "react";

function CategoryCard({ category }) {
  return (
    <div
      className={`group w-36 h-36 md:w-64 rounded-lg p-4 ${category.color} 
        hover:cursor-pointer hover:-translate-y-2 transition-all duration-400 
        ease-in-out hover:shadow-lg hover:brightness-125 active:scale-95 overflow-y-clip`}
    >
      <div className="text-neutral-50 text-xl font-semibold max-lg:text-lg">
        {category.name}
      </div>
      <div className="flex justify-end items-end w-full h-full ">
        <img
          src={category.img}
          alt="podcast"
          className="h-24 w-20 object-cover transition-all duration-400 transform rotate-[18deg] group-hover:rotate-[5deg]"
        //   style={{ clipPath: "polygon(0 0, 100% 0, 100% 66%, 0 98%)" }}
        />
      </div>
    </div>
  );
}

export default CategoryCard;
