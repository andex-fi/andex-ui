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
        className="h-[48px] w-[48px] rounded-full"
        sizes={size}
        src={icon}
      />
    );
  }

  return address !== undefined ? (
    <Avatar address={address} size={size} className={className} />
  ) : null;
}
