import { Avatar } from "../Avatar";

export type TokenIconProps = {
  address?: string;
  className?: string;
  icon?: string;
  name?: string;
  size?: "small" | "xsmall" | "medium" | "large";
};

export function TokenIcon({
  address,
  className,
  icon,
  name,
  size = "large",
}: TokenIconProps): JSX.Element | null {
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
