import { lazy, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import RemoveLiquidityPage from "./pages/RemoveLiquidity";
import { PageLoader } from "./components/ContentLoader";
import SuspenseWithChunkError from "./components/SuspenseWithChunckError";
import Layout from "./components/Layout";
import Swap from "./pages/Swap";

// Route-based code splitting
// Only Swap and RemoveLiquidity is included in the main bundle because swap is the most visited page
// RemoveLiquidityPage is buggy when imported as a Lazy exotic component so we'll leave it in the main bundle

const Home = lazy(() => import('./pages/Homepage/Homepage'))
const Create = lazy(() => import('./pages/Builder/Create'))
const Builder = lazy(() => import('./pages/Builder'))
const TokenPage = lazy(() => import('./pages/Builder/Token'))
const AddLiquidity = lazy(() => import('./pages/AddLiquidity'))
const Pools = lazy(() => import('./pages/Pools'))
const ImportLiquidity = lazy(() => import('./pages/ImportLiquidity'))
const Farms = lazy(() => import('./pages/YieldFarming'))

const App = () => {
  return (
    <Fragment>
      <SuspenseWithChunkError fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/swap/:leftTokenRoot/:rigtTokenRoot" index={true} element={<Swap />} />
          <Route path="/swap" index={true} element={<Swap />} />
          <Route path="/swap/:leftTokenRoot" index={true} element={<Swap />} />
          <Route path="pools">
            <Route index={true} element={<Pools />} />
          </Route>
          <Route path="add/:leftTokenRoot/:rightTokenRoot" element={<AddLiquidity />} />
          <Route path="add" element={<AddLiquidity />} />
          <Route path="remove" element={<RemoveLiquidityPage />} />
          <Route path="remove/:leftTokenRoot/:rightTokenRoot" element={<RemoveLiquidityPage />} />
          <Route path="builder" element={<Builder />} />
          <Route path="builder/create" element={<Create />} />
          <Route path="builder/:tokenRoot" element={<TokenPage />} />
          <Route path="import" element={<ImportLiquidity />} />
          <Route path="import/:leftTokenRoot/:rightTokenRoot" element={<ImportLiquidity />} />
          <Route path="yeildfarming" element={<Farms />} />
        </Route>
      </Routes>
      </SuspenseWithChunkError>
    </Fragment>
  );
}

export default App;