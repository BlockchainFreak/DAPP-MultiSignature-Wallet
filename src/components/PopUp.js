import React from "react";
import ReactDOM from "react-dom";

// props.trigger
// props.setTrigger
// props.accounts array
export default function PopUp(props) {

    if(props.trigger < 0)
        return null;
    
    return ReactDOM.createPortal(
        <section>
        <div className="overlay"
            onClick={props.closePop}
        />
        <div className="popup">
            <h2>Approve Transaction from these accounts</h2>
            <ul>
                {props.accounts.map((item) => {
                    return(
                        <li>
                            <button className="address-btn"
                                onClick={()=>props.approveTx(props.trigger, item)}
                            >
                                {item}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <button 
                className="close-portal-btn"
                onClick={props.closePop}>
                Close
            </button>
        </div>
        </section>,
        document.getElementById('portal')
    )

}