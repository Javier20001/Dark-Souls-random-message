const express = require("express");
const messageRoutes = require("./src/routes/messageRoute");
require("dotenv").config({ path: "./src/config/.env" });

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use("/", messageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

module.exports = app;
