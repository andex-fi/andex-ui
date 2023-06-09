import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import { Liquiditypools } from "./pages/pools/liquiditypools";
// import { Addliquidity } from "./pages/pools/addliquidity";
import Swap from "./pages/Swap";
import { Play } from "./pages/playground";
// import { Approveliquidity } from "./pages/AddLiquidity/components/approveliquidity";
import RemoveLiquidityPage from "./pages/RemoveLiquidity";
import { Homepage } from "./pages/homepage/Homepage";
import { Nav } from "./components/Nav";
import AddLiquidity from "./pages/AddLiquidity/components/AddLiquidity";
import AddLiquidityPage from "./pages/AddLiquidity";

export default function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <Nav /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/play" element={<Play />} />
        <Route path="pools">
          <Route index={true} element={<Liquiditypools />} />
        </Route>
        <Route path="addliquidity" element={<AddLiquidityPage />} />
        <Route path="removeliquidity" element={<RemoveLiquidityPage />} />
      </Routes>
    </>
  );
}
