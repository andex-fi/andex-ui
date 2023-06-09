import { RemoveLiquidity } from "./components/RemoveLiquidity";
import { RemoveLiquidityFormStoreProvider } from "../../contexts";

export default function RemoveLiquidityPage(): JSX.Element {
    return (
        <div>
            <RemoveLiquidityFormStoreProvider>
                <RemoveLiquidity />
            </RemoveLiquidityFormStoreProvider>
        </div>
    )
}