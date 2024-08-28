import React from 'react'
import CategoryContainer from '../Dashboard/CategoryContainer'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card';

function DisplayPodcast() {

  const { type } = useParams();
  console.log(type);

  return (
    <div className=" w-full h-full flex flex-col overflow-y-scroll">
    <CategoryContainer title={type}>
          <Card/>
      </CategoryContainer>
      </div>
  )
}

export default DisplayPodcast