import { AddLiquidityFormStoreProvider } from "../../contexts/AddLiquidityFormStoreContext";
import AddLiquidity from "./components/AddLiquidity";

function AddLiquidityPage() {
  return (
    <AddLiquidityFormStoreProvider>
      <AddLiquidity />
    </AddLiquidityFormStoreProvider>
  );
}

export default AddLiquidityPage;
