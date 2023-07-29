import React, { useContext, useState } from "react";
import "./wallet.css";
import { CurrencyContext } from "../../utils/context";
import { DepositForm } from "../../components/handleExchange/deposit";
import { PopUp } from "../../components/popups/popUp";
import { FundsDeposit } from "../../components/cards";
import { getLocalStorage } from "../../service/tools";
import CurrencyConverter from "../../components/conveter/conveter";
import ConvertCurr from "../../components/currencyConvert/convertCurr";

export const Wallet = (props) => {
  const { baseCurrency } = useContext(CurrencyContext);
  const [selected, setSelected] = useState("USD");
  const [showPopUp, setShowPopUp] = useState(false);
  const walletName = localStorage.getItem("user");
  const walletFunds = getLocalStorage("amountDeposit");
  const [totalFunds, setTotalFunds] = useState(0);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  // handle wallet's total balance
  const balance = () => {
    // let amountTo = walletFunds.find((cur) => cur.currencyType === selected);
    // amountTo = amountTo.amount;
    // console.log("this is amount to: ", amountTo);

    // let amountFrom = walletFunds.filter(
    //   (curr) => curr.currencyType !== selected
    // );

    // let valuesFrom = baseCurrency.filter(
    //   (cur) => cur.code === amountFrom.currencyType
    // );

    // console.log("this is amounts form value: ", valuesFrom);

    if (walletFunds === undefined || baseCurrency === undefined) {
      setTotalFunds(0);
      return;
    }

    /* AMount and valuue in EUR */
    let amountInERu = walletFunds.find(
      (cur) => cur.currencyType === "EUR"
    ).amount;
    let valueInERU = baseCurrency.find((cur) => cur.code === "EUR").value;
    let equvelentAMTinEUR = amountInERu / valueInERU;

    /* Amount and value in AXF */
    let amountInXAF = walletFunds.find((cur) => cur.currencyType === "XAF");
    let valueInXAF = baseCurrency.find((cur) => cur.code === "XAF");
    let equvelentAMTinXAF = amountInXAF.amount / valueInXAF.value;

    /* Amount in USD */
    let amountInUSD = walletFunds.find(
      (curr) => curr.currencyType === "USD"
    ).amount;
    let valueInUSD = baseCurrency.find((curr) => curr.code === "USD").value;
    let equvelentAMTinUSD = amountInUSD / valueInUSD;

    if (selected === "USD") {
      let walletTotal =
        equvelentAMTinXAF + equvelentAMTinEUR * valueInUSD + amountInUSD;

      setTotalFunds(walletTotal);

      console.log("this talal in USD: ", walletTotal);
    }

    if (selected === "EUR") {
      let walletTotal =
        amountInXAF.amount + amountInUSD * valueInERU + amountInERu;
      setTotalFunds(walletTotal);

      console.log("this is tatal in EUR: ", walletTotal);
    }

    if (selected === "XAF") {
      let walletTotal =
        amountInERu + amountInUSD * valueInXAF.value + amountInXAF.amount;
      setTotalFunds(walletTotal);

      console.log("this is tatal in XAF: ", walletTotal);
    }

    console.clear();
    console.log("this is value in USD: ", valueInUSD);
    console.log("amont in USD", amountInUSD);
    console.log("this is equvelentAMTinEUR: ", equvelentAMTinEUR);

    /*
    // find base currency
    let valTo = baseCurrency?.find((cur) => {
      if (cur.code === selected) {
        return cur?.value;
      }
      return cur?.value;
    });
    valTo = valTo?.value;

    // values to be converted from
    let valFrom = baseCurrency?.filter((curren) => curren.code !== selected);
    const map = {};

    valFrom.forEach(({ code, value }) => (map[`${code}`] = value));

    // amoount to be converted to
    let amountTo = walletFunds?.find((fund) => {
      if (fund.currencyType === selected) {
        return fund.amount;
      }
      // return fund.amount;
    });
    amountTo = amountTo?.amount;

    // amount to be converted from
    let amountsFrom = walletFunds?.filter(
      (currency) => currency.currencyType !== selected
    );

    let results = 0;
    amountsFrom?.forEach(({ amount, currencyType }) => {
      results += amount / map[`${currencyType}`];
    });
    let total = results / valTo + amountTo;
    // total = total.toFixed(2);
    if (total) setTotalFunds(total);
    */
  };

  React.useEffect(() => {
    if (
      baseCurrency === null ||
      baseCurrency === undefined ||
      walletFunds === undefined ||
      walletFunds === null
    ) {
      setTotalFunds(0);
      return;
    } else balance();
  }, [selected, walletFunds]);

  return (
    <>
      <div className="wallet">
        <div className="walletContainer">
          <div className="header">
            <button onClick={() => setShowPopUp(true)} className="depositeBtn">
              Deposit
            </button>

            <PopUp trigger={showPopUp} setTrigger={setShowPopUp}>
              <DepositForm setShowPopUp={setShowPopUp} />
            </PopUp>
            <div className="balance">
              <span>
                {totalFunds} {selected}
              </span>
            </div>

            <div className="selectCurrency">
              <label>
                {/* select currency */}
                <select
                  name="selectedCurrency"
                  value={selected}
                  onChange={handleSelect}
                >
                  {baseCurrency?.map((currency, key) => (
                    <option
                      className="optionIterms"
                      key={key}
                      value={baseCurrency.code}
                    >
                      {currency.code}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="exchangeSection">
          <h2 className="text-center">wallet Name: {walletName}</h2>
          <FundsDeposit />
        </div>
        <ConvertCurr />
        <br />
      </div>
    </>
  );
};
