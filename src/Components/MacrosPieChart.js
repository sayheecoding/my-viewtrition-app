import React from "react";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
//api.highcharts.com/highcharts/series.pie.name

function MacrosPieChart({ item, ratio }) {
  const nutrientObjectsArray = item?.foodNutrients?.map((singleNutrient) => ({
    name: singleNutrient.nutrient.name ?? "", // if there is no name for a nutrient, return empty string
    unitName: singleNutrient.amount ?? "", // if there is no "amount" for a nutrient, return nothing
    nutrientId: singleNutrient.nutrient.id ?? "", // if there is no "id" for a nutrient, return nothing
    amount: singleNutrient.amount
      ? Math.round(singleNutrient.amount * ratio * 100) / 100 // only perform Math.round if there is an amount (to prevent getting NaN)
      : null, // null instead of 0 to differentiate against nutrient whose value fdc doesn't give us vs 0
  }));

  const proteinArray = nutrientObjectsArray.filter((nutrient) => {
    return nutrient.nutrientId === 1003 ?? {};
    // output is [ {name: "Protein", amount: 0.06, unitName: "g", nutrientId: 1003} ]
  });
  const totalLipidsArray = nutrientObjectsArray.filter((nutrient) => {
    return nutrient.nutrientId === 1004 ?? {};
  });
  const carbohydratesByDifferenceArray = nutrientObjectsArray.filter(
    (nutrient) => {
      return nutrient.nutrientId === 1005 ?? {};
    }
  );

  let proteinGramsConsumed;
  let totalLipidsGramsConsumed;
  let carbohydratesByDifferenceGramsConsumed;

  const generateMacros = () => {
    proteinGramsConsumed = proteinArray[0].amount ?? 0; //output: 0.06
    totalLipidsGramsConsumed = totalLipidsArray[0].amount ?? 0;
    carbohydratesByDifferenceGramsConsumed =
      carbohydratesByDifferenceArray[0].amount ?? 0;
  };

  generateMacros();

  let totalCalories;
  let percentCarbohydrate;
  let percentProtein;
  let percentFat;

  const calculateMacrosPercent = (c, p, f) => {
    totalCalories = c * 4 + p * 4 + f * 9;
    percentCarbohydrate =
      Math.round(((c * 4) / totalCalories) * 100 * 100) / 100;
    percentProtein = Math.round(((p * 4) / totalCalories) * 100 * 100) / 100;
    percentFat = Math.round(((f * 9) / totalCalories) * 100 * 100) / 100;
  };

  calculateMacrosPercent(
    carbohydratesByDifferenceGramsConsumed,
    proteinGramsConsumed,
    totalLipidsGramsConsumed
  );

  // console.log("c", percentCarbohydrate);
  // console.log("p", percentProtein);
  // console.log("f", percentFat);

  const chartOptions = {
    title: {
      text: "Macros",
    },
    chart: {
      type: "pie",
    },
    // colors: ["#2ec277", "#2db799", "#b7e886", "#6d5494", "#0077b4"],
    colors: ["#86E6AD", "#86BFE6", "#E6B786"],
    plotOptions: {
      series: {
        dataLabels: {
          enabled: false,
        },
        showInLegend: true, //shows legend if true
        size: 150, //size of pie
      },
    },
    legend: {
      align: "right", // refers to horizontal alignment are left/right/center
      layout: "vertical", // options are vertical/horizontal/proximate
      //   floating: true,
      //   x: -50,
      //   y: -100,
      verticalAlign: "middle", //top, middle or bottom
    },
    // https://api.highcharts.com/highcharts/legend.labelFormat

    tooltip: {
      pointFormatter: function () {
        return `${this.grams}g <br /> ${this.y}%`;
      },
    },

    series: [
      {
        innerSize: "60%", //size of inner circle
        name: "% of calories", //The name of the series as shown in the legend, tooltip etc.
        data: [
          {
            name: "<strong> Carbohydrates </strong>",
            y: percentCarbohydrate,
            grams: carbohydratesByDifferenceGramsConsumed,
          },
          {
            name: "<strong> Protein </strong>",
            y: percentProtein,
            grams: proteinGramsConsumed,
          },
          {
            name: "<strong> Fat </strong>",
            y: percentFat,
            grams: totalLipidsGramsConsumed,
          },
        ],
      },
    ],
  };
  return (
    <div>
      <PieChart highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}

export default MacrosPieChart;

// if (protein.length && protein[0].amount) {
//   proteinConsumed = protein[0].amount;
// } else {
//   proteinConsumed = 0;
// }
// if (totalLipids.length && totalLipids[0].amount) {
//   totalLipidsConsumed = totalLipids[0].amount;
// } else {
//   totalLipidsConsumed = 0;
// }
// if (
//   carbohydratesByDifference.length &&
//   carbohydratesByDifference[0].amount
// ) {
//   carbohydratesByDifferenceConsumed = carbohydratesByDifference[0].amount;
// } else {
//   carbohydratesByDifferenceConsumed = 0;
// }

// console.log("protein consumed", proteinConsumed);
// console.log("totalLipids consumed", totalLipidsConsumed);
// console.log(
//   "carbohydratesByDifference consumed",
//   carbohydratesByDifferenceConsumed
// );
// };

// import React from "react";
// import Highcharts from "highcharts/highstock";
// import PieChart from "highcharts-react-official";
// //api.highcharts.com/highcharts/series.pie.name

// function MacrosPieChart() {
//   const options = {
//     title: {
//       text: "Macros",
//     },

//     chart: {
//       type: "pie",
//     },

//     colors: ["#2ec277", "#2db799", "#b7e886", "#6d5494", "#0077b4"],

//     plotOptions: {
//       series: {
//         // stacking: "normal",
//         dataLabels: {
//           enabled: false,
//         },
//         showInLegend: true, //shows legend at bottom if true
//         size: 150, //size of pie
//       },
//     },

//     legend: {
//       align: "right", // refers to horizontal alignment are left/right/center
//       layout: "vertical", // options are vertical/horizontal/proximate
//       //   floating: true,
//       //   x: -50,
//       //   y: -100,
//       verticalAlign: "middle", //top, middle or bottom
//     },

//     //https://api.highcharts.com/highcharts/legend.labelFormat

//     series: [
//       {
//         innerSize: "60%", //size of inner circle
//         name: "% of calories", //The name of the series as shown in the legend, tooltip etc.
//         data: [
//           {
//             name: "Carbohydrates",
//             y: 50,
//           },
//           {
//             name: "Protein",
//             y: 30,
//           },
//           {
//             name: "Fats",
//             y: 20,
//           },
//         ],
//       },
//     ],
//   };

//   return (
//     <div>
//       <PieChart highcharts={Highcharts} options={options} />
//     </div>
//   );
// }

// export default MacrosPieChart;

// import React from "react";
// import Highcharts from "highcharts/highstock";
// import PieChart from "highcharts-react-official";
// //api.highcharts.com/highcharts/series.pie.name

// function MacrosPieChart({ item, ratio }) {
//   // console.log(item);
//   const nutrientObjectsArray = item.foodNutrients.map((singleNutrient) => ({
//     name: singleNutrient.nutrient.name,
//     amount: singleNutrient.amount
//       ? Math.round(singleNutrient.amount * ratio * 100) / 100
//       : null, // putting null vs. 0 in order to differentiate against nutrient whose value is actually 0 rather than unknown
//     unitName: singleNutrient.amount ? singleNutrient.nutrient.unitName : null, // if there is no "amount" data, ex. Proximates often has no amount property but still come with a unitName
//     nutrientId: singleNutrient.nutrient.id,
//   }));
//   // console.log(nutrientObjectsArray);

//   // const energy = nutrientObjectsArray.filter(nutrient => {return nutrient.nutrientId === 1008})
//   //output: [{name: "Energy", amount: 58.58, unitName: "kcal", nutrientId: 1008}]
//   const protein = nutrientObjectsArray.filter((nutrient) => {
//     return nutrient.nutrientId === 1003;
//   });
//   const totalLipids = nutrientObjectsArray.filter((nutrient) => {
//     return nutrient.nutrientId === 1004;
//   });
//   const carbohydratesByDifference = nutrientObjectsArray.filter((nutrient) => {
//     return nutrient.nutrientId === 1005;
//   });

//   let proteinConsumed;
//   let totalLipidsConsumed;
//   let carbohydratesByDifferenceConsumed;

//   const generateMacros = () => {
//     if (protein.length && protein[0].amount) {
//       proteinConsumed = protein[0].amount;
//     } else {
//       proteinConsumed = 0;
//     }
//     if (totalLipids.length && totalLipids[0].amount) {
//       totalLipidsConsumed = totalLipids[0].amount;
//     } else {
//       totalLipidsConsumed = 0;
//     }
//     if (
//       carbohydratesByDifference.length &&
//       carbohydratesByDifference[0].amount
//     ) {
//       carbohydratesByDifferenceConsumed = carbohydratesByDifference[0].amount;
//     } else {
//       carbohydratesByDifferenceConsumed = 0;
//     }

//     // console.log("energy consumed", energyConsumed);
//     console.log("protein consumed", proteinConsumed);
//     console.log("totalLipids consumed", totalLipidsConsumed);
//     console.log(
//       "carbohydratesByDifference consumed",
//       carbohydratesByDifferenceConsumed
//     );
//   };

//   generateMacros();

//   let total;
//   let percentCarbohydrate;
//   let percentProtein;
//   let percentFat;

//   function calculateMacrosPercent(c, p, f) {
//     total = c * 4 + p * 4 + f * 9;
//     percentCarbohydrate = Math.round(((c * 4) / total) * 100 * 100) / 100;
//     percentProtein = Math.round(((p * 4) / total) * 100 * 100) / 100;
//     percentFat = Math.round(((f * 9) / total) * 100 * 100) / 100;
//   }

//   //Math.round(singleNutrient.amount * ratio * 100) / 100
//   calculateMacrosPercent(
//     carbohydratesByDifferenceConsumed,
//     proteinConsumed,
//     totalLipidsConsumed
//   );

//   console.log("c", percentCarbohydrate);
//   console.log("p", percentProtein);
//   console.log("f", percentFat);

//   const options = {
//     title: {
//       text: "Macros",
//     },

//     chart: {
//       type: "pie",
//     },

//     colors: ["#2ec277", "#2db799", "#b7e886", "#6d5494", "#0077b4"],

//     plotOptions: {
//       series: {
//         // stacking: "normal",
//         dataLabels: {
//           enabled: false,
//         },
//         showInLegend: true, //shows legend at bottom if true
//         size: 150, //size of pie
//       },
//     },

//     legend: {
//       align: "right", // refers to horizontal alignment are left/right/center
//       layout: "vertical", // options are vertical/horizontal/proximate
//       //   floating: true,
//       //   x: -50,
//       //   y: -100,
//       verticalAlign: "middle", //top, middle or bottom
//     },

//     //https://api.highcharts.com/highcharts/legend.labelFormat

//     series: [
//       {
//         innerSize: "60%", //size of inner circle
//         name: "% of calories", //The name of the series as shown in the legend, tooltip etc.
//         data: [
//           {
//             name: "Carbohydrates",
//             y: 50,
//           },
//           {
//             name: "Protein",
//             y: 30,
//           },
//           {
//             name: "Fats",
//             y: 20,
//           },
//         ],
//       },
//     ],
//   };

//   return (
//     <div>
//       <PieChart highcharts={Highcharts} options={options} />
//     </div>
//   );
// }

// export default MacrosPieChart;

// import React from "react";
// import Highcharts from "highcharts/highstock";
// import PieChart from "highcharts-react-official";
// //api.highcharts.com/highcharts/series.pie.name

// function MacrosPieChart() {
//   const options = {
//     title: {
//       text: "Macros",
//     },

//     chart: {
//       type: "pie",
//     },

//     colors: ["#2ec277", "#2db799", "#b7e886", "#6d5494", "#0077b4"],

//     plotOptions: {
//       series: {
//         // stacking: "normal",
//         dataLabels: {
//           enabled: false,
//         },
//         showInLegend: true, //shows legend at bottom if true
//         size: 150, //size of pie
//       },
//     },

//     legend: {
//       align: "right", // refers to horizontal alignment are left/right/center
//       layout: "vertical", // options are vertical/horizontal/proximate
//       //   floating: true,
//       //   x: -50,
//       //   y: -100,
//       verticalAlign: "middle", //top, middle or bottom
//     },

//     //https://api.highcharts.com/highcharts/legend.labelFormat

//     series: [
//       {
//         innerSize: "60%", //size of inner circle
//         name: "% of calories", //The name of the series as shown in the legend, tooltip etc.
//         data: [
//           {
//             name: "Carbohydrates",
//             y: 50,
//           },
//           {
//             name: "Protein",
//             y: 30,
//           },
//           {
//             name: "Fats",
//             y: 20,
//           },
//         ],
//       },
//     ],
//   };

//   return (
//     <div>
//       <PieChart highcharts={Highcharts} options={options} />
//     </div>
//   );
// }

// export default MacrosPieChart;
