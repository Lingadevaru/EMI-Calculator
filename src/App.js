import { useEffect, useState } from "react";
import "./App.css";
import { tenureData } from "./utils/constants";
import TextInput from "./components/text-input";
import SliderInput from "./components/slider-input";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  //const [fee, setFee] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEmi = (downPayment) => {
    if (!cost) return;

    const loanAmount = cost - downPayment;
    const roi = interest / 1200;

    const EMI =
      (loanAmount * roi * (1 + roi) ** tenure) / ((1 + roi) ** tenure - 1);

    return Number(EMI).toFixed(0);
  };

  const calculateDP = (emi) => {
    if (!cost) return;

    const dpPercentage = 100 - (emi / calculateEmi(0)) * 100;
    return Number((dpPercentage / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = Number(calculateEmi(downPayment));
    setEmi(emi.toFixed(0));
  }, [tenure, cost, interest]);

  const updateEMI = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    //Calculate EMI and Update it
    const calc_emi = calculateEmi(dp);
    setEmi(calc_emi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    //Calculate DP and Update it
    const calc_dp = calculateDP(emi);
    setDownPayment(calc_dp);
  };

  return (
    <div className="App">
      <span className="title emi">EMI Calculator</span>

      <TextInput
        title={"Total Cost of Asset"}
        state={cost}
        setState={setCost}
      />

      <TextInput
        title={"Interest Rate (in %)"}
        state={interest}
        setState={setInterest}
      />

      <SliderInput
        title={"Down Payment"}
        state={downPayment}
        min={0}
        max={cost}
        onChange={updateEMI}
        labelMin={"0%"}
        labelMax={"100%"}
      />

      <SliderInput
        title={"Loan Per Month"}
        state={emi}
        min={calculateEmi(cost)}
        max={calculateEmi(0)}
        onChange={updateDownPayment}
      />

      <span className="title value-label">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t) => {
          return (
            <button
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
