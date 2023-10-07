import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CryptoSummary from "./CryptoSummary";
import { Crypto } from "./Types/Types";

import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PieChart from "./Types/ChartJs/PieChart";
import moment from "moment";
import { log } from "console";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [cryptos, setCrytos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto[]>([]);
  // const [range, setRange] = useState<number>();

  const [pieData, setPieData] = useState<ChartData<"pie">>();
  const [payName, setPayName] = useState<string>();

  /*const [data, setData] = useState<ChartData<"line">>();
  const [options, setOpetions] = useState<ChartOptions<"line">>();*/

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

    axios.get(url).then((respons) => {
      setCrytos(respons.data);
    });
  }, []);

  /*useEffect(() => {
    if (!selected) return;

    axios(
      `https://api.coingecko.com/api/v3/coins/${selected?.id}/market_chart?vs_currency=usd&days=${range}&interval=daily&precision=3`
    ).then((response) => {
      console.log(response.data);

      // ----line Chart----
      setData({
        labels: response.data.prices.map((price: number[]) => {
          return moment.unix(price[0] / 1000).format("MM-DD");
        }),
        datasets: [
          {
            label: "Dataset 1",
            data: response.data.prices.map((price: number[]) => {
              return price[1];
            }),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });

      // ----Pie Chart----
      setPieData(
        response.data.prices.map((price: number[]) => {
          return price[1];
        })
      );

      // ----Set Options----
      setOpetions({
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: `Price over last ` + range + `day(s)`,
          },
        },
      });
    });
  }, [selected, range]);*/

  useEffect(() => {
    const data = selected.map((num) => num.owned);
    const name = selected.map((num) => num.name);

    // setPieData(data);
    setPayName(name);
  }, [selected]);

  function updateOwned(crypto: Crypto, amount: number): void {
    let temp = [...selected];
    let tempObj = temp.find((item) => item.id === crypto.id);

    if (tempObj) {
      tempObj.owned = amount;
      setSelected(temp);
    }

    console.log("updateOwned", crypto, amount);
  }

  return (
    <div className="m-20">
      <>
        <select
          onChange={(e) => {
            const c = cryptos?.find((x) => x.id === e.target.value) as Crypto;
            setSelected([...selected, c]);
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

        <br />
        {/* <select
          onChange={(e) => {
            console.log(e.target.value);
            setRange(parseInt(e.target.value));
          }}
          defaultValue="default"
        >
          <option value="default">Days</option>
          <option value={30}>30 days</option>
          <option value={15}>15 days</option>
          <option value={7}>7 days</option>
          <option value={1}>1 days</option>
        </select> */}
      </>
      {selected.map((s) => {
        return <CryptoSummary crypto={s} updateOwned={updateOwned} />;
      })}
      {/*selected ? <CryptoSummary crypto={selected} /> : null*/}
      {/* ----line Chart---- */}
      {/*data ? (
        <div style={{ width: 900, height: 700 }}>
          <Line options={options} data={data} />
        </div>
      ) : null*/}
      {/* ----Pie Chart---- */}
      {pieData ? <PieChart name={name} pieData={pieData} /> : null}
      <p>
        Total fortfolio Value: $
        {selected
          ? selected
              .map((s) => {
                if (isNaN(s.owned)) {
                  return 0;
                }

                return s.current_price * s.owned;
              })
              .reduce((prev, current) => {
                console.log("prev", prev, "current", current);
                return prev + current;
              }, 0)
              .toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
          : null}
      </p>
    </div>
  );
}

export default App;
