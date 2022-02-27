import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import "./styles/globals.css";

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
