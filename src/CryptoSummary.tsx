import { Crypto } from "./Types/Types";

export type AppProps = {
  crypto: Crypto;
};

function CriptoSummary({ crypto }: AppProps): JSX.Element {
  return <>{`${crypto.name} ${crypto.current_price}`}</>;
}

export default CriptoSummary;
