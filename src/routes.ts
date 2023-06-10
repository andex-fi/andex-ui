import { generatePath } from "react-router-dom";

export type Params = Record<string, string>;

export type URLTokensParams = {
  leftTokenRoot?: string;
  rightTokenRoot?: string;
};

export type URLAddressParam = {
  address: string;
};

export class Route<P extends Params> {
  readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  makeUrl(params?: P): string {
    return generatePath(this.path, params);
  }
}

/* eslint-disable sort-keys */
export const apiRoutes = {
  crossPairs: new Route('/pairs/cross_pairs'),
  currencies: new Route('/currencies'),
  currency: new Route<URLAddressParam>('/currencies/:address'),
  currencyPrices: new Route<URLAddressParam>('/currencies/:address/prices'),
  currencyVolume: new Route<URLAddressParam>('/currencies/:address/volume'),
  currencyTvl: new Route<URLAddressParam>('/currencies/:address/tvl'),
  currenciesUsdtPrices: new Route('/currencies_usdt_prices'),
  pool: new Route('/pools/address/:address([0][:][0-9a-f]{64})?'),
  pools: new Route('/pools'),
  poolOhlcv: new Route('/pools/ohlcv'),
  poolCrossSwapRoute: new Route('/pools/cross_swap_route'),
  poolCrossSwapRoutePayload: new Route('/pools/cross_swap_payload'),
  poolCrossSwapStatus: new Route('/pools/cross_swap_payload_status'),
  transactions: new Route('/transactions'),
}

export const appRoutes = {
    home: new Route("/"),
    liquidityAdd: new Route<URLTokensParams>("/addliquidity/:leftTokenRoot([0][:][0-9a-f]{64})?/:rightTokenRoot([0][:][0-9a-f]{64})?"),
    liquidityRemove: new Route<URLTokensParams>("/removeliquidity/:leftTokenRoot([0][:][0-9a-f]{64})?/:rightTokenRoot([0][:][0-9a-f]{64})?"),
    builder: new Route('/builder'),
    builderCreate: new Route('/builder/create'),
    builderItem: new Route<{ tokenRoot: string }>('/builder/:tokenRoot([0][:][0-9a-f]{64})')
}
