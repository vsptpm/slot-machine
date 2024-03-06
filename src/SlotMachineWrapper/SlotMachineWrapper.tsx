// import React from "react";
import SlotMachine from "../SlotMachine/SlotMachine"; // Adjust the path based on your project structure
import backgroundImage from "../assets/backdrop.png";
import baseImage from "../assets/base.png";
import button from "../assets/btn.png";
import buttonPressed from "../assets/btn-pressed.png";
import "./SlotMachineWrapper.css";
import { useRef, useState } from "react";

const SlotMachineWrapper = () => {
  const [buttonImage, setButtonImage] = useState(button);
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
    // Add any other logic you want to perform on mouse down
  };

  const handleMouseUp = () => {
    setButtonImage(button);
    // Add any other logic you want to perform on mouse up
  };
  const slotMachineRef = useRef();

  return (
    <div className="main-wrapper" style={wrapperStyle}>
      <div className="base">
        <img
          className="spin-btn"
          src={buttonImage}
          alt=""
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{ cursor: "pointer" }}
        />
        <img className="base-image" src={baseImage} alt="" />
      </div>
      <SlotMachine />
    </div>
  );
};

export default SlotMachineWrapper;
