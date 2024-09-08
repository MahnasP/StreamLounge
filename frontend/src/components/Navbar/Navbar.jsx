import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import ThemeController from "../ThemeController";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar({ open, setOpen }) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
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
            <Link to={"/"} className="btn btn-ghost text-xl text-primary">Stream Lounge</Link>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex-none mr-5">
        <ThemeController/>
        {!isAuthenticated && <motion.button
          whileTap={{ scale: 0.75, rotate: "5deg" }}
          className="btn btn-outline btn-primary ml-4"
          onClick={() => loginWithRedirect()}
        >
          Login
        </motion.button>}
      </div>
      
    </motion.div>
  );
}

export default Navbar;
