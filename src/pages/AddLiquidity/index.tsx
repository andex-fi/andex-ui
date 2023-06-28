import React from "react";
import { AddLiquidityFormStoreProvider } from "../../contexts/AddLiquidityFormStoreContext";
import AddLiquidity from "./components/AddLiquidity";
import Page from "../Page";

const AddLiquidityPage: React.FC = () => {
  return (
    <AddLiquidityFormStoreProvider>
      <Page>
        <AddLiquidity />
      </Page>
    </AddLiquidityFormStoreProvider>
  );
}

export default AddLiquidityPage;
