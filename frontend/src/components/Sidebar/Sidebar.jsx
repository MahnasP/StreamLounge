import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { buttons, elements } from "./elementsArray";
import Element from "./Element";
import { Link } from "react-router-dom";
import ThemeController from "../ThemeController";

const bar = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0.2, x: -100 },
};

function Sidebar({ open, setOpen }) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={bar}
          transition={{
            ease: "easeInOut",
            duration: 0.4,
          }}
          className={`max-lg:z-10  max-lg:fixed z-0 left-0 flex flex-col h-full lg:min-w-60 max-w-250  bg-base-300 shadow-lg `}
        >
          
          <div className="flex items-center ">
            <div className="flex items-center select-none">
              <img src="/play- for light.png" className=" h-10 m-2"></img>
              <h1 className="font-medium text-primary text-xl  mr-7 ">
                Stream Lounge
              </h1>
            </div>
            <IoCloseOutline
              onClick={() => setOpen(false)}
              className="mt-1 mr-2 rounded-full transition cursor-pointer lg:hidden hover:bg-accent hover:text-accent-content active:scale-75 duration-300"
              size={"3em"}
            />
          </div>

          <ul className="menu">
            {elements.map((ele, ind) => (
              <li className="my-3" key={ind}>
                <a className="hover:shadow-lg hover:shadow-accent/20 active:scale-90">
                  <Link className="flex items-center gap-2 " to={ele.link}>
                    {ele.icon}
                    <h3 className="font-semibold text-md">{ele.name}</h3>
                  </Link>
                </a>
              </li>
            ))}
          </ul>

          <div className="divider self-center w-5/6"></div>

          <ul className="menu">
            {buttons.map((ele, ind) => (
              <li className="my-3" key={ind} onClick={ele.fun}>
                <a>
                  {ele.icon}
                  <h3 className="font-semibold text-md">{ele.name}</h3>
                </a>
              </li>
            ))}
          </ul>

          {/* {elements.map((ele,ind) => (
                <Element key={ind} icon={ele.icon} name={ele.name}/>
        ))} */}
        
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
