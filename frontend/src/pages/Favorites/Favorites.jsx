import React from 'react'
import CategoryContainer from '../Dashboard/CategoryContainer'
import Card from '../../components/Card'

function Favorites() {
  return (
    <div className=" w-full h-full flex flex-col overflow-y-scroll">
    <CategoryContainer title={"Favorites"}>
        <Card/>
      </CategoryContainer>
      </div>
  )
}

export default Favorites