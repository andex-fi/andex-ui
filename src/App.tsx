import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Liquiditypools } from "./pages/pools/liquiditypools";
import { Addliquidity } from "./pages/pools/addliquidity";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pools">
          <Route index={true} element={<Liquiditypools />} />
          <Route index={false} path="addliquidity" element={<Addliquidity />} />
        </Route>
      </Routes>
    </>
  );
}
