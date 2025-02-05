const {
  generateRandomMessage,
  fetchLatestMessage,
  fetchMessages,
} = require("../services/messageService");

function getRandomMessage(req, res) {
  try {
    const message = generateRandomMessage();
    res.json({ message });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Server error");
  }
}

async function getMessages(req, res) {
  try {
    const messages = await fetchMessages();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Server error");
  }
}

async function getLastMessage(req, res) {
  try {
    const messages = await fetchLatestMessage();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Server error");
  }
}

function sendServerMessage(req, res) {
  res.send("Dark Souls Messages Server is running!");
}

module.exports = {
  getRandomMessage,
  sendServerMessage,
  getMessages,
  getLastMessage,
};
