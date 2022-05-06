import React from "react";
import SearchResultRow from "./SearchResultsRow";
import { useState, useEffect } from "react";
import SearchInfoBox from "./SearchInfoBox";
// import Scroll from "./Scroll";
// https://stackoverflow.com/questions/61231687/get-value-of-clicked-element-in-react!!!!!!!!!!

function SearchResults({ fdcSearchResults, handleAddConsumption }) {
  const [clickedRowFdcId, setClickedRowFdcId] = useState(null);
  const [fdcFoodResult, setFdcFoodResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let rows;
  const generateRows = () => {
    if (fdcSearchResults) {
      rows = fdcSearchResults.map((foodItem) => {
        return (
          <tr key={foodItem.fdcId} onClick={() => handleRowClick(foodItem)}>
            {/* omFUCKINGGOD I had to pass in the foodItem element as a parameter directly into handleRowClick!!!
                       VS what I tried so many fucking timnes -- which was passing foodItem as some prop (id) to the <tr> element and then try to use event.target.id inside handleRowClick definition */}
            <SearchResultRow foodItem={foodItem} />
            {/* THIS GETS RESULT OF FIRST SEARCH */}
          </tr>
        );
      });
    }
  };
  generateRows();

  useEffect(() => {
    if (isLoading) {
      fetch(
        `https://api.nal.usda.gov/fdc/v1/food/${clickedRowFdcId}?api_key=eoMa4yeUPInz2z22IVkak2F9PZfOMsGYk8Fb7QEb`
      )
        .then((resp) => resp.json())
        .then((food) => {
          setFdcFoodResult(food);
          setIsLoading(false);
        });
    }
  }, [clickedRowFdcId, isLoading]);

  function handleRowClick(foodItem) {
    setClickedRowFdcId(foodItem.fdcId);
    setIsLoading(true);
  }

  return (
    <div>
      <br />
      <table id="search-results-table" className="center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Data Source</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      {fdcFoodResult && isLoading && <h1>Loading...</h1>}
      {fdcFoodResult && !isLoading && (
        <SearchInfoBox
          handleAddConsumption={handleAddConsumption}
          fdcFoodResult={fdcFoodResult}
        />
      )}
    </div>
  );
}

export default SearchResults;
