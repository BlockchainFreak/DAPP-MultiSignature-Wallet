import React, {useState} from "react";
import PopUp from "./PopUp";

export default function({txList, approveTx, accounts}) {
    const [trigger, setTrigger] = useState(-1);
    const closePop = () => {setTrigger(-1)};

    return(
        <div className="tx-display-box">
            <h2>Transaction History</h2>
            <table className="tx-display-table">
                <thead> 
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>To</th>
                        <th>Approvals</th>
                        <th>Status</th>
                        <th>Approve</th>
                    </tr>
                </thead>
                <tbody>
                    {txList.map(tx => {
                        return <tr key={tx.id}>
                            <td>{tx.id}</td>
                            <td>{tx.amount}</td>
                            <td>{tx.to}</td>
                            <td>{tx.approvals}</td>
                            <td>{tx.sent ? 'sent' : 'pending'}</td>
                            <td><button
                                className="approve-btn"
                                onClick={()=> setTrigger(tx.id)}
                                >Approve
                            </button></td>
                        </tr>
                    })}
                </tbody>
            </table>
            <PopUp
                approveTx={approveTx}
                accounts={accounts}
                trigger={trigger}
                closePop={closePop}
            />
        </div>
    );
}

