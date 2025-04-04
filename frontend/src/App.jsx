import { useEffect, useState } from "react";
import "./App.css";
import PageLoading from "./components/PageLoading";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { motion } from "framer-motion";
import Upload from "./components/upload/Upload";
import toast, { Toaster } from "react-hot-toast";
import Login from "./components/Login/Login";
import PodcastForm from "./components/upload/PodcastForm";
import useGoogleLogin from "./hooks/useGoogleLogin";

function App() {
  const [sidebaropen, setSidebarOpen] = useState(true);
  const location=useLocation();
  const {processGoogleToken}=useGoogleLogin();

  useEffect(() => {
    if(location.pathname==="/auth/success"){
      const token=new URLSearchParams(location.search).get("token");
      if(token){
        processGoogleToken(token);
      }
      else{
        console.log("No token found in URL");
        toast.error("google login error - No token found in URL");
      }
    }
  },[location,processGoogleToken]);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: { borderRadius: "50px", padding: "10px 20px", zIndex: 9999 },
        }}
      />
      <div className="flex justify-center items-center h-screen w-full overflow-hidden">
        <Sidebar open={sidebaropen} setOpen={setSidebarOpen} />

        <PodcastForm />

        <Login />
        <motion.div
          layout
          className="relative h-full w-full flex flex-col items-center"
        >
          <Navbar open={sidebaropen} setOpen={setSidebarOpen} />

          {/* add router outlet here */}
          <Outlet />
        </motion.div>
      </div>
    </>
  );
}

export default App;
