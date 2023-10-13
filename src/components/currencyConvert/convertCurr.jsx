import React, { useContext, useEffect, useState } from "react";
import "./convertCur.css";
import { CurrencyContext } from "../../utils/context";
import GiSparrow from "react-icons/gi";

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

    console.clear();
    console.log("currency from: ", currencyFrom);
  };

  const selectCurrencyTO = (e) => {
    let value = currencies?.find((curr) => curr.code === e.target.value);
    setCurrencyTo(value);
    console.log("currency to: ", currencyTo);
  };

  // get amout from the input
  const handleInputChange = (e) => {
    setAmount(+e.target.value);
    console.log("Amount: ", amount, e.target.value);
  };

  const currencyConvert = () => {
    let result = (amount / currencyFrom?.value) * currencyTo?.value;
    setConvertedAmount(result.toFixed(3));
  };

  // const setIntail = () => {
  //   let fistVal = currencies?.find((curr) => curr.code === "USD");
  //   let secondVal = currencies?.find((curr) => curr === "XAF");
  //   selectCurrencyFrom(fistVal);
  //   setCurrencyTo(secondVal);
  // };

  useEffect(() => {
    // setIntail();
    if (amount >= 0 && currencyTo && currencyFrom) currencyConvert();
  }, [amount, currencyTo, currencyFrom]);

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

        <h2>
          <i class="fa-solid fa-arrow-right-arrow-left"></i>
        </h2>

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
            defaultValue={0}
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
