// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require("fs");

async function main() {

  const PlatziFood = await hre.ethers.getContractFactory("PlatziFood");
  const platziFood = await PlatziFood.deploy();

  await platziFood.deployed();

  console.log("PlatziFood deployed to:", platziFood.address);

  let config = `
  export const abiPlatziFoodAddress = "${platziFood.address}"
  `;

  let data = JSON.stringify(config);
  fs.writeFileSync("../config.js", JSON.parse(data));

  fs.copyFile(
    './artifacts/contracts/PlatziFood.sol/PlatziFood.json', 
    '../utils/abi/PlatziFood.json', 
    (err) => {
      if (err) {
        console.log("Error ocurred: ", err);
      }
    }
  );
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });