import React, { useState } from "react";
import SearchInput from "./SearchInput";
import CategoryCard from "./CategoryCard";
import { Category } from "../../utils/categories";
import { Link } from "react-router-dom";
import TopResultCard from "./TopResultCard";
import MoreResultCard from "./MoreResultCard";
import usePodcastApi from "../../hooks/usePodcastApi";
import toast from "react-hot-toast";

function Search() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedPodcasts, setSearchedPodcasts] = useState([]);
  const { searchPodcasts } = usePodcastApi();

  const handleChange = async (value) => {
    setSearchedPodcasts([]);
    setSearchText(value);
    setLoading(true);
    // Call the search API
    try {
      const response = await searchPodcasts(value);
      setSearchedPodcasts(response);
    } catch (error) {
      console.error("Error in searching podcasts", error);
      toast.error("Error in searching podcasts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll">
      <div className=" flex flex-col p-8 m-10 bg-base-200 rounded-xl shadow-lg shadow-accent/20">
        <div className=" max-w-lg m-2 mb-5">
          <SearchInput searchText={searchText} handleChange={handleChange} />
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
            {searchedPodcasts.length === 0 ? (
              <h1 className="font-semibold text-lg m-3 mt-7 select-none">
                No results found
              </h1>
            ) : (
              <>
                <TopResultCard
                  className={"m-3 mb-8 max-lg:self-center"}
                  podcast={searchedPodcasts[0]}
                />
                <div>
                  {searchedPodcasts.length>1 &&<>
                  <h3 className="ml-4">More Results:</h3>
                  <div className=" m-3 flex flex-col gap-2 overflow-y-scroll max-h-96">
                    {searchedPodcasts
                      .slice(1, searchedPodcasts.length)
                      .map((podcast, index) => (
                        <MoreResultCard key={index} podcast={podcast} />
                      ))}
                      
                  </div>
                  </>}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
