import React, {useState} from "react";

export default function NewTransaction(props) {

    const createTransaction = props.createTransaction;  

    const [transaction, setTransaction] = useState({});

    const updateTransaction = event => {
        const {name, value} = event.target;
        setTransaction({...transaction, [name]: value});
        console.log(transaction)
    }

    const submitTransaction = e => {
        e.preventDefault();
        createTransaction(transaction);
    }

    const inputs = ['amount', 'from', 'to'];
    return(
        <div className="newTransactionForm">
            <h2>Create a New Transaction</h2>

            <form>
                {inputs.map((item) => {
                    return(
                        <div className="tx-new-input">
                            <label htmlFor={item} className="tx-submit-input">
                            {item}
                            </label>
                            <input
                            className="tx-submit-input"
                            id={item}
                            name={item}
                            type="text"
                            onChange={updateTransaction}
                            defaultValue='0'
                            />
                        </div>
                    )
                })}
                <button
                    className="submit-btn"
                    onClick={submitTransaction}
                >
                    Submit Transaction
                </button>
            </form>
        </div>
    )
}