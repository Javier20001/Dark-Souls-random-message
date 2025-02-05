const express = require("express");
const cors = require("cors");
const messageRoutes = require("./src/routes/messageRoute");
const connectDB = require("./src/config/db");
require("dotenv").config({ path: "./src/config/.env" });

const app = express();

// Middleware para manejar JSON
app.use(express.json());
app.use(cors());

connectDB();

// Rutas
app.use("/", messageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

module.exports = app;
