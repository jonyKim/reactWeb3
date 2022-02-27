import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";

import stableCoinInfo from "../constant/StableCoin.json";

function StableCoin(props) {
  const [name, setName] = useState();
  const [balance, setBalance] = useState();
  const [token, setStableCoin] = useState();

  const { library } = useWeb3React();

  useEffect(() => {
    const load = async () => {
      console.log("load.. stablecoin info..");

      // read-only
      const token = new ethers.Contract(
        stableCoinInfo.addr.rinkeby,
        stableCoinInfo.abi,
        library
      );

      setStableCoin(token);
      if (token) {
        let bal = await token.balanceOf(props.account);
        console.log("balance:" + bal);

        let name = await token.name();
        console.log("name:" + name);

        setBalance(bal.toString());
        setName(name);
      }
    };

    if (typeof props.account !== "undefined" && !token) {
      load();
    }
  });

  return (
    <div>
      <div>Stable Coin Section..</div>
      <div>Name : {name}</div>
      <div>Balance : {balance}</div>
    </div>
  );
}

export default StableCoin;
