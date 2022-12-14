// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
const hre = require("hardhat");

function sleep(ms: any) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeting = "Hello, Hardhat!";
  const greeter = await Greeter.deploy(greeting);

  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);
  
  const WAIT_BLOCK_CONFIRMATIONS = 6
	await greeter.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS)

	await hre.run("verify:verify", {
		address: greeter.address,
		contract: "contracts/Greeter.sol:Greeter", //Filename.sol:ClassName
		constructorArguments: [greeting],
	})

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
