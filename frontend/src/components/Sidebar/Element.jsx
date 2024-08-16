import React from 'react'

function Element({icon,name}) {
    return (
      
        <div className=' flex items-center gap-3 my-2 mx-2 p-2 rounded-full hover:bg-accent hover:text-accent-content transition-all duration-200 cursor-pointer select-none'>
            {icon}
            <h3 className=' no-underline pt-1 font-semibold'>{name}</h3>
      </div>
  )
}

export default Element