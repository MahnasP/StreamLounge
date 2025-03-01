import { useEffect, useState } from "react";
import "./App.css";
import PageLoading from "./components/PageLoading";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { motion } from "framer-motion";
import Upload from "./components/upload/Upload";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login/Login";
import PodcastForm from "./components/upload/PodcastForm";

function App() {
  const [sidebaropen, setSidebarOpen] = useState(true);
  return (
    <>
      <Toaster
        position="bottom-left"
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
