// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

function App() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function requestConverstion() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const requestResult = await res.json();
        console.log(requestResult.rates);
        setResult(requestResult.amount * requestResult.rates[to]);
        setIsLoading(false);
      } catch (err) {
        setResult(null);
        console.log(err);
      }
    }
    if (from === to) {
      return setResult(amount);
    }

    if (from && to && amount) {
      requestConverstion();
    }
  }, [from, to, amount]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        disabled={isLoading}
      />
      <select
        onChange={(e) => setFrom(e.target.value)}
        value={from}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        onChange={(e) => setTo(e.target.value)}
        value={to}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{result ? result : "OUTPUT"}</p>
    </div>
  );
}

export default App;
