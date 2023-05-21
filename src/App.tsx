import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Liquiditypools } from "./pages/liquiditypools";

import Swap from "./pages/Swap";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pools" element={<Liquiditypools />} />
        <Route path="/swap" element={<Swap />} />
      </Routes>
    </>
  );
}
