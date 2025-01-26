const express = require("express");
const fs = require("fs");
const data = require("./dark_souls_messages.json");

const app = express();
const PORT = 3000;

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

// Ruta para obtener un mensaje aleatorio
app.get("/message", (req, res) => {
  try {
    let rValue = base[Math.floor(Math.random() * base.length)];
    if (rValue.indexOf("****") !== -1) {
      let randPosition = randomPositionFunction();
      rValue = rValue.replace(
        "****",
        listWords[randPosition][randomPositionCategory(randPosition)]
      );
    }

    let boolean = Math.floor(Math.random() * 2);
    console.log(boolean);
    if (boolean === 1) {
      let randPosition = randomPositionFunction();
      rValue =
        rValue +
        " " +
        conjugation[Math.floor(Math.random() * conjugation.length)] +
        " " +
        listWords[randPosition][randomPositionCategory(randPosition)];
    }

    res.json({ message: rValue });
  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    res.status(500).send("Error del servidor");
  }
});

// Ruta para verificar el estado del servidor
app.get("/", (req, res) => {
  res.send("Servidor de mensajes de Dark Souls está en funcionamiento!");
});

// Exportar la instancia de la aplicación para pruebas
module.exports = app;

// Iniciar el servidor solo si este archivo se ejecuta directamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

function randomPositionFunction() {
  const randPosition = Math.floor(Math.random() * listWords.length);
  return randPosition;
}

function randomPositionCategory(randPosition) {
  const randPositionCategory = Math.floor(
    Math.random() * listWords[randPosition].length
  );
  return randPositionCategory;
}
