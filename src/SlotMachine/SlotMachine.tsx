import React, { useState, useRef } from "react";
import "./SlotMachine.css";
import slotBg from "../assets/slotImage.png";
import numberOne from "../assets/numbers/1.png";
import numberTwo from "../assets/numbers/2.png";
import numberThree from "../assets/numbers/3.png";
import numberFour from "../assets/numbers/4.png";
import numberFive from "../assets/numbers/5.png";
import numberSix from "../assets/numbers/6.png";

const SlotMachine = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const spinDuration = 5000; // Set the total duration for the entire spin
  const totalSpins = 3; // Set the total number of spins
  const spinSteps = 30; // Set the number of steps for each spin
  const doorsCount = 6;
  const doorsRef = useRef([]);

  const moveContainer = () => {
    if (!isSpinning) {
      setIsSpinning(true);

      const totalDuration = spinDuration * totalSpins;
      const stepDuration = totalDuration / spinSteps;

      const shuffledNumbers = [...Array(doorsCount)].map(() =>
        Math.floor(Math.random() * doorsCount)
      );

      for (let step = 0; step < spinSteps; step++) {
        setTimeout(() => {
          doorsRef.current.forEach((door, i) => {
            const translateY = -shuffledNumbers[i] * 100;

            door.style.transition = `transform ${
              stepDuration / 1000
            }s ease-out`;
            door.style.transform = `translateY(${translateY}%)`;
          });
        }, step * stepDuration);
      }

      // Reset doors after totalDuration
      setTimeout(() => {
        setIsSpinning(false);
        doorsRef.current.forEach((door) => {
          door.style.transition = "none";
          door.style.transform = "translateY(0)";
        });
      }, totalDuration);
    }
  };

  return (
    <>
      <div className="slot-doors">
        {[...Array(doorsCount)].map((_, doorNumber) => (
          <div key={doorNumber + 1} className={`door door-${doorNumber + 1}`}>
            <div
              className="slot"
              ref={(el) => (doorsRef.current[doorNumber] = el)}
            >
              {[
                numberOne,
                numberTwo,
                numberThree,
                numberFour,
                numberFive,
                numberSix,
              ].map((number, index) => (
                <img key={index} src={number} alt="" />
              ))}
            </div>
          </div>
        ))}
        <img className="slot-img" src={slotBg} alt="" />
      </div>
      <button onClick={moveContainer}>spin</button>
    </>
  );
};

export default SlotMachine;
