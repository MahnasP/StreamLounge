import React, { useState } from "react";
import SearchInput from "./SearchInput";
import CategoryCard from "./CategoryCard";
import { Category } from "../../utils/categories";
import { Link } from "react-router-dom";
import TopResultCard from "./TopResultCard";
import MoreResultCard from "./MoreResultCard";

function Search() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll">
      <div className=" flex flex-col p-8 m-10 bg-base-200 rounded-xl shadow-lg shadow-accent/20">
        <div className=" max-w-md m-2 mb-5">
          <SearchInput
            searchText={searchText}
            setSearchText={setSearchText}
            setLoading={setLoading}
          />
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
        ) : loading ? (
          <span className="loading loading-dots loading-lg max-lg:loading-md m-5 ml-9" />
        ) : (
          <div className="flex gap-3 max-lg:flex-col">
                <TopResultCard className={"m-3 mb-8"} />
                
                <div className=" m-3 flex flex-col gap-2 overflow-y-scroll max-h-96">
                More Results:
                  {
                    Array(5).fill().map((_, index) => (
                      <MoreResultCard key={index}/>
                    ))
                  }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
