import React from 'react';
import { Link } from 'react-router-dom';

function MoreResultCard() {
  return (
    <Link 
       
      className="bg-base-100 flex items-center p-4 rounded-xl gap-5 transition-transform duration-400 ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg"
      style={{ textDecoration: 'none' }}
    >
      <img 
              // src=
        src='https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp'      
              // alt={podcast?.name} 
              alt='name'
        className="h-20 w-36 rounded-lg object-cover sm:h-15 sm:w-25"
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
                  {/* {podcast?.name} */}
                  Name
        </div>
        <div className="flex gap-2 text-sm sm:text-xs">
          <div className="mr-3">
                      {/* {podcast?.creator.name} */}
                      uploader
          </div>
          <div>
                      {/* • {podcast?.views} Views */}
                      • 30 Views
          </div>
          <div>
                      {/* • {format(podcast?.createdAt)} */}
                      • 5 months ago
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MoreResultCard