import { observer } from "mobx-react-lite";

import TokenIcon, { TokenIconProps } from "../TokenIcon";
import { useTokensCache } from "../../hooks";

type Props = {
  address: string;
  icon?: string;
  size?: TokenIconProps["size"];
  symbol?: string;
};

const TokenInner: React.FC<Props> =({
  address,
  icon,
  size = "small",
  symbol,
}) => {
  const tokensCache = useTokensCache();
  const token = tokensCache.get(address);

  return (
    <div className="flex gap-2">
      <TokenIcon
        address={token?.root ?? address}
        icon={token?.icon ?? icon}
        size={size}
      />
      {token?.symbol ?? symbol}
    </div>
  );
}

export const Token = observer(TokenInner);
