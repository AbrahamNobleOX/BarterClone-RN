const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
    amount: { type: Number, required: true },
    account_number: { type: Number, required: true },
    purpose: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
});

module.exports = User = mongoose.model("transactions", TransactionSchema);
