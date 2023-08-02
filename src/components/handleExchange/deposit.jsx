import React, { useContext, useState } from "react";
import { CurrencyContext } from "../../utils/context";
import { getLocalStorage, updateLocalStorage } from "../../service/tools";
import { useNavigate } from "react-router-dom";

export const DepositForm = (props) => {
  const { baseCurrency } = useContext(CurrencyContext);
  // const [showPopUp, setShowPopUp] = useState(false);

  const [deposit, setDeposit] = useState({
    amount: 0,
    currencyType: "USD",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.value < 0) {
      alert("Bad transaction! you can't deposit a nagetive amount to wallet");
      return;
    }
    const { name, value } = e.target;
    setDeposit((prevDeposit) => ({
      ...prevDeposit,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.value < 0) {
      alert("Bad transaction! you can't deposit a nagetive amount to wallet");
      return;
    }
    const prev = getLocalStorage("amountDeposit") || [
      {
        amount: 0,
        currencyType: "USD",
      },

      {
        amount: 0,
        currencyType: "EUR",
      },

      {
        amount: 0,
        currencyType: "XAF",
      },
    ];

    prev.forEach((currency) => {
      if (currency.currencyType === deposit.currencyType) {
        currency.amount = +currency.amount + +deposit.amount;
      }
    });

    updateLocalStorage("amountDeposit", prev);
    props.setShowPopUp((prev) => !prev);
    console.log("this is Props", props);
    navigate("/wallet");
  };

  return (
    <div>
      <div className="login">
        <form action="submit" onSubmit={handleSubmit}>
          <label>
            Deposit
            <input
              type="number"
              name="amount"
              id="amount"
              required={true}
              defaultValue={deposit.amount}
              placeholder="Amount"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            into
            <select
              className="exchangeSelection"
              name="currencyType"
              defaultValue={deposit.currencyType}
              onChange={handleChange}
            >
              {baseCurrency.map((currency) => (
                <option className="optionIterms" value={baseCurrency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </label>

          {/* props.trigger={!trigger} */}
          <button>Done</button>
        </form>
      </div>
    </div>
  );
};
