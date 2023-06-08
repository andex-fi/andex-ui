import type { Address } from "@andex/provider";

import type { CommonTokenTransactionReceipt } from "./types";
export const RECEIPTS = new Map<
  string,
  CommonTokenTransactionReceipt & { poolAddress?: Address }
>();
