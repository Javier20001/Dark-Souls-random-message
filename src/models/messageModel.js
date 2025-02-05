const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  ip_user: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  rates: [rateSchema], // Usa el esquema directamente aquí
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
