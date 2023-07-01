import type { WalletNativeCoin } from "@andex/sdk";

export type NativeCoinItemProps = {
    coin: WalletNativeCoin;
    disabled?: boolean;
    onSelect?: () => void;
  };