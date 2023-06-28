import RemoveLiquidity from "./components/RemoveLiquidity";
import { RemoveLiquidityFormStoreProvider } from "../../contexts";
import Page from "../Page";

const RemoveLiquidityPage: React.FC = () => {
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

export default RemoveLiquidityPage;