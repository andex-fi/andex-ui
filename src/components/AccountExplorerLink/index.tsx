import * as React from "react";
import { AccountExplorerProps } from "./types";
import { sliceAddress } from "../../utils";
import { Link } from "@andex/uikit";

const AccountExplorerLink: React.FC<AccountExplorerProps> = ({ address, children, className, onClick }) => {
  return (
    <Link
      className={className}
      href={`https://devnet.venomscan.com/accounts/${address}`}
      title={"Open in Explorer"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children || sliceAddress(address)}
    </Link>
  );
}

export default AccountExplorerLink;
