const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
const data = require("./dark_souls_messages.json");
const base = data.phrases.base;
const characters = data.phrases.categories.characters;
const objects = data.phrases.categories.objects;
const locations = data.phrases.categories.locations;
const actions = data.phrases.categories.actions;
const listWords = [characters, objects, locations, actions];

// Ruta para obtener el JSON
app.get("/messages", (req, res) => {
  try {
    let rValue = base[Math.floor(Math.random() * base.length)];
    console.log(rValue);
    if (rValue.indexOf("****") !== -1) {
      const randPosition = Math.floor(Math.random() * listWords.length);
      const randPostionCategory = Math.floor(
        Math.random() * listWords[randPosition].length
      );
      rValue = rValue.replace(
        "****",
        listWords[randPosition][randPostionCategory]
      );
    }

    res.json({ message: rValue });
  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    res.status(500).send("Error del servidor");
  }
});

// Ruta para verificar que el servidor está funcionando
app.get("/", (req, res) => {
  res.send("Servidor de mensajes de Dark Souls está en funcionamiento!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
