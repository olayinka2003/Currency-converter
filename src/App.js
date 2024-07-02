import "./App.css";
import { useEffect, useState } from "react";

// const Api = "https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD";

function App() {
  const [amount, setAmount] = useState("");
  function handleAmountChange(e) {
    setAmount(Number(e.target.value));
  }
  const [convert, setConvert] = useState("EUR");
  const [convert2, setConvert2] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(0);

 
  useEffect(() => {
    async function getConverter() {
      if(!amount)return
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${convert}&to=${convert2}`
      );
      const data = await response.json();
      console.log(data.rates);

      setConvertedAmount(data.rates[convert2]);
    }

    getConverter();
  }, [amount,convert, convert2]);
  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <input type="text" value={amount} onChange={handleAmountChange} />
      <select value={convert} onChange={(e) => setConvert(e.target.value)}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="CAD">CAD</option>
      </select>
      <select value={convert2} onChange={(e) => setConvert2(e.target.value)}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="CAD">CAD</option>
      </select>

      {/* <p>{convertedAmount}</p> */}

      <p>
        {amount && convert && convert2 && convertedAmount !== null
          ? `${amount} ${convert} = ${convertedAmount} ${convert2}`
          : "Enter a valid amount to see the conversion"}
      </p>
    </div>
  );
}

export default App;
