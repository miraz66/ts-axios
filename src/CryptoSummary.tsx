import { useState, useEffect } from "react";
import { Crypto } from "./Types/Types";

export type AppProps = {
  crypto: Crypto;
};

function CriptoSummary({ crypto }: AppProps): JSX.Element {
  const [amount, setAmount] = useState<number>(0);

  useEffect(() =>
    console.log(crypto.name, amount, crypto.current_price * amount)
  );

  return (
    <div className="py-4">
      <p>{`${crypto.name} ${crypto.current_price}`}</p>
      <input
        type="number"
        className="border"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <p>
        $
        {amount
          ? (crypto.current_price * amount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "0.00"}
      </p>
    </div>
  );
}

export default CriptoSummary;
