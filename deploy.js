const { ethers, JsonRpcProvider, utils } = require("ethers");
// const solc = require("solc")
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  // First, compile this!
  // And make sure to have your ganache network up!
  // The old way can be seen below:
  // let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  // On ether 6 and above, you should use like this
  // let provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  let provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  // let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  // let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet = wallet.connect(provider);

  //The code below helps us read our contract abi and binary
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  // the code below helps us to to creae a Contrac Factory, in etherJs a contract factory
  // is an object used to deploy contracts
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  //this code helps to actually deploy to the blockchain
  const contract = await contractFactory.deploy();

  // const blockNumber = await provider.getBlockNumber();
  // const myBalance = await provider.getBalance(
  //   "0xb5C381376766D919e4F7c53446adF9B571dc738c"
  // );
  // //const userFriendlyBalance = ethers.utils.formatEther(myBalance);
  // const signer = await provider.getSigner();

  // console.log(blockNumber);
  // console.log(myBalance);
  // console.log(signer);

  //the code below tells us how many block we want to wait for the contract to get
  //actually attached to the blockchain
  //const deploymentReceipt = await contract.deployTransaction.wait(1); //version 5
  // const deploymentReceipt = await contract.waitForDeployment("1"); //version 6
  // console.log(deploymentReceipt);

  //this code below helps send a transaction someone wants to make to the blockchain
  // const sentTxResponse = await wallet.sendTransaction(tx);

  // console.log(sentTxResponse);

  /*
  // const contract = await contractFactory.deploy({ gasPrice: 100000000000 })
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log(`Contract deployed to ${contract.address}`);
  // console.log("Here is the transaction:")
  // console.log(contract.deployTransaction)
  // console.log("Here is the receipt:")
  // const nonce = await wallet.getTransactionCount()
  

  // Additionally, there is a v,r,and s variable that ethers handles for us.
  // This is the signature of the transaction.
  // There is a lot of math going on with those values, but that's how it's gaurenteed that the transaction is signed!
  // https://ethereum.stackexchange.com/questions/15766/what-does-v-r-s-in-eth-gettransactionbyhash-mean

  // }
  // There is also a v, r, and s component of the transaction that Ethers will handle for us.
  // It's these three components that make up the cryptographic signature.
  // We won't go into this, because it's a lot of math.

  // console.log("Let's deploy another! Please wait...")
  // let resp = await wallet.signTransaction(tx)
  // const sentTxResponse = await wallet.sendTransaction(tx);
  // console.log(resp)

 
  console.log(`Current Favorite Number: ${currentFavoriteNumber}`);
  console.log("Updating favorite number...");
  let transactionResponse = await contract.store(7);
  let transactionReceipt = await transactionResponse.wait();
  currentFavoriteNumber = await contract.retrieve();
  console.log(`New Favorite Number: ${currentFavoriteNumber}`); */
  let currentFavoriteNumber = await contract.retrieve();
  console.log(`current Favorite Number: ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  const updatedFavouriteNumber = await contract.retrieve();
  console.log(`Updated Favourite Number is: ${updatedFavouriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// synchronous [solidity]
// asynchronous [javascript]

// cooking
// Synchronous
// 1. Put popcorn in microwave -> Promise
// 2. Wait for popcorn to finish
// 3. Pour drinks for everyone

// Asynchronous
// 1. Put popcorn in the mircrowave
// 2. Pour drinks for everyone
// 3. Wait for popcorn to finish

// Promise
// Pending
// Fulfilled
// Rejected
