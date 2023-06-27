import { AddLiquidityFormStoreProvider } from "../../contexts/AddLiquidityFormStoreContext";
import AddLiquidity from "./components/AddLiquidity";
import Page from "../Page";

function AddLiquidityPage() {
  return (
    <AddLiquidityFormStoreProvider>
      <Page>
        <AddLiquidity />
      </Page>
    </AddLiquidityFormStoreProvider>
  );
}

export default AddLiquidityPage;
