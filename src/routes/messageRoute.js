const express = require("express");
const {
  getRandomMessage,
  sendServerMessage,
} = require("../controllers/messageController");

const router = express.Router();

// Ruta para obtener un mensaje aleatorio
router.get("/message", getRandomMessage);

// Ruta para verificar el estado del servidor
router.get("/", sendServerMessage);

module.exports = router;
