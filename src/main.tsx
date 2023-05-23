import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AccountProvider from "./contexts/AccountProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <App />
      </AccountProvider>
    </BrowserRouter>
  </React.StrictMode>
);
