import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoCloseOutline } from "react-icons/io5";
import { buttons, elements } from './elementsArray';
import Element from './Element';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';


function Sidebar() {
    const [open, setOpen] = useState(true);
  return (
      <motion.div
          
          className=' absolute left-0 flex flex-col  h-full max-w-250  bg-base-300 shadow-lg sm:max-lg:z-10'>
          <div className='flex items-center '>
              <div className='flex items-center select-none'>
              <img src='/play- for light.png' className=' h-10 m-2'></img>
              <h1 className='font-medium text-primary text-xl  mr-7 '>Stream Lounge</h1>
              </div>
              <IoCloseOutline className='mt-1 mr-2 rounded-full transition cursor-pointer lg:hidden hover:bg-accent hover:text-accent-content duration-300' size={"3em"} />
          </div>

          <ul className="menu"> 
              {elements.map((ele, ind) => (
                  <li className='my-3' key={ind}>
                      
                      <a>
                      <Link className='flex items-center gap-2' to={ele.link}>
                          {ele.icon}
                              <h3 className='font-semibold text-md'>{ele.name}</h3>
                              </Link>
                          </a>
                          
            </li>
            ))}
          </ul>

          <div className="divider self-center w-5/6"></div>

          <ul className="menu"> 
              {buttons.map((ele, ind) => (
                <li className='my-3' key={ind}>
                      <a>
                          {ele.icon}
                          <h3 className='font-semibold text-md'>{ele.name}</h3>
                      </a>
            </li>
            ))}
          </ul>
          
          {/* {elements.map((ele,ind) => (
                  <Element key={ind} icon={ele.icon} name={ele.name}/>
          ))} */}
          
      </motion.div>
  )
}

export default Sidebar