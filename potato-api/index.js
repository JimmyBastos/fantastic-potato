import express, { Router } from "express";

const APP_PORT = 3131;

const app = express();

app.use(express.json());

const transactions = [];

app.post("/transactions", (req, res) => {
    const { amount, description } = req.body;

    if (!amount || !description) {
        return res.status(422).json({
            message: "Invalid amount or description!"
        });
    }

    const transaction = { id: Date.now(), amount, description };

    transactions.push(transaction);

    return res.status(201).json(transaction);
});

app.get("/transactions/:id", (req, res) => {
    const { id } = req.params;

    const transaction = transactions.find((t) => t.id == id);

    if (!transaction) {
        return res.status(404).json({
            message: "Transaction not found!"
        });
    }

    return res.status(201).json(transaction);
});

app.listen(APP_PORT, () => {
    console.log("Server started at port:", APP_PORT);
});
