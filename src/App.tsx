import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Liquiditypools } from "./pages/pools/liquiditypools";
import { Addliquidity } from "./pages/pools/addliquidity";
import Swap from "./pages/Swap";
import { Approveliquidity } from "./pages/pools/approveliquidity";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Swap />} />
        <Route path="pools">
          <Route index={true} element={<Liquiditypools />} />
        </Route>
        <Route path="addliquidity" element={<Addliquidity />} />
        <Route path="approveliquidity" element={<Approveliquidity />} />
      </Routes>
    </>
  );
}
