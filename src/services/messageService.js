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

  // Reemplazar "****" con una palabra aleatoria de una categoría
  if (rValue.includes("****")) {
    let randPosition = randomPositionFunction(listWords);
    rValue = rValue.replace(
      "****",
      listWords[randPosition][randomPositionCategory(randPosition, listWords)]
    );
  }

  // Agregar conjugación y palabra adicional con 50% de probabilidad
  if (Math.random() < 0.5) {
    let randPosition = randomPositionFunction(listWords);
    rValue +=
      " " +
      conjugation[Math.floor(Math.random() * conjugation.length)] +
      " " +
      listWords[randPosition][randomPositionCategory(randPosition, listWords)];
  }

  console.log(rValue);
  return rValue;
}

// Guardar un nuevo mensaje en la base de datos
async function saveMessage() {
  const text = generateRandomMessage();
  const message = new Message({ text });
  await message.save();
}

// Buscar un mensaje por ID
async function fetchMessageById(id) {
  return await Message.findById(id);
}

// Obtener todos los mensajes
async function fetchMessages() {
  return await Message.find();
}

// Obtener el último mensaje guardado
async function fetchLatestMessage() {
  return await Message.findOne().sort({ _id: -1 });
}

// Calificar un mensaje
async function rateMessage(id, userId, rate, userIdSafe) {
  try {
    const message = await Message.findById(id);
    if (!message) {
      throw Object.assign(new Error("Message not found"), { statusCode: 404 });
    }

    // Verificar si el usuario ya ha calificado el mensaje
    if (IalredyRated(userId, message.rates)) {
      throw Object.assign(new Error("User already rated this message"), {
        statusCode: 409,
      });
    }

    // Verificar si el usuario está autorizado para calificar el mensaje
    if (!comprovationId(userId, userIdSafe)) {
      throw Object.assign(
        new Error("User not authorized to rate this message"),
        { statusCode: 401 }
      );
    }

    // Agregar la calificación al mensaje
    message.rates.push({ ip_user: userId, rate });
    message.totalRates = message.rates.length;
    await message.save();
  } catch (error) {
    console.error("Error in rateMessage:", error);
    throw error;
  }
}

// Verificar si un usuario ya ha calificado un mensaje
function IalredyRated(ip, rates) {
  return rates.some((rate) => rate.ip_user === ip);
}

// Calcular el tiempo restante hasta la medianoche en Argentina (UTC-3)
function getTimeUntilMidnight() {
  const now = new Date();
  const argentinaMidnight = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    3, // 3 AM UTC es medianoche en Argentina
    0,
    0,
    0
  );

  if (now.getUTCHours() >= 3) {
    argentinaMidnight.setUTCDate(argentinaMidnight.getUTCDate() + 1);
  }

  return argentinaMidnight - now;
}

// Programar la generación de un nuevo mensaje a la medianoche en Argentina
function scheduleMidnightMessage() {
  setTimeout(async () => {
    await saveMessage();
    scheduleMidnightMessage(); // Reprogramar para la próxima medianoche
  }, getTimeUntilMidnight());
}

// Comprobar si dos IDs coinciden
function comprovationId(idUser, safeIdUser) {
  return idUser === safeIdUser;
}

// Iniciar la programación para guardar un mensaje a medianoche en Argentina
scheduleMidnightMessage();

module.exports = {
  generateRandomMessage,
  saveMessage,
  fetchMessageById,
  fetchMessages,
  fetchLatestMessage,
  rateMessage,
};
