import React, { useState } from 'react';
import './CheckInOut.css';

function CheckoutTable(props) {
    const hardware = props.hardware;

    const [credits, setCredit] = useState(props.credits);
    const [checkoutList, setList] = useState(new Array(hardware.length).fill(0));

    const availabilities = [100, 80, 70, 100, 0]; // temporary values
    /** TODO:
     * 1. constantly update availabilities
     * 2. dynamically display availabilities
     */

    const [inError, setInError] = useState(false);
    const [error, setError] = useState("");

    // check if input is within range and affordable
    // update checkoutlist
    const handleInput = index => event => {
        var input = parseInt(event.target.value);
        var diff = input - checkoutList[index];

        setInError(false);
        setError("");

        if(credits - diff < 0) { // check if there are enough credits
            event.target.value = checkoutList[index].toString();
            setInError(true);
            setError("You do not have enough credits.");
        } 
        else {    
            setCredit(credits - diff);

            let list = [...checkoutList];
            list[index] = input;
            setList(list);
        }
    }

    // creates form table
    function renderTable() {
        return hardware.map((hw, index) => {
            var disable = (availabilities[index] === 0);
            var max = (availabilities[index]).toString();

            return(
                <>
                <tr key={index}>
                    <td>HW Set {index + 1}</td>
                    <td>{hw}</td>
                    <td>
                        <input
                            type="number" 
                            className="hw-input"
                            min={"0"}
                            max={max}
                            defaultValue={"0"}
                            onChange={handleInput(index)}  
                            onKeyDown={(event) => {event.preventDefault();}}
                            disabled={disable}>
                        </input>
                        <label>/{max}</label>
                    </td>
                </tr>
                </>
            );
        })
    }

    return(
        <>
        <h3 className="io-heading">Hardware Check-Out</h3>
        <div className="check-table-container">
            <p className="check-text">
                You currently have&nbsp;
                <span className="hw-spanText">{credits.toString()}</span> 
                &nbsp;credits remaining for this project.
            </p>
            <table className="checked_table">
                <tbody>
                    <tr>
                        <td>Hardware</td>
                        <td>Current Amount</td>
                        <td>Check Out</td>
                    </tr>
                    {renderTable()}
                </tbody>
            </table>
            <p className={inError ? 'showError' : 'hideError'}>{error}</p>
        </div>
        </>
    );
}

export default CheckoutTable;