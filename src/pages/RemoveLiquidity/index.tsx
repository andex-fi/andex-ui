import { RemoveLiquidity } from "./components/RemoveLiquidity";
import { RemoveLiquidityFormStoreProvider } from "../../contexts";
import Page from "../Page";

export default function RemoveLiquidityPage(): JSX.Element {
    return (
        <div>
            <RemoveLiquidityFormStoreProvider>
                <Page>
                    <RemoveLiquidity />
                </Page>
            </RemoveLiquidityFormStoreProvider>
        </div>
    )
}