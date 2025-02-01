import React from 'react'
import Lottie from 'lottie-react';
import animationData from '../assets/load ani.json'

function PageLoading() {


  return (
    <Lottie 
          loop={true} autoplay={true} animationData={animationData}
          style={{ height: 400, width: 400 }}
        />
  )
}

export default PageLoading