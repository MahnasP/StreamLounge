import { useEffect, useState } from "react";
import "./App.css";
import PageLoading from "./components/PageLoading";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className=" flex justify-center items-center h-screen w-full">
          <PageLoading />
        </div>
      ) : (
        <div className="relative flex justify-center items-center h-screen w-full overflow-hidden">
          <Sidebar />

          {/* add router outlet here */}
          <h1 className=" text-2xl ">content</h1>
            
        </div>
      )}
    </>
  );
}

export default App;
