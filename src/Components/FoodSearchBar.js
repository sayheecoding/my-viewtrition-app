import React from "react";

function SearchBar({ handleSearchChange }) {
  function onSearchChange(event) {
    handleSearchChange(event.target.value);
  }

  return (
    <div>
      <br />
      <span>
        <input
          className="search-bar"
          name="add-food-search-bar"
          type="text"
          placeholder="Search for a food"
          onChange={onSearchChange}
        />
      </span>
    </div>
  );
}

export default SearchBar;
