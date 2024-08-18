import React from "react";
import CategoryContainer from "./CategoryContainer";
import Card from "../../components/Card";

function Dashboard() {
  return (
    <div className=" w-full h-full flex flex-col overflow-y-scroll">
      <CategoryContainer title={"Most Popular"} to={"/"}>
        <Card />
        
      </CategoryContainer>
    </div>
  );
}

export default Dashboard;
