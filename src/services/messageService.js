const data = require("../data/dark_souls_messages.json");
const {
  randomPositionFunction,
  randomPositionCategory,
} = require("../utils/randomUtil");
const Message = require("../models/messageModel");
// Cargar datos desde el JSON
const base = data.phrases.base;
const characters = data.phrases.categories.characters;
const objects = data.phrases.categories.objects;
const geography = data.phrases.categories.geography;
const actions = data.phrases.categories.actions;
const orientation = data.phrases.categories.orientation;
const body_part = data.phrases.categories.body_part;
const attribute = data.phrases.categories.attribute;
const concepts = data.phrases.categories.concepts;
const conjugation = data.phrases.categories.conjugation;

const listWords = [
  characters,
  objects,
  geography,
  actions,
  orientation,
  body_part,
  attribute,
  concepts,
];

// Generar un mensaje aleatorio
function generateRandomMessage() {
  let rValue = base[Math.floor(Math.random() * base.length)];
  if (rValue.indexOf("****") !== -1) {
    let randPosition = randomPositionFunction(listWords);
    rValue = rValue.replace(
      "****",
      listWords[randPosition][randomPositionCategory(randPosition, listWords)]
    );
  }

  let boolean = Math.floor(Math.random() * 2);
  if (boolean === 1) {
    let randPosition = randomPositionFunction(listWords);
    rValue =
      rValue +
      " " +
      conjugation[Math.floor(Math.random() * conjugation.length)] +
      " " +
      listWords[randPosition][randomPositionCategory(randPosition, listWords)];
  }

  console.log(rValue);
  return rValue;
}

// Guardar un nuevo mensaje
async function saveMessage() {
  const text = generateRandomMessage();
  const message = new Message({ text });
  await message.save();
}

// Buscar un mensaje por ID
async function fetchMessageById(id) {
  const message = await Message.findById(id);
  return message;
}

// Buscar todos los mensajes
async function fetchMessages() {
  const messages = await Message.find();
  return messages;
}

// Buscar el último mensaje
async function fetchLatestMessage() {
  const latestMessage = await Message.findOne().sort({ _id: -1 });
  return latestMessage;
}

// Guardar un mensaje cada 24 horas
setInterval(saveMessage, 86400);

module.exports = {
  generateRandomMessage,
  saveMessage,
  fetchMessageById,
  fetchMessages,
  fetchLatestMessage,
};
