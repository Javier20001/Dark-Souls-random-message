/**
 * Express router for handling message-related routes.
 *
 * @module routes/messageRoute
 */

const express = require("express");
const {
  getRandomMessage,
  sendServerMessage,
  getMessages,
  getLastMessage,
} = require("../controllers/messageController");

const router = express.Router();

/**
 * Route to get a random message.
 * @name get/message
 * @function
 * @memberof module:routes/messageRoute
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get("/message", getRandomMessage);

/**
 * Route to get all messages.
 * @name get/messages
 * @function
 * @memberof module:routes/messageRoute
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get("/messages", getMessages);

/**
 * Route to get the last message.
 * @name get/last-message
 * @function
 * @memberof module:routes/messageRoute
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get("/last-message", getLastMessage);
/**
 * Route to check the server status.
 * @name get/
 * @function
 * @memberof module:routes/messageRoute
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get("/", sendServerMessage);

module.exports = router;
