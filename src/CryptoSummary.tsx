import { Crypto } from "./Types/Types";

export type AppProps = {
  crypto: Crypto;
};

function CriptoSummary({ crypto }: AppProps): JSX.Element {
  return (
    <>
      <img src={crypto.image} alt="" />
      <p>{crypto.name}</p>
      <p>{crypto.ath}</p>
    </>
  );
}

export default CriptoSummary;
