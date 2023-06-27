import React from "react";
import { usePoolsStoreContext } from "../../../contexts/PoolsStoreProvider";
import { reaction } from "mobx";
import { Observer } from "mobx-react-lite";
// import { TokenIcon } from "../../../components/TokenIcon";
import { Link } from "react-router-dom";
import PoolRow from "./PoolRow";
import { Oval } from "react-loader-spinner";

function FavoritePools() {
  const poolsStore = usePoolsStoreContext();

  React.useEffect(
    () =>
      reaction(
        () => poolsStore.tokensCache.isReady,
        async (isTokensCacheReady) => {
          if (isTokensCacheReady) {
            await poolsStore.fetch();
          }
        },
        { delay: 50, fireImmediately: true }
      ),
    [poolsStore]
  );
  console.log(poolsStore);
  return (
    <Observer>
      {() =>
        poolsStore.pools.length > 0 ? (
          <div className="">
            <div className="flex items-center justify-between text-[#657795] mt-5">
              <h4 className="text-sm font-bold">
                Your positions(<span>{poolsStore.pools.length}</span>)
              </h4>
              <p className="text-sm font-bold">Status</p>
            </div>
            {poolsStore.pools.map((item, index) => (
              <>
                <PoolRow
                  leftToken={poolsStore.tokensCache.get(
                    item.roots.left.toString()
                  )}
                  rightToken={poolsStore.tokensCache.get(
                    item.roots.right.toString()
                  )}
                  pool={item.pool}
                  // userLpBalance={item.userLpBalance}
                  key={index}
                  user={poolsStore.wallet.address}
                />
              </>
            ))}
            <div className="text-center mt-5">
              Can't find pool?{" "}
              <Link className="text-blue-400 underline" to="/import">
                Import pools
              </Link>
            </div>
          </div>
        ) : poolsStore.isFetching ? (
          <Oval
            width={"25px"}
            color="#19102d"
            secondaryColor="rgba(255, 255, 255)"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-48">
            <p className="font-bold">
              No positions found{" "}
              <Link className="text-blue-400 underline" to="/import">
                Import pools
              </Link>{" "}
            </p>
          </div>
        )
      }
    </Observer>
  );
}

export default FavoritePools;
