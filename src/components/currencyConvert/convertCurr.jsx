import React, { useContext, useState } from "react";
import "./convertCur.css";
import { CurrencyContext } from "../../utils/context";

const ConvertCurr = () => {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState();
  const [currencyTo, setCurrencyTo] = useState();

  let { currencies } = useContext(CurrencyContext);

  const selectCurrencyFrom = (e) => {
    let selected = e.target.value;
    let value = currencies?.find((curr) => curr.code === selected);
    setCurrencyFrom(value);
    currencyConvert();

    console.clear();
    console.log("currency from: ", currencyFrom);
  };

  const selectCurrencyTO = (e) => {
    let value = currencies?.find((curr) => curr.code === e.target.value);
    setCurrencyTo(value);
    currencyConvert();
    console.log("currency to: ", currencyTo);
  };

  // get amout from the input
  const handleInputChange = (e) => {
    if (amount < 0) {
      alert("input a valid figue");
    }
    setAmount(e.target.value);
    console.log("Amount: ", amount);
    currencyConvert();
  };

  const currencyConvert = () => {
    let result = (amount / currencyFrom?.value) * currencyTo?.value;
    setConvertedAmount(result.toFixed(3));
  };

  return (
    <div className="mainSection">
      <h1>currency exchange</h1>
      <div className="selectSection">
        <select onChange={selectCurrencyFrom}>
          {currencies?.map((currency, key) => (
            <option value={currency?.code} key={key}>
              {currency?.code}
            </option>
          ))}
        </select>
        <h2>TO</h2>
        <select name="" id="" onChange={selectCurrencyTO}>
          {currencies?.map((currency, key) => (
            <option value={currency?.code} key={key}>
              {currency?.code}
            </option>
          ))}
        </select>
      </div>
      <div className="convertSection">
        <div>
          <h2>Amount</h2>
          <input
            type="number"
            placeholder="Enter Amount"
            onChange={handleInputChange}
          />
        </div>

        <div className="converted">
          <h2>
            {amount} {currencyFrom?.code}
          </h2>
          <h3>
            {convertedAmount} {currencyTo?.code}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ConvertCurr;
