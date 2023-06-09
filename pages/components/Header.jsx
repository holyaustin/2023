import React, { useContext, useEffect } from "react";
import TransactionProvider from "../../context/TransactionContext";
import switchNetwork from "../../utils/switchNetwork";

import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
  useTokenBalance
} from "@thirdweb-dev/react";
import Image from "next/image";

import ImgCoins from "../assets/coins4.jpg";
import shortenAddress from "../../utils/shortenAddress";

const Header = () => {
  // const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  // const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();
  const { gameToken, updateGameToken, setCurrentAccount } =
    useContext(TransactionProvider);

  console.log("ADDRESS:", address);

  useEffect(() => {
    if (!address) return;

    (async () => {
      await updateGameToken(address);
    })();
  }, [address]);

  if (!address) {
    return (
      <>
   
        <div className="bg-red-800 opacity-85 fixed w-full h-full z-50 grid grid-cols-1 content-center">
          <h1 className="text-center text-4xl font-bold text-gradient pb-4">
            2023 GAMES
          </h1>
            <img src="/images/2023.jpg" className= "justify-center w-1/2 mx-auto" />

          <div className="text-center text-white">
            <div className="p-1">Please connect to play this game.</div>

            <div className="p-2">
              <button
                className="text-black cursor-pointer rounded-full px-14 py-5 space-x-2 bg-lime-300 text-2xl font-bold"
                onClick={() => connectWithMetamask()}
              >
                PLAY
              </button>
            </div>
          </div>
        </div>
   
      </>
    );
  }

  if (address && network[0].data.chain.id != 80001) {
    return (
      <>
        <div className="bg-black opacity-85 fixed w-full h-full z-50 grid grid-cols-1 content-center">
          <h1 className="text-center text-4xl font-bold text-gradient pb-4">
            20 23 Games
          </h1>
          <div className="text-center text-white">
            <div className="p-1">
              You are connected to network {network[0].data.chain.name}
            </div>
            <div className="p-1">
              Please switch to Polygon Testnet Mumbai to play this game.
            </div>

            <div className="p-2">
              <button
                className="text-black cursor-pointer rounded-full px-3 py-1 space-x-2 bg-lime-200"
                onClick={() => switchNetwork("PolygonTestnetMumbai", "0x13881")}
              >
                Switch to Mumbai Testnet
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <nav className="pt-3 flex flex-row bg-black">
        <div
          className="text-slate-300 px-3 flex items-center cursor-pointer"
          onClick={async () => await updateGameToken(address)}
        >
          <Image src={ImgCoins} alt="" />
          Token balance: {gameToken}
        </div>


        <a href="https://buy.bitcoin.com/verse/" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>
              <button className="font-bold mx-5 bg-red-800 text-white text-base rounded p-2 shadow-lg">
                Buy Verse Token
              </button>
              </a>


        <div className="ml-auto py-2 px-4">
          {!address && (
            <button
              className="py-1 px-5 mx-4 rounded-full cursor-pointer hover:bg-slate-600 border-2 border-text-gradient text-white"
              onClick={() => connectWithMetamask()}
            >
              PLAY
            </button>
          )}

          {address && (
            <>
              <h1 className="pr-7 mx-4 rounded-full cursor-pointer hover:bg-black flex items-center border-2 border-text-gradient text-white">

                <div className="pl-3" onClick={disconnectWallet}>
                  {/** {network[0].data.chain && network[0].data.chain.id} */}
                  {shortenAddress(address)}
                </div>
              </h1>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
