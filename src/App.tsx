import React, { lazy, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ResetCSS } from '@andex/uikit';
import GlobalStyle from './style/Global';
import Swap from "./pages/Swap";
import SuspenseWithChunkError from "./components/SuspenseWithChunckError";
import { PageLoader } from "./components/ContentLoader";
import Layout from "./components/Layout";

// Route-based code splitting
// Only Swap is included in the main bundle because it is the most visited page

const Home = lazy(() => import('./pages/Homepage/Homepage'))
const RemoveLiquidity = lazy(() => import('./pages/RemoveLiquidity'))
const Create = lazy(() => import('./pages/Builder/Create'))
const Builder = lazy(() => import('./pages/Builder'))
const TokenPage = lazy(() => import('./pages/Builder/Token'))
const AddLiquidity = lazy(() => import('./pages/AddLiquidity'))
const Pools = lazy(() => import('./pages/Pools'))
const ImportLiquidity = lazy(() => import('./pages/ImportLiquidity'))

const App: React.FC = () => {
  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Fragment>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
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
                path="add/:leftTokenRoot/:rightTokenRoot"
                element={<AddLiquidity />}
              />
              <Route path="add" element={<AddLiquidity />} />
              <Route path="remove" element={<RemoveLiquidity />} />
              <Route
                path="remove/:leftTokenRoot/:rightTokenRoot"
                element={<RemoveLiquidity />}
              />
              <Route path="builder" element={<Builder />} />
              <Route path="builder/create" element={<Create />} />
              <Route path="builder/:tokenRoot" element={<TokenPage />} />
              <Route path="import" element={<ImportLiquidity />} />
              <Route
                path="import/:leftTokenRoot/:rightTokenRoot"
                element={<ImportLiquidity />}
              />
            </Route>
          </Routes>
        </SuspenseWithChunkError>
      </Fragment>
    </Router>
  );
}

export default App;
