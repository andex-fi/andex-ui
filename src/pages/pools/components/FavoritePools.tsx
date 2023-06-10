import React from "react";
import { usePoolsStoreContext } from "../../../contexts/PoolsStoreProvider";
import { reaction } from "mobx";
import { Observer } from "mobx-react-lite";
import { TokenIcon } from "../../../components/TokenIcon";

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
              <div
                key={index}
                className="bg-[#F4F5FA] dark:bg-purple-light text-black p-4 w-full my-4 rounded-lg"
              >
                <div className="flex gap-2 items-center">
                  <div className="flex">
                    <TokenIcon
                      size="medium"
                      address={item.roots.left.toString()}
                    ></TokenIcon>
                    <TokenIcon
                      size="medium"
                      className=""
                      address={item.roots.right.toString()}
                    ></TokenIcon>
                  </div>
                  <div>
                    {
                      poolsStore.tokensCache.get(item.roots.left.toString())
                        ?.symbol
                    }
                    /
                    {
                      poolsStore.tokensCache.get(item.roots.right.toString())
                        ?.symbol
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-48">
            <p className="font-bold">No positions found</p>
          </div>
        )
      }
    </Observer>
  );
}

export default FavoritePools;
