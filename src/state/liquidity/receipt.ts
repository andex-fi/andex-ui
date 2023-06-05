import type { Address } from "everscale-inpage-provider";

import type { CommonTokenTransactionReceipt } from "./types";
export const RECEIPTS = new Map<
  string,
  CommonTokenTransactionReceipt & { poolAddress?: Address }
>();
