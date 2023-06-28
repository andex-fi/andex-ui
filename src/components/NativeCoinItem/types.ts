import type { WalletNativeCoin } from "../../state/WalletService";

export type NativeCoinItemProps = {
    coin: WalletNativeCoin;
    disabled?: boolean;
    onSelect?: () => void;
  };