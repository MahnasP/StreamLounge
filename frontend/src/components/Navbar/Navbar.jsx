import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion, AnimatePresence, px } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ThemeController from "../ThemeController";
import { MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";

function Navbar({ open, setOpen }) {
  const isAuthenticated = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  return (
    <motion.div
      className="sticky top-0 navbar bg-base justify-between"
      layout={true}
    >
      <div className="flex-none ">
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="transition-all btn btn-square btn-ghost hover:bg-primary hover:text-accent-content active:scale-75 "
        >
          <HiMenuAlt2 size={"2.5em"} />
        </button>
      </div>
      <AnimatePresence mode="wait">
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{
              delay: 0.2,
              duration: 0.2,
            }}
            className="flex-1"
          >
            <Link to={"/"} className="btn btn-ghost text-xl text-primary">
              Stream Lounge
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-none mr-5">
        <ThemeController />
        {!isAuthenticated && (
          <motion.button
            whileTap={{ scale: 0.75, rotate: "5deg" }}
            className="btn btn-outline btn-primary ml-4"
            onClick={()=>document.getElementById("login_modal").showModal()}
          >
            Login
          </motion.button>
        )}
        {isAuthenticated && (
          <div className=" avatar ml-4 active:scale-75 transition-all" onClick={()=>{navigate("/profile")}}>
            <div className="hover:ring-primary hover:ring-offset-base-100 w-9 rounded-full hover:ring hover:ring-offset-2 transition-all">
            <MdAccountCircle size={"2.3em"} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Navbar;
