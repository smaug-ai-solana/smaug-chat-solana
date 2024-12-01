const dotenv = require("dotenv");
dotenv.config();

const solanaWeb3 = require("@solana/web3.js");
const { SystemProgram, LAMPORTS_PER_SOL } = require("@solana/web3.js");
const heliusTransactions = import("./heliusTransactions.mjs");

const RPC_ENDPOINT = process.env.HELIUS_RPC_URL;

const getKeypairFromSecret = (secretKeyHex) => {
  try {
    const secretKey = Uint8Array.from(Buffer.from(secretKeyHex, "hex"));
    const keypair = solanaWeb3.Keypair.fromSecretKey(secretKey);
    return keypair;
  } catch (error) {
    console.log({ error });
  }
};

const blockchain = {
  async checkBalance(publicKey) {
    try {
      const connection = new solanaWeb3.Connection(RPC_ENDPOINT, "confirmed");
      const balance = await connection.getBalance(
        new solanaWeb3.PublicKey(publicKey)
      );
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error("Error checking balance:", error);
      throw new Error(`Failed to check balance: ${error.message}`);
    }
  },

  async confirmTransaction(signature, maxRetries = 30) {
    const connection = new solanaWeb3.Connection(RPC_ENDPOINT, "confirmed");

    for (let i = 0; i < maxRetries; i++) {
      const confirmation = await connection.getSignatureStatus(signature);

      if (
        confirmation.value?.confirmationStatus === "confirmed" ||
        confirmation.value?.confirmationStatus === "finalized"
      ) {
        return true;
      }

      // Wait 2 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    throw new Error(
      `Transaction ${signature} failed to confirm after ${maxRetries} attempts`
    );
  },

  async sendTransaction(toAddress, amount) {
    try {
      const fromKeypair = getKeypairFromSecret(process.env.TEST_SECRET_KEY);
      const toPubkey = new solanaWeb3.PublicKey(toAddress);

      // Add minimum SOL check
      if (amount < 0.000001) {
        // Minimum transaction amount
        throw new Error("Amount too small to transfer");
      }

      const amountToSend = BigInt(Math.floor(amount * LAMPORTS_PER_SOL));

      console.log({
        sendingAmount: Number(amountToSend) / LAMPORTS_PER_SOL,
        lamports: amountToSend.toString(),
      });

      const instructions = [
        SystemProgram.transfer({
          fromPubkey: fromKeypair.publicKey,
          toPubkey: toPubkey,
          lamports: Number(amountToSend),
        }),
      ];

      const { sendHeliusTransaction } = await heliusTransactions;
      const transactionSignature = await sendHeliusTransaction(instructions, [
        fromKeypair,
      ]);

      return {
        success: true,
        signature: transactionSignature,
        amount: Number(amountToSend) / LAMPORTS_PER_SOL,
      };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  },
};

module.exports = blockchain;
