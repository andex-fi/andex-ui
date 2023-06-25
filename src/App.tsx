import { Routes, Route } from "react-router-dom";
import RemoveLiquidityPage from "./pages/RemoveLiquidity";
import { Homepage } from "./pages/homepage/Homepage";
import CreatePage from "./pages/Builder/Create";
import BuilderPage from "./pages/Builder";
import TokenPage from "./pages/Builder/Token";
import AddLiquidityPage from "./pages/AddLiquidity";
import Pools from "./pages/pools";
import Layout from "./components/Layout";
import ImportLiquidityPage from "./pages/ImportLiquidity";
import { Swap } from "./pages/Swap";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/swap/:leftTokenRoot/:rigtTokenRoot"
          index={true}
          element={<Swap />}
        />
        <Route path="/swap" index={true} element={<Swap />} />
        <Route path="/swap/:leftTokenRoot" index={true} element={<Swap />} />
        <Route path="pools">
          <Route index={true} element={<Pools />} />
        </Route>
        <Route
          path="addliquidity/:leftTokenRoot/:rightTokenRoot"
          element={<AddLiquidityPage />}
        />
        <Route path="addliquidity" element={<AddLiquidityPage />} />
        <Route path="removeliquidity" element={<RemoveLiquidityPage />} />
        <Route
          path="removeliquidity/:leftTokenRoot/:rightTokenRoot"
          element={<RemoveLiquidityPage />}
        />
        <Route path="builder" element={<BuilderPage />} />
        <Route path="builder/create" element={<CreatePage />} />
        <Route path="builder/:tokenRoot" element={<TokenPage />} />
        <Route path="importliquidity" element={<ImportLiquidityPage />} />
        <Route
          path="importliquidity/:leftTokenRoot/:rightTokenRoot"
          element={<ImportLiquidityPage />}
        />
      </Route>
    </Routes>
  );
}
