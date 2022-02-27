import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";

import vaultInfo from "../constant/Vault.json";

function Vault(props) {
  //console.log(props.contract);
  const [name, setName] = useState();
  const [balance, setBalance] = useState();
  const [vault, setVault] = useState();

  const { library } = useWeb3React();

  useEffect(() => {
    const load = async () => {
      console.log("load.. stablecoin info..");

      // read-only
      const vaultContract = new ethers.Contract(
        vaultInfo.addr.rinkeby,
        vaultInfo.abi,
        library
      );

      setVault(vaultContract);
      if (vault) {
        // let bal = await token.balanceOf(props.account);
        // console.log("balance:" + bal);
        // let name = await token.name();
        // console.log("name:" + name);
        // setBalance(bal.toString());
        // setName(name);
      }
    };

    if (typeof props.account !== "undefined" && !vault) {
      load();
    }
  });

  return <div>Vault Section..</div>;
}

export default Vault;
