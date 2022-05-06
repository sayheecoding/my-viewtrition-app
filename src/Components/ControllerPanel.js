import React from "react";
// import { useState } from 'react'

function ControllerPanel(props) {
  return (
    <div>
      ControllerPanel
      <span id="controller-panel">
        <button id="add-food" onClick={props.handleClickedController}>
          ADD FOOD
        </button>
        <button id="add-exercise" onClick={props.handleClickedController}>
          ADD EXERCISE
        </button>
        <button id="add-biometric" onClick={props.handleClickedController}>
          ADDBIOMETRIC
        </button>
        <button id="add-note" onClick={props.handleClickedController}>
          ADD NOTE
        </button>
      </span>
    </div>
  );
}

export default ControllerPanel;
