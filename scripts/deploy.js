const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Web3Blog = await hre.ethers.getContractFactory("Web3Blog");
  const web3blog = await Web3Blog.deploy("My Web3 Blog");

  await web3blog.deployed();
  console.log("Web3Blog deployed to:", web3blog.address);

  fs.writeFileSync('./config.js', `
  export const contractAddress = "${web3blog.address}"
  export const ownerAddress = "${web3blog.signer.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
