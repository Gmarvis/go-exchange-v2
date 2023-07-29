import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Home } from "./pages/home";
import { Wallet } from "./pages/wallet/wallet";
import { Route, Routes } from "react-router-dom";
import { CurrencyContext } from "./utils/context";
// import { Navbar } from "./components/nav/navbar";
import Navbar from "./components/nav/navbar";

// const baseUrl = "https://api.currencyapi.com/v3/latest?apikey=yxwOCSE37Lu64dfvxhbaSrh8SduHenuI2FFeBArJ";

const apiUrl =
  "https://openexchangerates.org/api/latest.json?app_id=949d70acfb614d038b58da49e9502a65";

const baseUrl =
  "https://api.currencyapi.com/v3/latest?apikey=wm4xHyrV22ukG8i7AewRIN6Fpke3yCDwxwaLbQel";

function App() {
  const [currencies, setCurrencies] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState([]);

  const [exchangeRate, setExchangeRate] = useState();

  const updateBaseCurrency = (data) => {
    ["USD", "EUR", "XAF"].forEach((cur) => {
      setBaseCurrency((prev) => [...prev, data[`${cur}`]]);
    });
  };

  // console.log("base currencies", baseCurrency);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        let currencyArrar = Object.values(response.data.data).map(
          (currencies) => currencies
        );
        setCurrencies(currencyArrar);
        updateBaseCurrency(response.data.data);
        // fetchConvertApi();
      })
      .catch((error) => {
        alert("An error occured: ", error.message);
      });
  }, []);
  return (
    <div>
      <CurrencyContext.Provider
        value={{
          currencies,
          baseCurrency,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="wallet" element={<Wallet />} />
        </Routes>
      </CurrencyContext.Provider>
    </div>
  );
}

export default App;
