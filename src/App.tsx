import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import SlotMachine from "./SlotMachine";
import SlotMachineWrapper from "./SlotMachineWrapper/SlotMachineWrapper";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SlotMachineWrapper />
    </>
  );
}

export default App;
