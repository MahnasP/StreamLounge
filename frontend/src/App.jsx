import { useEffect, useState } from "react";
import "./App.css";
import PageLoading from "./components/PageLoading";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { motion } from "framer-motion";

function App() {
  const [sidebaropen, setSidebarOpen] = useState(true);

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full overflow-hidden">
        <Sidebar open={sidebaropen} setOpen={setSidebarOpen} />

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
