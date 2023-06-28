import Avatar from "../Avatar";
import { TokenIconProps } from "./types";

const TokenIcon: React.FC<TokenIconProps> = ({
  address,
  className,
  icon,
  name,
  size = "large",
}) => {
  if (icon !== undefined) {
    return (
      <img
        alt={name}
        className={`h-[32px] w-[32px] block rounded-full ${className}`}
        sizes={size}
        src={icon}
      />
    );
  }

  return address !== undefined ? (
    <Avatar address={address} size={size} className={className} />
  ) : null;
}

export default TokenIcon;
