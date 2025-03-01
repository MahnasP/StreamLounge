import React, { useEffect } from "react";
import CategoryContainer from "../Dashboard/CategoryContainer";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";


function Favorites() {
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const isAuthenticated = useSelector((state) => state.auth.status);
  const token = localStorage.getItem("streamLoungeToken");

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in fetching user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  },[isAuthenticated]
  );

  return (
    <>
      {!isAuthenticated ? (
        <h1 className=" text-lg">Login to view favoirtes</h1>
      ) : (
        <div className=" w-full h-full flex flex-col overflow-y-scroll">
          {loading?<span className="loading loading-spinner loading-xl"></span>:
          <CategoryContainer title={"Favorites"}>
            {user?.favorites?.length > 0 ? (
              user?.favorites?.map((podcast) => (
                <Card
                  key={podcast._id}
                  podcast={podcast}
                  user={user}
                />
              ))
            ) : (
              <h1 className=" text-lg">No favorites found</h1>
            )}
          </CategoryContainer>
          }
        </div>
      )}
    </>
  );
}

export default Favorites;
