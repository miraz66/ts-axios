import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CryptoSummary from "./CryptoSummary";
import { Crypto } from "./Types/Types";

function App() {
  const [cryptos, setCrytos] = useState<Crypto[] | null>(null);

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

    axios.get(url).then((respons) => {
      setCrytos(respons.data);
    });
  });

  return (
    <div className="App">
      <div className="">
        {cryptos
          ? cryptos.map((crypto) => {
              return <CryptoSummary crypto={crypto} />;
            })
          : null}
      </div>
    </div>
  );
}

export default App;
