import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { ethers } from "ethers";

import contractInfo from "../constant/PriceConsumer.json";

function PriceConsumer(props) {
  const [name, setName] = useState();
  const [balance, setBalance] = useState();
  const [contract, setContract] = useState();

  const { library } = useWeb3React();

  useEffect(() => {
    const load = async () => {
      console.log("load.. contract info..");

      // read-only
      const tmp = new ethers.Contract(
        contractInfo.addr.rinkeby,
        contractInfo.abi,
        library
      );

      setContract(tmp);
      if (contract) {
      }
    };

    if (typeof props.account !== "undefined" && !contract) {
      load();
    }
  });

  return <div>PriceConsumer Section..</div>;
}

export default PriceConsumer;
