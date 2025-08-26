import { useCallback, useState } from "react";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import axios from "axios";

// TODO: add types

export function Welcome() {
    const [transactions, setTransactions] = useState([]);
    const [submiting, setIsSubmiting] = useState(false);

    const [formData, setFormData] = useState({
        amount: "",
        description: ""
    });

    const handleInputChange = useCallback((event) => {
        setFormData((state) => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    }, []);

    const handleSaveTransaction = useCallback(async (formData) => {
        // TODO: send to the backend
        try {
            const { data: transaction } = await axios.post(
                "http://localhost:3131/transactions",
                formData
            );

            setTransactions((t) => [...t, transaction]);
        } catch (error) {
            console.error(error);
        }

        setFormData({
            amount: "",
            description: ""
        });
    }, []);

    return (
        <main className="pt-16 pb-4">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSaveTransaction(formData);
                }}
            >
                <label> Amount </label>
                <input
                    name="amount"
                    required
                    type="number"
                    className="w-full border-1  mb-4"
                    value={formData.amount}
                    onChange={handleInputChange}
                />

                <label> Description </label>
                <input
                    name="description"
                    type="text"
                    required
                    className="w-full  border-1 mb-4"
                    value={formData.description}
                    onChange={handleInputChange}
                />

                <button className="mb-8" type="submit" disabled={submiting}>
                    {submiting ? "Submiting..." : "Submit"}
                </button>
            </form>

            <hr />

            {transactions.map((transaction) => (
                <>
                    <div className="p-4" key={transaction.description}>
                        <p> Descrition: {transaction.description} </p>
                        <p> Amount: {transaction.amount} </p>
                    </div>

                    <hr />
                </>
            ))}
        </main>
    );
}
