import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import FoodSearchBar from "./FoodSearchBar";
import SearchResults from "./SearchResults";

function AddFoodView({ handleAddConsumption }) {
  const [fdcSearchResults, setFdcSearchResults] = useState([]);
  // const [fetchError, setFetchError] = useState(false);
  const initialParams = {
    api_key: "eoMa4yeUPInz2z22IVkak2F9PZfOMsGYk8Fb7QEb",
    query: "",
    dataType: ["SR Legacy", "Survey (FNDDS)", "Branded"],
    sortBy: "lowercaseDescription.keyword",
    pageSize: 20,
  };
  const [fdcSearchParams, setFdcSearchParams] = useState(initialParams);
  const fdc_api_url = `https://api.nal.usda.gov/fdc/v1/search?api_key=${encodeURIComponent(
    fdcSearchParams.api_key
  )}&query=${encodeURIComponent(
    fdcSearchParams.query
  )}&pageSize=${encodeURIComponent(
    fdcSearchParams.pageSize
  )}&dataType=${encodeURIComponent(fdcSearchParams.dataType)}`; //order matters!! this line cannot go before line that defines searchParams

  // function that gets passed to <SearchBar />. Receives user's searchTerm as input and changes the fdcSearchParams state.  This changes the fdc_api_url, which takes values from the fdcSearchParams.
  function handleSearchChange(searchTerm) {
    setFdcSearchParams({ ...initialParams, query: searchTerm });
  }

  //Whenever fdcSearchParams state changes, request for fresh search results from fdc & update FdcSearchResults state using results.
  useEffect(() => {
    fetch(fdc_api_url)
      .then((resp) => resp.json())
      .then((resp) => resp.foods)
      .then((results) => setFdcSearchResults(results));
  }, [fdc_api_url]);

  return (
    <div>
      <FoodSearchBar handleSearchChange={handleSearchChange} />

      <SearchResults
        handleAddConsumption={handleAddConsumption}
        fdcSearchResults={fdcSearchResults}
      />
    </div>
  );
}

export default AddFoodView;
