import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import "./SlotMachine.css";
import slotBg from "../assets/slotImage.png";
import numberOne from "../assets/numbers/1.png";
import numberTwo from "../assets/numbers/2.png";
import numberThree from "../assets/numbers/3.png";
import numberFour from "../assets/numbers/4.png";
import numberFive from "../assets/numbers/5.png";
import numberSix from "../assets/numbers/6.png";
import prizeWon from "../assets/prize.png";
import prizeWonGlow from "../assets/prizeGlow.png";

const SlotMachine = forwardRef((props, ref) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPrizeWon, setIsPrizeWon] = useState(false);
  const [prizeImage, setPrizeImage] = useState(prizeWon);
  const spinDuration = 5000;
  const totalSpins = 15;
  const spinSteps = 30;
  const doorsCount = 6;
  const doorsRef = useRef([]);
  const togglePrizeImage = () => {
    setPrizeImage((prevImage) =>
      prevImage === prizeWon ? prizeWonGlow : prizeWon
    );
  };
  useEffect(() => {
    const intervalId = setInterval(togglePrizeImage, 500);

    return () => clearInterval(intervalId);
  }, [togglePrizeImage]);

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
      setTimeout(() => {
        setIsPrizeWon(true);
      }, 2500);
    }
  };

  useImperativeHandle(ref, () => ({
    moveContainer,
  }));

  return (
    <>
      <div className="slot-doors">
        {isPrizeWon && <img src={prizeImage} alt="" className="prize-won" />}
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
    </>
  );
});

export default SlotMachine;
