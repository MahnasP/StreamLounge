import axios from "axios";
import React from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import CategoryContainer from "../Dashboard/CategoryContainer";
import CardSkeleton from "../../components/CardSkeleton";
import Card from "../../components/Card";

function Profile() {
  const isAuthenticated = useSelector((state) => state.auth.status);
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);

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
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  return loading ? (
    <div className="flex h-screen w-3/4 gap-8 items-start justify-center mt-20">
      <div className="skeleton h-44 w-36"></div>
      <div className="flex flex-col gap-4 w-full">
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-2/4"></div>
        <div className="skeleton h-4 w-2/4"></div>
      </div>
    </div>
  ) : (
    isAuthenticated && (
      <div className="flex flex-col w-full">
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src= {user.profilepic}
                alt="user profile"
              className="max-w-40 lg:max-w-52 rounded-full shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">{user.name}</h1>
              <p className="py-6 ml-1">
                {user.email}
              </p>
              
            </div>
          </div>
        </div>
        <CategoryContainer title={"Your Uploads"} >
        {loading ? (
          <CardSkeleton />
        ) : !user.podcast || user.podcasts?.length === 0 ? (
          <p>No series/podcasts</p>
        ) : (
          user.podcasts
            .map((podcast) => (
              <Card key={podcast._id} podcast={podcast} user={user} />
            ))
        )}
        </CategoryContainer>
      </div>
    )
  );
}

export default Profile;
