import React, { useState, useRef } from "react";
import SlotMachine from "../SlotMachine/SlotMachine";
import backgroundImage from "../assets/backdrop.png";
import baseImage from "../assets/base.png";
import button from "../assets/btn.png";
import buttonPressed from "../assets/btn-pressed.png";
import "./SlotMachineWrapper.css";

const SlotMachineWrapper = () => {
  const [buttonImage, setButtonImage] = useState(button);
  const slotMachineRef = useRef();

  const wrapperStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  };

  const handleMouseDown = () => {
    setButtonImage(buttonPressed);
  };

  const handleMouseUp = () => {
    setButtonImage(button);
  };

  const handleMoveContainer = () => {
    if (slotMachineRef.current) {
      slotMachineRef.current.moveContainer();
    }
  };

  return (
    <div className="main-wrapper" style={wrapperStyle}>
      <div className="base">
        <img
          className="spin-btn"
          src={buttonImage}
          alt=""
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleMoveContainer}
          style={{ cursor: "pointer" }}
        />
        <img className="base-image" src={baseImage} alt="" />
      </div>
      <SlotMachine ref={slotMachineRef} />
    </div>
  );
};

export default SlotMachineWrapper;
