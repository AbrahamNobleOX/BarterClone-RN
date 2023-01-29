const uuid = require("uuid");

/* Schema */
const Trx = require("../models/Transactions");
const User = require("../models/User");

module.exports = (app, io, db) => {
    io.on("connection", function (socket) {

        // console.log("Socket.io Connected..");

        //* Join Transactions *//
        socket.on("joinService", ({ roomID }) => {
            socket.join(roomID);
            console.log("Socket.io Worked..")
        });

        // Mange send Actions
        socket.on("send", ({ amount, account_number, purpose, sender, roomID }, callback) => {
            // Find User & Update receiver account balance
            User.findOne({ account_number }).then((user) => {
                if (!user) return callback({ error: "Sorry Not Permitted" });

                // Get user account balance and add the value
                const account_balance = user.account_balance + amount;
                User.findOneAndUpdate(
                    { account_number },
                    { $set: { account_balance } },
                    { new: true },
                    (err) => {
                        if (err) return callback({ error: "Not updated" });

                        //   Update the sender's account balance.
                        User.findOne({ email: sender }).then((sentBy) => {
                            const newSenderBalance = sentBy.account_balance - amount;

                            User.findOneAndUpdate(
                                { account_number: sentBy.account_number },
                                {
                                    $set: { account_balance: +newSenderBalance },
                                },
                                { new: true },
                                () => {
                                    // Broadcast to roomID -> used for alert purpose
                                    socket.broadcast.to(roomID).emit("moneySent", {
                                        amount,
                                        purpose,
                                        user,
                                        receiver: user.email,
                                        sender,
                                    });
                                }
                            );
                        });
                    }
                );
            });

            // Add activity to transactions
            //   new Trx({
            //     amount,
            //     account_number,
            //     purpose,
            //     user,
            //   }).save();
        }
        );
    });
};
