const {
  generateRandomMessage,
  fetchLatestMessage,
  fetchMessages,
  saveMessage,
  rateMessage,
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

async function newMessage(req, res) {
  try {
    const messages = await saveMessage();
    res.json(messages);
  } catch (error) {
    console.error("Error save messages:", error);
    res.status(500).send("Server error");
  }
}

async function updateMessageRateById(req, res) {
  try {
    const { id } = req.params;
    const { rate } = req.body;
    const ip = req.ip;

    if (!id || !rate) {
      return res.status(400).send({ error: "ID and rate are required" });
    }

    await rateMessage(id, ip, rate);

    return res.status(200).send({ message: "Rated successfully" });
  } catch (error) {
    console.error("Error updating message rate:", error);
    const statusCode = error.statusCode || 500; // 🔹 Evita `undefined`
    res.status(statusCode).send({ error: error.message || "Server error" });
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
  newMessage,
  updateMessageRateById,
};
