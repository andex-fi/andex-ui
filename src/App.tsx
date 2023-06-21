// import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
// import { Liquiditypools } from "./pages/pools/liquiditypools";
// import { Addliquidity } from "./pages/pools/addliquidity";
// import Swap from "./pages/Swap";
import { Play } from "./pages/playground";
// import { Approveliquidity } from "./pages/AddLiquidity/components/approveliquidity";
import RemoveLiquidityPage from "./pages/RemoveLiquidity";
import { Homepage } from "./pages/homepage/Homepage";
// import { Nav } from "./components/Nav";
import CreatePage from "./pages/Launch/Create";
import BuilderPage from "./pages/Launch";
import TokenPage from "./pages/Launch/Token";
import AddLiquidityPage from "./pages/AddLiquidity";
import Pools from "./pages/pools";
import Layout from "./components/Layout";
import ImportLiquidityPage from "./pages/ImportLiquidity";
import { Swap } from "./pages/Swap";
import { Managetoken } from "./pages/ManageToken/managetoken";
// import BuilderPage from "./pages/Builder";

export default function App() {
  // const location = useLocation();
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
        <Route path="/play" element={<Play />} />
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
        <Route path="managetoken" element={<Managetoken />} />
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
