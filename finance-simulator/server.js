const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// Serve frontend files
app.use(express.static('public'));

// POST /simulate API
app.post('/simulate', (req, res) => {
    const { current_balance, credit_limit, action } = req.body;

    let new_balance = current_balance;

    // Action logic
    if (action.type === "spend") {
        new_balance += action.amount;
    } 
    else if (action.type === "repay") {
        new_balance -= action.amount;
        if (new_balance < 0) new_balance = 0;
    }

    // Utilization
    let new_utilization = new_balance / credit_limit;

    let risk;
    let interest_impact;

    if (new_utilization < 0.3) {
        risk = "Low";
        interest_impact = "Low interest impact";
    } 
    else if (new_utilization < 0.7) {
        risk = "Medium";
        interest_impact = "Higher risk of interest accumulation";
    } 
    else {
        risk = "High";
        interest_impact = "Very high interest risk";
    }

    res.json({
        new_balance,
        new_utilization,
        risk,
        interest_impact
    });
});

// Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});