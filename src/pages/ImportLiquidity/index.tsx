import React from "react";
import { ImportLiquidityFormStoreProvider } from "../../contexts/ImportLiquidityContext";
import { ImportLiquidity } from "./components/ImportLiquidity";

function ImportLiquidityPage() {
  return (
    <ImportLiquidityFormStoreProvider>
      <ImportLiquidity />
    </ImportLiquidityFormStoreProvider>
  );
}

export default ImportLiquidityPage;
