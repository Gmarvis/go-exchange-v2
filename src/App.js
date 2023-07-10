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

const baseUrl =
  "https://api.currencyapi.com/v3/latest?apikey=wm4xHyrV22ukG8i7AewRIN6Fpke3yCDwxwaLbQel";

function App() {
  const [currencies, setCurrencies] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState([]);

  const updateBaseCurrency = (data) => {
    ["USD", "EUR", "XAF"].forEach((cur) => {
      setBaseCurrency((prev) => [...prev, data[`${cur}`]]);
    });
  };

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setCurrencies(response.data);
      updateBaseCurrency(response.data.data);
    });
  }, []);

  // console.log("this is base cuurencies", baseCurrency);

  return (
    <div>
      <CurrencyContext.Provider value={{ baseCurrency }}>
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
