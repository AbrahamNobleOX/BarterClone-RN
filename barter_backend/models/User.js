const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema which seems like defining variables that is needed
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    account_balance: {
        type: Number,
        required: true,
    },
    account_number: {
        type: Number,
        required: true,
    },
    register_date: {
        type: Date,
        default: Date.now,
    },
    userRef: {
        type: String,
        default: "",
    },
});

module.exports = User = mongoose.model("user", UserSchema);
