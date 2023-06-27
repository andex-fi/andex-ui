import { useFavoritesPoolsStorage } from "./hooks/useFavoritesPoolsStorage";
import { Liquiditypools } from "./LiquidityPools";
import { PoolsStoreProvider } from "../../contexts/PoolsStoreProvider";
import Page from "../Page";

function Pools() {
  const pools = useFavoritesPoolsStorage();

  return (
    <Page>
      <PoolsStoreProvider params={{ pools }}>
        <Liquiditypools />
      </PoolsStoreProvider>
    </Page>
  );
}

export default Pools;
