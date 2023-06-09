import * as React from "react";

import { sliceAddress } from "../../utils";

type Props = React.PropsWithChildren<{
  address: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}>;

export function AccountExplorerLink(props: Props): JSX.Element {
  const { address, children, className, onClick } = props;

  return (
    <a
      className={className}
      href={`https://everscan.io/accounts/${address}`}
      title={"Open in Explorer"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children || sliceAddress(address)}
    </a>
  );
}
