const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  ip_user: {
    type: String,
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
  averageRate: {
    type: Number,
    default: 0,
  },
  rates: [rateSchema], // Usa el esquema directamente aquí
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
