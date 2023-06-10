/* eslint-disable no-empty */
import { computed, makeObservable } from "mobx";

// import { usePoolsApi } from "../pages/pools/hooks/useApi";
import type { PoolResponse, PoolsPagination } from "../types/PoolTypes";
import { PoolsOrdering } from "../types/PoolTypes";
import { BaseStore } from "./BaseStore";
import { TokensCacheService } from "./TokensCacheService";
import { WalletService } from "./WalletService";
import { PairUtils } from "../constants";

export type PoolsStoreData = {
  pools: PoolResponse[];
};

export type PoolsStoreState = {
  isFetching?: boolean;
  ordering: PoolsOrdering;
  pagination: PoolsPagination;
};

export type PoolsStoreCtorParams = {
  pools?: string[];
};

export class PoolsStore extends BaseStore<PoolsStoreData, PoolsStoreState> {
  constructor(
    public readonly wallet: WalletService,
    public readonly tokensCache: TokensCacheService,
    protected readonly params?: PoolsStoreCtorParams
  ) {
    super();

    this.setData("pools", []);

    this.setState(() => ({
      ordering: PoolsOrdering.TvlDescending,
      pagination: {
        currentPage: 1,
        limit: 10,
        totalCount: 0,
        totalPages: 0,
      },
    }));

    makeObservable(this, {
      isFetching: computed,
      ordering: computed,
      pagination: computed,
      pools: computed,
    });
  }

  public async fetch(force?: boolean): Promise<void> {
    if (!force && this.isFetching) {
      return;
    }

    try {
      this.setState("isFetching", true);
      const fetchPools = async (pools: string[]) => {
        // eslint-disable-next-line prefer-const
        let pool: any[] = [];

        for (let i = 0; i < pools.length; i++) {
          const _roots = await PairUtils.roots(pools[i]);
          console.log("_roots", _roots);
          pool.push({ roots: _roots, pair: pools[i] });
        }
        return { pools: pool, totalCount: pool.length };
      };

      let response;
      if (this.params !== undefined && this.params.pools !== undefined) {
        response = await fetchPools(this.params.pools);
        console.log("fetch", response);
      } else {
        response = { pools: [], totalCount: 0 };
      }

      //   const response = await this.api.pools(
      //     {},
      //     {
      //       method: "POST",
      //     },
      //     {
      //       currencyAddresses: this.tokensCache.roots,
      //       favoritePools: this.params?.pools ?? null,
      //       limit: this.pagination.limit,
      //       offset: this.pagination.limit * (this.pagination.currentPage - 1),
      //       ordering: this.ordering,
      //     }
      //   );

      this.setData("pools", response.pools);

      this.setState("pagination", {
        ...this.pagination,
        totalCount: response.totalCount,
        totalPages: Math.ceil(response.totalCount / this.pagination.limit),
      });
    } catch (e) {
    } finally {
      this.setState("isFetching", false);
    }
  }

  public get pools(): PoolsStoreData["pools"] {
    return this.data.pools;
  }

  public get isFetching(): PoolsStoreState["isFetching"] {
    return this.state.isFetching;
  }

  public get ordering(): PoolsStoreState["ordering"] {
    return this.state.ordering;
  }

  public get pagination(): PoolsStoreState["pagination"] {
    return this.state.pagination;
  }
}
