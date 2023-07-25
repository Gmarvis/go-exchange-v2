import { React, useContext, useEffect, useState } from "react";
import axios from "axios";
import "./conveter.css";
import CurrencyRow from "../currencyRow";
import { CurrencyContext } from "../../utils/context";

const apiUrl =
  "https://openexchangerates.org/api/latest.json?app_id=949d70acfb614d038b58da49e9502a65";

const CurrencyConverter = () => {
  const { currencies } = useContext(CurrencyContext);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurency, setAmountInFromCurency] = useState(true);
  const [convertData, setConvertData] = useState([]);
  const [currencyOptions, setCurrencyOPtions] = useState([]);
  // this is the states to be used for convertion
  const [currencyTo, setCurrencyTo] = useState();
  const [currencyFrom, setCurencyFrom] = useState();

  console.log("this is the convert data", [convertData.rates]);

  const arr = [];
  arr.push(convertData.rates);
  // Object.values();
  // console.clear();
  // console.log("this is our new array", arr);
  // setting the amount

  // handle currency

  const exChangeCurreny = () => {};

  const choosenCurrency = (e) => {
    if (amountInFromCurency) {
      setFromCurrency(e.target.value);
    } else {
      setFromCurrency(e.target.value);
    }
  };

  let toAmount, fromAmount;
  if (amountInFromCurency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  const fetchConvertApi = () => {
    axios.get(apiUrl).then((res) => {
      setConvertData(res.data);
      setCurrencyOPtions([res.data.base, ...Object.keys(res.data.rates)]);
      setFromCurrency(res.data.base);
      const fistCurrency = Object.keys(res.data.rates)[0];
      setToCurrency(fistCurrency);

      setExchangeRate(res.data.rates[fistCurrency]);
      console.log("base currency: ", fromCurrency);
    });
  };

  useEffect(() => {
    fetchConvertApi();
  }, []);

  // console.log("convertion data: ", convertData.base);

  const handleFromAmountChanged = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurency(true);
  };

  const handleToAmontChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurency(false);
  };

  // console.log(`${apiUrl}?base=${fromCurrency}&symbols=${toCurrency}`);
  // https://api.exchangeratesapi.io/v1/latest
  // ? access_key = API_KEY
  // & base = USD
  // & symbols = GBP,JPY,EUR

  // useEffect(() => {
  //   if (fromCurrency != null && toCurrency != null) {
  //     fetch(`${apiUrl}?base=USD&symbols=GBP`)
  //       .then((res) => res.json())
  //       .then((data) => setExchangeRate(data.rates[toCurrency]))
  //       .catch((error) => console.log({ error }));
  //   }
  //   console.log({ fromCurrency, toCurrency, exchangeRate });
  // }, [fromCurrency, toCurrency]);

  return (
    <div className="currencyConverter">
      <h1>Currency Exchange</h1>
      <div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurency={fromCurrency}
          // onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeCurrency={(e) => choosenCurrency}
          amount={fromAmount}
          onchangeAmount={handleFromAmountChanged}
        />
        <div className="equal">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurency={toCurrency}
          // onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeCurrency={(e) => choosenCurrency}
          amount={toAmount}
          onchangeAmount={handleToAmontChange}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
