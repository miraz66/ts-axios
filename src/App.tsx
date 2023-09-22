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
  const [selected, setSelected] = useState<Crypto | null>();
  const [range, setRange] = useState<string>();

  const [pieData, setPieData] = useState<ChartData<"pie">>();
  const [data, setData] = useState<ChartData<"line">>();

  const [options, setOpetions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

    axios.get(url).then((respons) => {
      setCrytos(respons.data);
    });
  }, []);

  useEffect(() => {}, [selected, range]);

  return (
    <>
      <>
        <select
          onChange={(e) => {
            const c = cryptos?.find((x) => x.id === e.target.value);
            setSelected(c);

            axios(
              `https://api.coingecko.com/api/v3/coins/${c?.id}/market_chart?vs_currency=usd&days=1&interval=days`
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
            });
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

        <select
          onChange={(e) => {
            console.log(e.target.value);
          }}
          defaultValue="defaultDays"
        >
          <option value="defaultDays">Days</option>
          <option value="30">30 days</option>
          <option value="15">15 days</option>
          <option value="7">7 days</option>
          <option value="1">1 days</option>
        </select>
      </>

      <br />

      {selected ? <CryptoSummary crypto={selected} /> : null}

      {/* ----line Chart---- */}
      {data ? (
        <div style={{ width: 900, height: 700 }}>
          <Line options={options} data={data} />
        </div>
      ) : null}

      {/* ----Pie Chart---- */}
      {pieData ? <PieChart pieData={pieData} /> : null}
    </>
  );
}

export default App;
