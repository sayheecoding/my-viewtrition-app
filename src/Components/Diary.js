import React from "react";
import { useState } from "react";
// import Calendar from "./Calendar";
import ControllerPanel from "./ControllerPanel";
import ConsumptionTable from "./ConsumptionTable";
// import EnergySummaryPanel from "./EnergySummaryPanel";
// import NutrientTargetsPanel from "./NutrientTargetsPanel";
// import EnergyHistory from "./EnergyHistory";
import AddFoodView from "./AddFoodView";
import AddActivityView from "./AddActivityView";
import AddBiometricView from "./AddBiometricView";
import AddNoteView from "./AddNoteView";

function Diary() {
  const [addingFood, setAddingFood] = useState(false);
  const [addingActivity, setAddingActivity] = useState(false);
  const [addingBiometric, setAddingBiometric] = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  const [consumptionsArray, setConsumptionsArray] = useState([]);

  let optionsArray;
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

  const handleClickedController = (event) => {
    switch (event.target.id) {
      case "add-food":
        setAddingFood(true);
        break;
      case "add-exercise":
        setAddingActivity(true);
        break;
      case "add-biometric":
        setAddingBiometric(true);
        break;
      case "add-note":
        setAddingNote(true);
        break;
      default:
        break;
    }
  };

  const generateServingOptions = (item) => {
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
        optionsArray = brandedOptions;
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
        optionsArray = surveyOptions;
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
        optionsArray = SRLegacyOptions;
        break;
      default:
        break;
    }
  };

  const handleAddConsumption = (
    newlyAddedItem,
    servingsConsumedInput,
    newlyAddedItemServingTypeIndex,
    description
  ) => {
    generateServingOptions(newlyAddedItem);
    const newConsumption = {
      item: newlyAddedItem,
      description: description,
      servingTypes: optionsArray,
      servingTypeIndex: newlyAddedItemServingTypeIndex,
      numberServingsConsumed: servingsConsumedInput,
    };
    setConsumptionsArray((prevState) => [...prevState, newConsumption]);
  };

  return (
    <div>
      <h1>Diary</h1>
      {/* <Calendar /> */}
      <ControllerPanel handleClickedController={handleClickedController} />
      <ConsumptionTable consumptionsArray={consumptionsArray} />
      {/* <EnergySummaryPanel />
      <NutrientTargetsPanel />
      <EnergyHistory /> */}
      {addingFood && (
        <AddFoodView handleAddConsumption={handleAddConsumption} />
      )}
      {addingActivity && <AddActivityView />}
      {addingBiometric && <AddBiometricView />}
      {addingNote && <AddNoteView />}
    </div>
  );
}

export default Diary;
