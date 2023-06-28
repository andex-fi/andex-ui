import React from "react";
import { useFavoritesPoolsStorage } from "./hooks/useFavoritesPoolsStorage";
import Liquiditypools from "./LiquidityPools";
import { PoolsStoreProvider } from "../../contexts/PoolsStoreProvider";
import Page from "../Page";

const Pools: React.FC = () => {
  const pools = useFavoritesPoolsStorage();

  return (
      <PoolsStoreProvider params={{ pools }}>
        <Page>
          <Liquiditypools />
        </Page>
      </PoolsStoreProvider>
  );
}

export default Pools;
