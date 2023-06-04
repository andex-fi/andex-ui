import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AccountProvider from "./contexts/AccountProvider.tsx";
import DexAccountProvider from "./contexts/DexAccountProvider.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <DexAccountProvider>
          <App />
          <ToastContainer position="bottom-right" />
        </DexAccountProvider>
      </AccountProvider>
    </BrowserRouter>
  </React.StrictMode>
);
