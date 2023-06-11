import * as React from "react";
import { reaction } from "mobx";

import {
  useFavoritePairs,
  useFavoritePools,
} from "../../../state/FavoritePairs";
import { storage } from "../../../utils";
import { useForceUpdate } from "../../../utils";

export function useFavoritesPoolsStorage(): string[] {
  const favoritesPairs = useFavoritePairs();
  const favoritePools = useFavoritePools();
  const forceUpdate = useForceUpdate();

  React.useEffect(
    () =>
      reaction(
        () => favoritesPairs.addresses,
        (addresses) => {
          if (addresses.length > 0) {
            addresses.forEach((address) =>
              favoritePools.add(address, undefined, true)
            );
            favoritesPairs.clear();
            storage.remove("favorite_pairs");
            favoritePools.saveToStorage();
          }
        },
        { fireImmediately: true }
      ),
    [favoritePools, favoritesPairs]
  );

  React.useEffect(
    () =>
      reaction(() => favoritePools.addresses, forceUpdate, {
        fireImmediately: true,
      }),
    [favoritePools.addresses, forceUpdate]
  );

  return favoritePools.addresses ?? [];
}
