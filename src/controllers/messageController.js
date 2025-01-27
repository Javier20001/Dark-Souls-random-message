const { generateRandomMessage } = require("../services/messageService");

function getRandomMessage(req, res) {
  try {
    const message = generateRandomMessage();
    res.json({ message });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Server error");
  }
}

function sendServerMessage(req, res) {
  res.send("Dark Souls Messages Server is running!");
}

module.exports = { getRandomMessage, sendServerMessage };
