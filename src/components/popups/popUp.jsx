import React, { useState } from "react";
import "./popUp.css";
import { AiOutlineClose } from "react-icons/ai";

export const PopUp = (props) => {
  return (
    props.trigger && (
      <div className="popup">
        <div className="popopContainer">
          <button className="closeBtn" onClick={() => props.setTrigger(false)}>
            <AiOutlineClose />
          </button>
          {props.children}
        </div>
      </div>
    )
  );
};
