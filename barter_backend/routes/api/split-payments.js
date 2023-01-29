const express = require("express");
const router = express.Router();
const config = require("config");

// This file calculates the amount due to one or more split payment "entities" as well as the amount left after all splits have been computed.

// Post request for lannisterpay transactions
router.post("/", (req, res) => {
    const { ID, Amount, Currency, CustomerEmail } = req.body;
    const { SplitType, SplitValue, SplitEntityId } = req.body.SplitInfo;

    // Validate request parameters
    if (!ID || !Amount || !Currency || !CustomerEmail) {
        return res.status(400).json({ msg: "Please Enter All Fields" });
    }

    // Initialize the split entity
    var result = [];
    var flatSumArr = 0;
    var percentageSumArr = 0;
    var ratioSumArr = 0;

    // For loop for nested array
    for (var i = 0; i < req.body.SplitInfo.length; i++) {

        // Initialize the nested split entity by indexing
        splitTypeArr = req.body.SplitInfo[i].SplitType;
        splitValueArr = req.body.SplitInfo[i].SplitValue;
        splitEntityIdArr = req.body.SplitInfo[i].SplitEntityId;

        // Following the order of precedence for the SplitType
        if (splitTypeArr === "FLAT") {
            splitAmount = splitValueArr;
            flatSumArr += splitAmount;
            balance = req.body.Amount - flatSumArr;
        }

        if (splitTypeArr === "PERCENTAGE") {
            splitAmount = balance * (splitValueArr / 100);
            balance = balance - splitAmount;
            percentageSumArr += splitAmount;
        }

        if (splitTypeArr === "RATIO") {
            splitAmount = balance * (splitValueArr / 5);
            ratioSumArr += splitAmount;
        }

        totalSplitAmount = flatSumArr + percentageSumArr + ratioSumArr;
        remainingBalance = req.body.Amount - totalSplitAmount;

        // Making the sure the balance is not less than 0.
        if (remainingBalance < 0) {
            return res.status(400).json({ msg: "Invalid Summation of Split Values, Percentages and Ratios or Invalid Arrangement of Split Types." });
        }

        // Push split details to array inside the for loop
        result.push({
            SplitEntityId: splitEntityIdArr,
            Amount: splitAmount
        });

        console.log(splitAmount);

    }

    // JSON response
    res.json({
        ID: req.body.ID,
        Balance: remainingBalance,
        SplitBreakdown: [
            ...result
        ],
    });

});

// export router
module.exports = router;
