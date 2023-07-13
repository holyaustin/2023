const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const GameToken = await hre.ethers.getContractFactory("GameToken");
  const gameToken = await GameToken.deploy("Lucky Game Token", "LGT");
  await gameToken.deployed();
  console.log("gameToken Contract deployed to:", gameToken.address);

  const LuckyGame = await hre.ethers.getContractFactory("LuckyGame");
  const luckyGame = await LuckyGame.deploy(gameToken.address);
  await luckyGame.deployed();
  console.log("luckyGame Contract deployed to:", luckyGame.address);

  fs.writeFileSync('./config.js', `
  export const gameTokenAddress = "${gameToken.address}"
  export const luckyGameAddress = "${luckyGame.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


