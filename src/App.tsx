import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export type Crypto = {
  ath: number;
  atl: number;
  current_price: number;
  id: string;
  name: string;
  symbol: string;
  high_24h: number;
  low_24: number;
  image: string;
};

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
              return (
                <>
                  <img src={crypto.image} alt="" />
                  <p>{crypto.name}</p>
                  <p>{crypto.ath}</p>
                </>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default App;
