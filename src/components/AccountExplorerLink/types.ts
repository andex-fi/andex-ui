import React from "react";

export type AccountExplorerProps = React.PropsWithChildren<{
    address: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}>;