import React from "react";
import ServingSelect from "./ServingSelect";
// import { useState, useEffect } from 'react'

function SearchInfoBox({ fdcFoodResult, handleAddConsumption }) {
  let header;
  const generateInfoBoxHeader = () => {
    if (fdcFoodResult?.dataType === "Branded") {
      header =
        fdcFoodResult.brandName && fdcFoodResult.brandOwner
          ? `${fdcFoodResult.description} (Brand: ${fdcFoodResult.brandName})`
          : `${fdcFoodResult.description} (Brand: ${fdcFoodResult.brandOwner})`;
    } else header = fdcFoodResult?.description;
  };
  generateInfoBoxHeader();

  return (
    <div>
      <br />
      <div>
        <h3>{header}</h3>
        <ServingSelect
          handleAddConsumption={handleAddConsumption}
          item={fdcFoodResult}
          description={header}
        />
      </div>
    </div>
  );
}

export default SearchInfoBox;
