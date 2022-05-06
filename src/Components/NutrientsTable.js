import React from "react";

function NutrientsTable({ item, ratio }) {
  const nutrientObjectsArray = item?.foodNutrients?.map((singleNutrient) => ({
    name: singleNutrient.nutrient.name ?? "", // if there is no name for a nutrient, return empty string
    unitName: singleNutrient.amount ?? "", // if there is no "amount" for a nutrient, return nothing
    nutrientId: singleNutrient.nutrient.id ?? "", // if there is no "id" for a nutrient, return nothing
    amount: singleNutrient.amount
      ? Math.round(singleNutrient.amount * ratio * 100) / 100 // only perform Math.round if there is an amount (to prevent getting NaN)
      : null, // null instead of 0 to differentiate against nutrient whose value fdc doesn't give us vs 0
  }));

  //output is [
  // {
  //    name: "Proximates",
  //    unitName: ''
  //    nutrientId: 2045,
  //    amount: null,
  // },
  // {
  //   name: "Water",
  //   unitName: 17.67
  //   nutrientId: 1051,
  //   amount: 0.18,
  // }, ... ]

  // console.log(nutrientObjectsArray);

  let rows = [];
  const generateRows = () => {
    rows = nutrientObjectsArray.map((nutrient) => {
      return (
        <tr key={nutrient.nutrientId} id={`N${nutrient.nutrientId}`}>
          <td>{nutrient.name}</td>
          <td>{nutrient.amount}</td>
          <td>{nutrient.unitName}</td>
        </tr>
      );
    });
  };

  generateRows();

  return (
    <div>
      Nutrients Table
      <table id="nutrients-table" className="center">
        <thead>
          <tr>
            <th>Nutrient name</th>
            <th>Amount</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default NutrientsTable;

// // const energy = nutrientObjectsArray.filter(nutrient => {return nutrient.nutrientId === 1008})
// //output: [{name: "Energy", amount: 58.58, unitName: "kcal", nutrientId: 1008}]
// const protein = nutrientObjectsArray.filter((nutrient) => {
//   return nutrient.nutrientId === 1003;
// });
// const totalLipids = nutrientObjectsArray.filter((nutrient) => {
//   return nutrient.nutrientId === 1004;
// });
// const carbohydratesByDifference = nutrientObjectsArray.filter((nutrient) => {
//   return nutrient.nutrientId === 1005;
// });
// // console.log(energy)

// let energyConsumed;
// let proteinConsumed;
// let totalLipidsConsumed;
// let carbohydratesByDifferenceConsumed;

// const generateMacros = () => {
//   // if (energy.length && energy[0].amount) {
//   //     energyConsumed = energy[0].amount
//   // } else {energyConsumed = 0}
//   if (protein.length && protein[0].amount) {
//     proteinConsumed = protein[0].amount;
//   } else {
//     proteinConsumed = 0;
//   }
//   if (totalLipids.length && totalLipids[0].amount) {
//     totalLipidsConsumed = totalLipids[0].amount;
//   } else {
//     totalLipidsConsumed = 0;
//   }
//   if (
//     carbohydratesByDifference.length &&
//     carbohydratesByDifference[0].amount
//   ) {
//     carbohydratesByDifferenceConsumed = carbohydratesByDifference[0].amount;
//   } else {
//     carbohydratesByDifferenceConsumed = 0;
//   }

// console.log("energy consumed", energyConsumed);
// console.log("protein consumed", proteinConsumed);
// console.log("totalLipids consumed", totalLipidsConsumed);
// console.log(
//   "carbohydratesByDifference consumed",
//   carbohydratesByDifferenceConsumed
// );
// };

// generateMacros();
