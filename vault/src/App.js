import { useState, useEffect } from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { formatEther } from "@ethersproject/units";

import { injected } from "./lib/connectors";

import { ethers } from 'ethers';

import "./styles/globals.css";

import contractAddrs from './constant/contract-addr.json';
import StableCoin from './constant/Coin.json';

function App() {
  const { chainId, account, active, activate, deactivate, library } = useWeb3React();
  const balance = useBalance();

  // read-only
  const TokenContract = new ethers.Contract(contractAddrs.rinkeby.StableCoin, StableCoin.abi, library);
  console.log(TokenContract);

  const handleConnect = () => {
    if (active) {
      deactivate();
      return;
    }

    activate(injected, (error) => {
      if ("/No Ethereum provider was found on window.ethereum/".test(error)) {
        window.open("https://metamask.io/download.html");
      }
    });
  };

  return (
    <div>
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 text-gray-100">
          {active ? (
            <>
              <div>
                Chain Id : {chainId}
              </div>
              <div>
                Addr : {account.substr(0, 8)}...{account.substr(-8, 8)}
              </div>
              <div>{balance}</div>
              <button
                className="h-10 px-5 border border-gray-400 rounded-md"
                onClick={async () => {
                  const message = `Logging in at ${new Date().toISOString()}`;
                  const signature = await library
                    .getSigner(account)
                    .signMessage(message)
                    .catch((error) => console.error(error));
                  console.log({ message, account, signature });
                }}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <button
                className="h-10 px-5 border border-gray-400 rounded-md"
                onClick={() => {
                  activate(new InjectedConnector({}));
                }}
              >
                Connect
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
    <div>
      {
        active ? (
          <div>
            AAA
          </div>
        ) : (
        <></>
      )}
    </div>
    </div>
  );
}

const useBalance = () => {
  const { account, library } = useWeb3React();
  const [balance, setBalance] = useState();

  useEffect(() => {
    if (account) {
      library.getBalance(account).then((val) => setBalance(val));
    }
  }, [account, library]);

  return balance ? `${formatEther(balance)} ETH` : null;
};

export default App;
