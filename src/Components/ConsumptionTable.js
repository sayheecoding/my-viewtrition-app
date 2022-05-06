import React from "react";
import { useEffect } from "react";
// consumptions state that contains:
// import { useRef } from "react";
import { useState } from "react";

function ConsumptionTable({ consumptionsArray }) {
  const [consumptions, setConsumptions] = useState(consumptionsArray);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowkey: null,
  });
  const [amount, setAmount] = useState(null);
  useEffect(() => {
    let indexedConsumptions = [...consumptionsArray].map((consumption, i) => {
      let idObj = { id: String(i) }; //OMFG
      console.log(idObj);
      return { ...consumption, ...idObj };
    });
    console.log("indexed consumptions", indexedConsumptions);
    setConsumptions(indexedConsumptions);
  }, [consumptionsArray]); //anytime consumptionsArray changes, make a copy.  For each object, add an extra property to identify its index. Then change the consumptions state with the newly created array.
  // console.log("indexed consumption", consumptions);

  // const [inEditMode, setInEditMode] = useState({
  //   status: false,
  //   rowKey: null,
  // });

  // const onEdit = ({ id, currentUnitPrice }) => {
  //   setInEditMode({
  //     status: true,
  //     rowKey: id,
  //   });
  //   setAmount(1); ////////
  // };

  const handleServingInputChange = (event) => {
    console.log(typeof event.target.value); // ---------------->STRING!!!!!!!!!!!!!!
    console.log(consumptions);
    let copy = consumptions.map((element) => {
      //if the index of the element in array is equal to
      if (element.id === event.target.id) {
        element.numberServingsConsumed = event.target.value;
      }
      return element;
    });
    setConsumptions(copy);
    console.log("serving updated consumption", consumptions);
  };

  let consumptionRows;
  consumptionRows = consumptions.map((food, index) => {
    // const servingOptions = food.servingTypes.map((servingType, i) => {
    //   return (
    //     <option key={i} id={i} value={servingType.gramWeight}>
    //       {servingType.label}
    //     </option>
    //   );
    // });
    return (
      <tr key={index} id={index}>
        <td> {food.description}</td>
        <td>
          <input
            type="text"
            id={index}
            onChange={handleServingInputChange}
            // defaultValue={food.numberServingsConsumed}
          />
        </td>
        <td>
          {/* <select ref={optionRef} id="consumptions-table select">
            {servingOptions}
          </select> */}

          {Object.values(food.servingTypes[food.servingTypeIndex])[1]}
          {/* /* getting label */}
        </td>
        <td>(Energy) </td>
        <td></td>
      </tr>
    );
  });

  // var selected = document.getElementById("serving-option-2");
  // console.log(selected);

  // i wanna do something like:
  // if option element's id === selectedOption --> setAttribute(selected, true)

  return (
    <div>
      <br />
      <table id="consumptions-table" className="center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Unit</th>
            <th>Energy (kcal)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{consumptionRows}</tbody>
      </table>
    </div>
  );
}

export default ConsumptionTable;

/* example
  consumptionsArray = [
      {
        description: "GODIVA, ASSORTED DESSERT TRUFFLES (Brand: GODIVA)",
        item: {discontinuedDate: "", foodComponents: Array(0), foodAttributes: Array(1), foodPortions: Array(0), fdcId: 2087875, …},
        numberServingsConsumed: 1,
        servingTypeIndex: 0,
        servingTypes: [
          {
            gramWeight: 41,
            label: "Serving size according to label - 41g"
          },
          {
            gramWeight: 1,
            label: "g"
          },
          {
            gramWeight: 28,
            label: "1 oz - 28g"
          },
      },
      {
        description: "Crab legs",
        item: {discontinuedDate: "", foodComponents: Array(0), foodAttributes: Array(1), foodPortions: Array(0), fdcId: 2087875, …},
        numberServingsConsumed: 5,
        servingTypeIndex: 0,
        servingTypes: [
          {
            gramWeight: 41,
            label: "Serving size according to label - 41g"
          },
          {
            gramWeight: 1,
            label: "g"
          }
      }
  ]
*/
