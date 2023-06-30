import React from "react";
import { ImportLiquidityFormStoreProvider } from "../../contexts/ImportLiquidityContext";
import ImportLiquidity from "./components/ImportLiquidity";
import Page from "../Page";

const ImportLiquidityPage: React.FC = () => {
  return (
    <ImportLiquidityFormStoreProvider>
      <Page>
        <ImportLiquidity />
      </Page>
    </ImportLiquidityFormStoreProvider>
  );
}

export default ImportLiquidityPage;
