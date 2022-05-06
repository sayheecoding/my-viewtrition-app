import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import NutrientsTable from "./NutrientsTable";
import MacrosPieChart from "./MacrosPieChart";
// import ConsumptionRow from "./ConsumptionRow";

function ServingSelect({ handleAddConsumption, item, description }) {
  // console.log("second search result, received inside ServingSelect", item);
  const [servingsConsumedInput, setServingsConsumed] = useState(1);
  const [gramsInSelectedOption, setGramsInSelectedOption] = useState(1);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  function handleServingInput(event) {
    // console.log("serving input", event.target.value)
    setServingsConsumed(event.target.value);
  }

  function handleOptionSelect(event) {
    // console.log("grams in selected option", event.target.value)
    setGramsInSelectedOption(event.target.value);
    // console.log(event.target.selectedIndex);
    setSelectedOptionIndex(event.target.selectedIndex);
  }

  function updateRatio(serv, gramsPerServ) {
    const total = serv * gramsPerServ;
    const newRatio = total / 100;
    // console.log("new ratio", newRatio);
    setRatio(newRatio);
  }

  let optionsArray = [];
  let genericOptions = [
    {
      gramWeight: 1,
      label: "g",
    },
    {
      gramWeight: 28,
      label: "1 oz - 28g",
    },
    {
      gramWeight: 100,
      label: "100g",
    },
  ];

  let defaultRatio;
  const generateServingOptions = () => {
    //function that generates serving options depending on the data source, and finds default ratio of consumption
    switch (item.dataType) {
      case "Branded":
        let brandedOptions;
        if (item.foodPortions) {
          brandedOptions = [
            {
              gramWeight: item.servingSize,
              label: item.householdServingFullText
                ? `${item.householdServingFullText} - ${item.servingSize}${item.servingSizeUnit}`
                : `Serving size according to label - ${item.servingSize}${item.servingSizeUnit}`,
            }, //generate serving option according to the brand's serving Size Unit
          ];
          brandedOptions = brandedOptions.concat(genericOptions);
        } else {
          brandedOptions = genericOptions;
        }
        // console.log(brandedOptions);
        //BRANDED foods always have a servingSize abd servingSizeUnit property.  They DON'T have a foodPortions array.
        //is servingSizeUnit always g? -- seems like it. even for drinks!!!
        //AND NUTRIENTS ARRAY IS ALWAYS REFERRING TO AMOUNT PER 100G!!!!!!!!!!!!*** CONFIRMED BY CHECKING AGAINST CRONOMETER DATA
        //NOTE: CRONOMETER PULLS DATA FROM MULTIPLE DATABASES, NOT JUST FDC (FDC=USDA) -- CRONOMETER's "USDA" SOURCE === MY SR LEGACY/SURVEY.  CRONOMETER's "FDCUPC" === MY Branded
        optionsArray = brandedOptions.map((brandedOption, i) => (
          <option key={i} value={brandedOption.gramWeight}>
            {brandedOption.label}
          </option>
        ));
        defaultRatio = brandedOptions[0].gramWeight / 100;
        break;
      case "Survey (FNDDS)":
        let surveyOptions;
        if (item.foodPortions) {
          surveyOptions = item.foodPortions.map((portionType) => ({
            gramWeight: portionType.gramWeight,
            label:
              portionType.portionDescription === "Quantity not specified" //example: abalone, cooked
                ? `${portionType.gramWeight}g`
                : `${portionType.portionDescription} - ${portionType.gramWeight}g`,
          }));
          surveyOptions = surveyOptions.concat(genericOptions);
        } else {
          surveyOptions = genericOptions; //ex. acorn stew
        }
        // console.log(surveyOptions);
        defaultRatio = surveyOptions[0].gramWeight / 100;
        optionsArray = surveyOptions.map((surveyOption, i) => (
          <option key={i} value={surveyOption.gramWeight}>
            {surveyOption.label}
          </option>
        ));
        break;
      case "SR Legacy":
        let SRLegacyOptions;
        if (item.foodPortions) {
          //example: acerola Juice, raw
          SRLegacyOptions = item.foodPortions.map((portionType) => ({
            gramWeight: portionType.gramWeight,
            label: `${portionType.modifier} - ${portionType.gramWeight}g`,
          }));
          SRLegacyOptions = SRLegacyOptions.concat(genericOptions); // this order shows original SRLegacy options then standardOptions last
        } else {
          SRLegacyOptions = genericOptions; //example: Agave -- fucking WHACK - does not have a foodPortions array.
        }
        // console.log(SRLegacyOptions);
        defaultRatio = SRLegacyOptions[0].gramWeight / 100;
        optionsArray = SRLegacyOptions.map((SRLegacyOption, i) => (
          <option key={i} value={SRLegacyOption.gramWeight}>
            {SRLegacyOption.label}
          </option>
        ));
        break;
      default:
        break;
    }
  };

  generateServingOptions();
  const [ratio, setRatio] = useState(defaultRatio);
  // console.log("default ratio", defaultRatio);

  // useEffect(() => {
  //   setServingOptionsArray(optionsArray);
  // }, [optionsArray]); //creates infinite loop

  useEffect(() => {
    if (servingsConsumedInput) {
      updateRatio(servingsConsumedInput, gramsInSelectedOption);
    }
    // console.log("updated ratio", ratio)
  }, [servingsConsumedInput, gramsInSelectedOption]);

  // const handleAddToDiary = (ratio) => {
  //   // setFoodToLog(item);
  //   // setServingToLog();
  //   // setServingOptionsArrayToLog();
  //   // setSelectedServingOptionToLog();
  //   // needs to pass info about:
  //   //current servings consumed state --> servingsConsumed YES
  //   //current food we ware dealing with --> item
  //   //and what serving option was selected --> options array + key
  // };

  const handleAddClick = () => {
    handleAddConsumption(
      item,
      servingsConsumedInput,
      selectedOptionIndex,
      description
    );
  };

  return (
    <div>
      <br />
      <span>
        Time of day:
        <input type="time" />
      </span>
      <br />
      Servings consumed:
      <br />
      <span>
        <input
          defaultValue="1"
          type="text"
          placeholder="1"
          onChange={handleServingInput}
        />
        <select onChange={handleOptionSelect}>{optionsArray}</select>
        <button type="text" onClick={handleAddClick}>
          ADD TO DIARY
        </button>
      </span>
      <MacrosPieChart ratio={ratio} item={item} />
      <NutrientsTable ratio={ratio} item={item} />
    </div>
  );
}

export default ServingSelect;
