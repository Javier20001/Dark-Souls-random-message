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

// Calificar un mensaje
async function rateMessage(id, userId, rate, userIdSafe) {
  try {
    // Buscar el mensaje por ID
    const message = await Message.findById(id);
    if (!message) {
      const error = new Error("Message not found");
      error.statusCode = 404; // Código 404 si el mensaje no existe
      throw error;
    }

    // Verificar si el usuario ya calificó el mensaje
    if (IalredyRated(userId, message.rates)) {
      const error = new Error("User already rated this message");
      error.statusCode = 409; // Código de estado HTTP 409 (Conflict)
      throw error;
    }

    if (!comprovationId(userId, userIdSafe)) {
      const error = new Error("User not authorized to rate this message");
      error.statusCode = 401; // Código de estado HTTP 401 (Unauthorized)
      throw error;
    }

    // Agregar nueva calificación al array `rates`
    message.rates.push({
      ip_user: userId, // Almacena la IP del usuario
      rate: rate, // Almacena la calificación numérica
    });

    //sumar todos los rates y dividir por la cantidad de rates
    let sum = 0;
    message.rates.forEach((rate) => {
      sum += rate.rate;
    });
    let average = sum / message.rates.length;
    message.averageRate = average;

    // Guardar cambios en la base de datos
    await message.save();
    console.log("Rating added successfully");
  } catch (error) {
    console.error("Error in rateMessage:", error);
    if (!error.statusCode) error.statusCode = 500; // 🔹 Evita undefined en `statusCode`
    throw error; // 🔹 No sobrescribas el error, simplemente relánzalo
  }
}

function IalredyRated(ip, rates) {
  let rated = false;
  rates.forEach((rate) => {
    if (rate.ip_user === ip) {
      rated = true;
    }
  });
  return rated;
}

function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  return midnight - now;
}

function saveMessageAtMidnight() {
  if (getTimeUntilMidnight() === 0) {
    saveMessage();
  } else {
    console.log(
      "falta " + getTimeUntilMidnight() + " ms para guardar un mensaje"
    );
  }
}

function comprovationId(idUser, safeIdUser) {
  return idUser === safeIdUser;
}

// Guardar un mensaje cada 24 horas
setInterval(saveMessageAtMidnight, 60000); // 24 horas = 86,400,000 ms

module.exports = {
  generateRandomMessage,
  saveMessage,
  fetchMessageById,
  fetchMessages,
  fetchLatestMessage,
  rateMessage,
};
