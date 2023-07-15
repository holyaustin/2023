import React, { useState, useContext } from "react";
import { useRouter } from 'next/router'
//import Winner from "./winner";
import { ethers } from "ethers";
import Loader from "./Loader";
import TransactionProvider from "../../context/TransactionContext";
import {
  luckySevenGameAbi,
  luckyGameAddress,
  providerUrl
} from "../../utils/constants";

import { useAddress } from "@thirdweb-dev/react";

const Dice = () => {
  const navigate = useRouter();
  const address = useAddress();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [loading, setLoading] = useState(false);
  const [executed, setExecuted] = useState(false);
  const {
    approved,
    setApproved,
    transfer,
    transferFrom,
    updateGameToken,
    selectedOption,
    setBetAmount,
    betAmount
  } = useContext(TransactionProvider);

  const spin = async () => {
    let rnd = 0,
      rnd2 = 0,
      rnd3 = 0,
      rnd4 = 0,
      rnd5 = 0,
      rnd6 = 0,
      rnd7 = 0,
      rnd8 = 0,
      rndNew = 0,
      rnd2New = 0,
      rnd3New = 0,
      rnd4New = 0,
      rnd5New = 0,
      rnd6New = 0,
      rnd7New = 0,
      rnd8New = 0;
    let x, y, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, x8, y8;

    while (rndNew === rnd) {
      rndNew = Math.floor(Math.random() * 6 + 1);
    }
    rnd = rndNew;

    while (rnd2New === rnd2) {
      rnd2New = Math.floor(Math.random() * 6 + 1);
    }
    rnd2 = rnd2New;

    while (rnd3New === rnd3) {
      rnd3New = Math.floor(Math.random() * 6 + 1);
    }
    rnd3 = rnd3New;

    while (rnd4New === rnd4) {
      rnd4New = Math.floor(Math.random() * 6 + 1);
    }
    rnd4 = rnd4New;

    while (rnd5New === rnd5) {
      rnd5New = Math.floor(Math.random() * 6 + 1);
    }
    rnd5 = rnd5New;

    while (rnd6New === rnd6) {
      rnd6New = Math.floor(Math.random() * 6 + 1);
    }
    rnd6 = rnd6New;

    while (rnd7New === rnd7) {
      rnd7New = Math.floor(Math.random() * 6 + 1);
    }
    rnd7 = rnd7New;

    while (rnd8New === rnd8) {
      rnd8New = Math.floor(Math.random() * 6 + 1);
    }
    rnd8 = rnd8New;

    setLoading(true);

    let betResult = 0;
    const total = rnd + rnd2 + rnd3 + rnd4 + rnd5 + rnd6 + rnd7 + rnd8;


    let tx;
    if ((total == 20) || (total == 23)) {
      const amt = betAmount * 3;
      tx = await transfer(ethers.utils.parseEther(amt.toString()));
    } else if ((total == 22) || (total == 23)) {
      const amt = betAmount * 1;
        tx = await transfer(ethers.utils.parseEther(amt.toString()));
    } else {
      tx = await transferFrom(ethers.utils.parseEther(betAmount.toString()));
    }

    setTimeout(() => {
      setExecuted(true);
      setLoading(false);
    }, 1000);


    switch (rnd) {
      case 1:
        x = 720;
        y = 810;
        break;
      case 6:
        x = 720;
        y = 990;
        break;
      default:
        x = 720 + (6 - rnd) * 90;
        y = 900;
        break;
    }

    switch (rnd2) {
      case 1:
        x2 = 720;
        y2 = 810;
        break;
      case 6:
        x2 = 720;
        y2 = 990;
        break;
      default:
        x2 = 720 + (6 - rnd2) * 90;
        y2 = 900;
        break;
    }

    switch (rnd3) {
      case 1:
        x3 = 720;
        y3 = 810;
        break;
      case 6:
        x3 = 720;
        y3 = 990;
        break;
      default:
        x3 = 720 + (6 - rnd3) * 90;
        y3 = 900;
        break;
    }

    switch (rnd4) {
      case 1:
        x4 = 720;
        y4 = 810;
        break;
      case 6:
        x4 = 720;
        y4 = 990;
        break;
      default:
        x4 = 720 + (6 - rnd4) * 90;
        y4 = 900;
        break;
    }

    switch (rnd5) {
      case 1:
        x5 = 720;
        y5 = 810;
        break;
      case 6:
        x5 = 720;
        y5 = 990;
        break;
      default:
        x5 = 720 + (6 - rnd5) * 90;
        y5 = 900;
        break;
    }

    switch (rnd6) {
      case 1:
        x6 = 720;
        y6 = 810;
        break;
      case 6:
        x6 = 720;
        y6 = 990;
        break;
      default:
        x6 = 720 + (6 - rnd6) * 90;
        y6 = 900;
        break;
    }

    switch (rnd7) {
      case 1:
        x7 = 720;
        y7 = 810;
        break;
      case 6:
        x7 = 720;
        y7 = 990;
        break;
      default:
        x7 = 720 + (6 - rnd7) * 90;
        y7 = 900;
        break;
    }

    switch (rnd8) {
      case 1:
        x8 = 720;
        y8 = 810;
        break;
      case 6:
        x8 = 720;
        y8 = 990;
        break;
      default:
        x8 = 720 + (6 - rnd8) * 90;
        y8 = 900;
        break;
    }

    document.querySelector(".dice1").style.transform =
      "translateZ(-100px) rotateY(" + x + "deg) rotateX(" + y + "deg)";
      document.querySelector(".dice2").style.transform =
      "translateZ(-100px) rotateY(" + x2 + "deg) rotateX(" + y2 + "deg)";
      document.querySelector(".dice3").style.transform =
      "translateZ(-100px) rotateY(" + x3 + "deg) rotateX(" + y3 + "deg)";
       document.querySelector(".dice4").style.transform =
         "translateZ(-100px) rotateY(" + x4 + "deg) rotateX(" + y4 + "deg)";
    document.querySelector(".dice5").style.transform = "translateZ(-100px) rotateY(" + x5 + "deg) rotateX(" + y5 + "deg)";
    document.querySelector(".dice6").style.transform = "translateZ(-100px) rotateY(" + x6 + "deg) rotateX(" + y6 + "deg)";
    document.querySelector(".dice7").style.transform = "translateZ(-100px) rotateY(" + x7 + "deg) rotateX(" + y7 + "deg)";
    document.querySelector(".dice8").style.transform = "translateZ(-100px) rotateY(" + x8 + "deg) rotateX(" + y8 + "deg)";
    await delay(5000);
    
    // outputing user feedback
  if (total <= 19) {
    alert("Your Total score is " + total + "\nYou did not win");
   
  } else if ((total == 20)  || (total == 23)) {
      const amt = betAmount * 3;
    //alert("You WON!!!, You got back 3x of your Bet. Try Again.");
    alert("Your Total score is " + total + "\nCONGRATULATIONS!!! \nYou WON!!!, You got back 3x of your Bet");
    Winner();

  } else if ((total== 21) || (total== 22) ) {
      const amt = betAmount * 1;
    alert("Your Total score is " + total +"\nYou did not Lose, You got back your Bet. Try Again.");
    Winner();
  } else if (total >= 24) {
    alert("Your Total score is " + total + "\nYou did not win");

  } else {
    alert("Your Total score is " + total + "\nYou did not win");
  }
    
    
    
  };

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const refreshTokens = async () => {
    setApproved(false);
    try {
      await updateGameToken(address);
    } catch (error) {}
  };

  const Winner = () => {
    navigate.push('/win');
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-1/2 h-2/3  text-white pt-1 bg-gradient-to-r from-gray-500 to-gray-900 rounded-2xl justify-end text-right">
          {executed ? (
            <button
              onClick={refreshTokens}
              className="p-1 rounded-sm m-3 bg-red-400 text-{#44253e}"
            >
              X
            </button>
          ) : (
            <div onClick={() => setApproved(false)} className="p-1 m-3 ">
              &nbsp;
            </div>
          )}
          <div className="text-center items-center">
            <div className="flex justify-center gap-20 m-10">
              <div id="dice" className="dice1">
                <div className="side one">
                  <span className="dot"></span>
                </div>
                <div className="side two">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side three">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side four">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side five">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side six">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>

              <div id="dice2" className="dice2">
                <div className="side one">
                  <span className="dot"></span>
                </div>
                <div className="side two">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side three">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side four">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side five">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side six">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>

              <div id="dice3" className="dice3">
                <div className="side one">
                  <span className="dot"></span>
                </div>
                <div className="side two">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side three">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side four">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side five">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side six">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>

              <div id="dice4" className="dice4">
                <div className="side one">
                  <span className="dot"></span>
                </div>
                <div className="side two">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side three">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side four">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side five">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side six">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="flex justify-center gap-20 m-10">
              <div id="dice5" className="dice5">
                <div className="side one">
                  <span className="dot"></span>
                </div>
                <div className="side two">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side three">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side four">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side five">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side six">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>

              <div id="dice6" className="dice6">
                <div className="side one">
                  <span className="dot"></span>
                </div>
                <div className="side two">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side three">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side four">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side five">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side six">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>

              <div id="dice7" className="dice7">
                <div className="side one">
                  <span className="dot"></span>
                </div>
                <div className="side two">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side three">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side four">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side five">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side six">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>

              <div id="dice8" className="dice8">
                <div className="side one">
                  <span className="dot"></span>
                </div>
                <div className="side two">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side three">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side four">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side five">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side six">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {!loading && !executed && (
                <button
                  className="cursor-pointer px-3 py-2 m-3 items-center flex-col rounded-full my-5 border-2  "
                  onClick={spin}
                >
                  Roll the Dice
                </button>
              )}

              {loading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dice;
