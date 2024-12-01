const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const gameController = require("../controllers/gameController");
const logger = require("../utils/logger");
const {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
} = require("@solana/web3.js");

// Get all messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await gameController.getAllMessages();
    res.json(messages);
  } catch (error) {
    logger.error("Error getting messages:", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
});

// Get game statistics
router.get("/stats", async (req, res) => {
  try {
    const stats = await gameController.getStats();
    res.json(stats);
  } catch (error) {
    logger.error("Error getting stats:", error);
    res.status(500).json({ error: "Failed to get stats" });
  }
});

router.get("/winners", async (req, res) => {
  try {
    const winners = await gameController.getWinners();
    res.json(winners);
  } catch (error) {
    logger.error("Error getting winners:", error);
    res.status(500).json({ error: "Failed to get winners" });
  }
});

// Send a message
router.post("/message", auth, async (req, res) => {
  try {
    const { content, walletAddress } = req.body;
    const privyId = req.user.sub;

    const aiResponse = await gameController.sendMessage(
      privyId,
      walletAddress,
      content
    );
    res.json({ success: true, response: aiResponse });
  } catch (error) {
    logger.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

router.post("/create-transaction", async (req, res) => {
  try {
    const { senderAddress, amount } = req.body;

    const connection = new Connection(process.env.HELIUS_RPC_URL, "confirmed");

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(senderAddress),
        toPubkey: new PublicKey(process.env.PLATFORM_ADDRESS),
        lamports: amount,
      })
    );

    const { blockhash } = await connection.getLatestBlockhash("confirmed");
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = new PublicKey(senderAddress);

    // Serialize the transaction
    const serializedTransaction = transaction
      .serialize({
        requireAllSignatures: false,
      })
      .toString("base64");

    res.json({ serializedTransaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
