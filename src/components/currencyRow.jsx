import React from "react";

const CurrencyRow = (props) => {
  const {
    currencyOptions,
    selectedCurency,
    onChangeCurrency,
    amount,
    onchangeAmount,
  } = props;
  return (
    <div className="currencyRow">
      <input
        type="number"
        className=""
        value={amount}
        onChange={onchangeAmount}
      />
      <select name="" id="" value={selectedCurency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
