import React from 'react'
import Lottie from 'lottie-react';
import animationData from '../assets/load ani.json'

function PageLoading() {
  return (
    <Lottie 
            animationData={animationData}
          loop={true}
          style={{ height: 400, width: 400 }}
        />
  )
}

export default PageLoading