import { useFavoritesPoolsStorage } from "./hooks/useFavoritesPoolsStorage";
import { Liquiditypools } from "./liquiditypools";
import { PoolsStoreProvider } from "../../contexts/PoolsStoreProvider";

function Pools() {
  const pools = useFavoritesPoolsStorage();

  return (
    <PoolsStoreProvider params={{ pools }}>
      <Liquiditypools />
    </PoolsStoreProvider>
  );
}

export default Pools;
