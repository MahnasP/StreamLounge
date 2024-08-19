import React, { useState } from "react";
import SearchInput from "./SearchInput";
import CategoryCard from "./CategoryCard";
import { Category } from "../../utils/categories";
import { Link } from "react-router-dom";

function Search() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll">
      <div className=" flex flex-col p-8 m-10 bg-base-200 rounded-xl shadow-lg shadow-accent/20">
        <div className=" max-w-md m-2 mb-5">
          <SearchInput searchText={searchText} setSearchText={setSearchText} />
        </div>
        {searchText === "" ? (
          <div>
            <h1 className=" font-semibold selection:text-primary text-lg m-3 mt-7">
              Browse All
            </h1>
            <div className="mt-8 flex flex-wrap gap-6 max-lg:justify-center">
              {Category.map((cat, ind) => (
                <Link key={ind} to={"/"}>
                  <CategoryCard category={cat} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <h1>{searchText}</h1>
        )}
      </div>
    </div>
  );
}

export default Search;
