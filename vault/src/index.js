import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { useState, useEffect } from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { formatEther } from "@ethersproject/units";

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
