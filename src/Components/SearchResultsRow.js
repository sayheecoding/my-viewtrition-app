import React from "react";

function SearchResultsRow({ foodItem }) {
  // console.log(foodItem)
  let source;
  let sourceHoverText;
  let description;

  function generateSource() {
    switch (foodItem.dataType) {
      case "SR Legacy":
        source = "NNDSR";
        sourceHoverText = "National Nutrient Database for Standard Reference";
        break;
      case "Survey (FNDDS)":
        source = "FNDDS";
        sourceHoverText = "Food and Nutrient Database for Dietary Studies";
        break;
      case "Branded":
        source = "Branded";
        sourceHoverText = "USDA Global Branded Food Products Database";
        break;
      default:
        break;
    }
  }

  function generateDescription() {
    if (foodItem.dataType === "Branded") {
      description =
        foodItem.brandName && foodItem.brandOwner
          ? `${foodItem.description} (Brand: ${foodItem.brandName})`
          : `${foodItem.description} (Brand: ${foodItem.brandOwner})`;
    } else description = foodItem.description;
  }

  generateDescription();
  generateSource();

  return (
    <>
      <td>{description}</td>
      <td title={sourceHoverText}>{source}</td>
    </>
  );
}

export default SearchResultsRow;

// function SearchResultsRow({foodItem}) {

//     const handleClick = (event) => {
//         console.log(event.currentTarget)
//     }

//     return (
//         <>
//             <td id={foodItem} onClick={handleClick}>{foodItem.description}</td>
//             <td>{foodItem.dataType}</td>
//         </>
//     )
// }

// export default SearchResultsRow

// const [clickedRow, setClickedRow] = useState(false) //means user clicked a particular SearchResultRow.  If true, render <SearchInfoBox>
//     console.log('fdcSearchResults', fdcSearchResults)
//     const [chosenSearch, setChosenSearch] = useState("blah")
//     const handleClick = (event) => {
//         console.log("hellow")
//         setClickedRow(true)
//         setChosenSearch(event.currentTarget.id)
//         console.log(event.currentTarget.id)
//     }

// function SearchResultsRow({foodItem}) {
//     return (
//       <>
//           <td>{foodItem.description}</td>
//           <td>{foodItem.dataType}</td>
//       </>
//     )
//   }

//   export default SearchResultsRow
