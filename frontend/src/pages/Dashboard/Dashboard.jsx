import React from "react";
import CategoryContainer from "./CategoryContainer";
import Card from "../../components/Card";

function Dashboard() {
  return (
    <div className=" w-full h-full flex flex-col overflow-y-scroll">
      <CategoryContainer title={"Most Popular"} to={"/displaypodcasts/Most Popular"}>
        <Card />
        
      </CategoryContainer>
      <CategoryContainer title={"Comedy"} to={"/displaypodcasts/Comedy"}>
        <Card />
        
      </CategoryContainer>
      <CategoryContainer title={"Education"} to={"/displaypodcasts/Education"}>
        <Card />
        
      </CategoryContainer>
    </div>
  );
}

export default Dashboard;
