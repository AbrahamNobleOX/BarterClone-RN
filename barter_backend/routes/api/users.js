const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// This file takes care of user registration

/* User model */
const User = require("../../models/User");

/* Generate a random number with the module inside utils */
const { getRandom } = require("../../helpers/utils");

// Post rqst for registration
router.post("/", (req, res) => {
    // res.send("Registered");
    const { name, email, phone, password, userRef } = req.body;

    /** Validate user details */
    if (!name || !email || !phone || !password) {
        return res
            .status(400)
            .json({ msg: "Please enter your name, email, password, & phone" });
    }

    /** Check if user exits */
    User.findOne({ email }).then((user) => {

        // If user Already Exists
        if (user) return res.status(400).json({ msg: "User Already Exists" });

        // Define newUser from value gotten from "User model" above
        const newUser = new User({
            name,
            email,
            phone,
            password,
            account_balance: getRandom(5),
            account_number: getRandom(11),
            userRef,
        });

        // ** Create salt for password & hash it
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {

                // If hashing returns error throw it
                if (err) throw err;

                // Define hash
                newUser.password = hash;

                // Log user detals if succesfull
                console.log(newUser);

                // If not error save user to database
                newUser.save().then((user) => {

                    // After saving, then assign the user signin token.
                    jwt.sign(
                        // Assign token based on the userId generated to each user by mongoose
                        { id: user.id },

                        // Get special key from config.env file linked to default.json inside config folder 
                        config.get("bartersecret"),

                        // Token expiry
                        { expiresIn: 3600 },

                        (err, token) => {
                            // If token is not created, throw error
                            if (err) throw err;

                            // If token is created sucessfully, then output json response for postman
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    phone: user.phone,
                                    account_balance: user.account_balance,
                                    account_number: user.account_number,
                                },
                            });
                        }
                    );
                });
            });
        });
    });

})

module.exports = router;