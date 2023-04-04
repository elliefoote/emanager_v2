import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import LayoutWrapper from "./components/LayoutWrapper";
import "./index.css";
import AuthContextProvider from "./context/AuthContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <LayoutWrapper>
          <App />
        </LayoutWrapper>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
