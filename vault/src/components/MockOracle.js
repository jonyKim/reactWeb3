import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { ethers } from "ethers";

import contractInfo from "../constant/MockOracle.json";

function MockOracle(props) {
  const [price, setPrice] = useState();
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

      console.log(tmp);
      setContract(tmp);
      if (tmp) {
        let value = await tmp.getLatestPrice();
        console.log("latestPrice: " + value);

        setPrice(value.toString());
      }
    };

    if (!contract) {
      load();
    }
  });

  return (
    <div>
      <div>MockOracle Section..</div>
      <div>Current Price : {price}</div>
      set price :<button>Submit</button>
    </div>
  );
}

export default MockOracle;
