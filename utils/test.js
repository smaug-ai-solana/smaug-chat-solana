const blockchain = require("./blockchain");
let completed = false;
const test = async () => {
  const gameWalletBalancePlatform = await blockchain.checkBalance(
    process.env.PLATFORM_ADDRESS
  );
  const transactionPlatform = await blockchain.sendTransaction(
    process.env.PLATFORM_ADDRESS,
    gameWalletBalancePlatform
  );
  console.log(gameWalletBalancePlatform);
  console.log(transactionPlatform);
  completed = true;
};

const retry = 10;

for (let i = 0; i < retry; i++) {
  if (completed) {
    break;
  }
  test();
}
