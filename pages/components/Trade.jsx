import React, { useState, useContext, useEffect } from "react";
import TransactionProvider from "../../context/TransactionContext";
import { useNetwork } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
// import { useToken } from "@thirdweb-dev/react";
import {
  // priceConsumerV3Abi,
  // priceConsumerV3Address,
  luckySevenGameAbi,
  luckyGameAddress,
  providerUrl
} from "../../utils/constants";

console.log("luckyGameAddress", luckyGameAddress)

const Trade = () => {
  const { trading, setTrading, updateGameToken, gameToken } =
    useContext(TransactionProvider);
  const network = useNetwork();
  const [LGTTokenPrice, setLGTTokenPrice] = useState(0);
  const [xdcToken, setXdcToken] = useState(0);
  const [LGTToken, setLGTToken] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const address = useAddress();

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      let balance = await provider.getBalance(address);
      balance = Math.round(ethers.utils.formatEther(balance) * 1e4) / 1e4;
      setTokenBalance(balance);
      updateXrcToken(10);
    })();
  }, [address]);

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
/**
      const priceConsumerV3 = new ethers.Contract(
        priceConsumerV3Address,
        priceConsumerV3Abi,
        provider
      );
 */
      let roundData = 1;
      // roundData = Math.round((roundData / 1000000) * 1e2) / 1e2;
      console.log("roundData", roundData);
      setLGTTokenPrice(roundData);
      console.log("xdcToken", xdcToken);
      setLGTToken((Math.round(roundData * xdcToken) * 1e4) / 1e4);
    })();
  }, [tokenBalance]);

  const updateLGTToken = (val) => {
    setLGTToken(val);
    setXdcToken(Math.round((val / LGTTokenPrice) * 10000) / 10000);
  };

  const updateXrcToken = (val) => {
    setXdcToken(val);
    setLGTToken(Math.round(LGTTokenPrice * val * 10000) / 10000);
  };

  const buyToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const luckySevenGame = new ethers.Contract(
      luckyGameAddress,
      luckySevenGameAbi,
      provider.getSigner()
    );
    await luckySevenGame.buyToken(ethers.utils.parseEther(LGTToken.toString()), {
      from: address,
      value: ethers.utils.parseEther(xdcToken.toString()),
      gasLimit: 3000000
    });

    alert("You have successfully purchased your LGT game token ");
    console.log("You have successfully purchased your LGT game token ");
  };

  return (
    <div className="content-center justify-center">
      <div className="flex justify-between pb-3">
        <span className="text-xl">Swap</span>
        <span className="cursor-pointer" onClick={() => setTrading(false)}>
          X
        </span>
      </div>
      <div className="rounded flex justify-between bg-slate-50 p-3 border-2">
        <input
          type="text"
          className="border-1 text-xl"
          value={xdcToken}
          onChange={(e) => updateXrcToken(e.target.value)}
        />
        <div className="bg-slate-200 w-40 p-1 shadow-md rounded">
          <select className="bg-slate-200 w-full">
            <option value="XDC" defaultValue={true}>
              XDC
            </option>
          </select>
        </div>
      </div>
      <div className="rounded flex justify-between bg-slate-50 p-3 ">
        <div></div>
        <div
          className="cursor-pointer"
          onClick={() => updateXrcToken(tokenBalance)}
        >
          Balance: {tokenBalance}
          {tokenBalance != xdcToken && (
            <span className="ml-2 text-xs px-2 bg-red-300 rounded-lg">Max</span>
          )}
        </div>
      </div>

      <div className="rounded flex justify-center bg-slate-50 "></div>

      <div className="rounded flex justify-between bg-slate-50 p-3 mt-2 border-2">
        <input
          type="text"
          className="border-0 text-xl"
          value={LGTToken}
          onChange={(e) => updateLGTToken(e.target.value)}
        />
        <div className="bg-slate-200 w-40 p-1 shadow-md rounded">LGT Token</div>
      </div>
      <div className="rounded flex justify-between bg-slate-50 p-3">
        <div></div>
        <div>Balance: {gameToken}</div>
      </div>

      <div className="rounded flex justify-start  p-3 mt-2">
        <span>1 XDC = {LGTTokenPrice} LGT</span>
      </div>

      {tokenBalance >= xdcToken ? (
        <div
          className="rounded-2xl flex justify-center bg-red-500 hover:bg-red-400 p-3 mt-2 text-2xl text-white cursor-pointer"
          onClick={buyToken}
        >
          Swap
        </div>
      ) : (
        <div className="rounded-2xl flex justify-center bg-gray-300 p-3 mt-2">
          Insufficient liquidity for this trade
        </div>
      )}
    </div>
  );
};

export default Trade;
