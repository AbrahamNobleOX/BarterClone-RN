const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
// const auth = require("../../middleware/auth");

// This file takes care of user login

/* User model */
const User = require("../../models/User");

// Post request for login
router.post("/", (req, res) => {
    const { email, password } = req.body;

    // Validate user login details
    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check if user with the email exists
    User.findOne({ email }).then((user) => {

        // If user does not Exist
        if (!user) return res.status(400).json({ msg: "User Does not exist" });

        // Validate password by hashing and then comparing inputed password with the hash in the db
        bcrypt.compare(password, user.password).then((isMatch) => {

            // If password doesn't match
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

            // If password matches, first assign a token for user, then print json for postman
            jwt.sign(

                // Assign token using the id for user
                { id: user.id },

                // Get special key from config.env file linked to default.json inside config folder 
                config.get("bartersecret"),

                // Token expiry
                { expiresIn: 3600 },

                (err, token) => {
                    // If token is not created, throw error
                    if (err) throw err;

                    // If token is created successfully, then output json response for postman
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

// router.get("/user", auth, (req, res) => {
//   User.findById(req.barterUser.id)
//     .select("-password")
//     .then((user) => res.json(user));
// });

module.exports = router;
