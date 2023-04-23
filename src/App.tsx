import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CryptoSummary from "./CryptoSummary";
import { Crypto } from "./Types/Types";

function App() {
  const [cryptos, setCrytos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

    axios.get(url).then((respons) => {
      setCrytos(respons.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="">
        <select
          onChange={(e) => {
            const c = cryptos?.find((x) => x.id === e.target.value);
            console.log(c);
            setSelected(c);
          }}
          defaultValue="default"
        >
          <option value="default">Choose an option</option>
          {cryptos
            ? cryptos.map((crypto) => {
                return (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      {selected ? <CryptoSummary crypto={selected} /> : null}
    </div>
  );
}

export default App;
