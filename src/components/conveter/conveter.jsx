import { React, useContext } from "react";
import "./conveter.css";
import CurrencyRow from "../currencyRow";
import { CurrencyContext } from "../../utils/context";

const CurrencyConverter = () => {
  const { currencies } = useContext(CurrencyContext);

  console.log("this is our currencies", currencies);
  return (
    <div className="currencyConverter">
      <h1>Currency Exchange</h1>
      <div>
        <CurrencyRow />
        <div className="equal">=</div>
        <CurrencyRow />
      </div>
    </div>
  );
};

export default CurrencyConverter;
