import { useState, useEffect } from "react";
import { Crypto } from "./Types/Types";

export type AppProps = {
  crypto: Crypto;
};

function CriptoSummary({ crypto }: AppProps): JSX.Element {
  const [amount, setAmount] = useState<string>();

  useEffect(() => console.log(crypto.name, amount));

  return (
    <div className="py-4">
      <p>{`${crypto.name} ${crypto.current_price}`}</p>
      <input
        className="border"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  );
}

export default CriptoSummary;
