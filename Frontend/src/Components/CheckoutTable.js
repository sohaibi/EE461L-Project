import React, { useState, useEffect } from 'react';
import './CheckInOut.css';

function CheckoutTable(props) {
    const hardware = props.hardware;

    const [credits, setCredit] = useState(props.credits); 
    const [checkoutList, setList] = useState(new Array(hardware.length).fill(0));

    const [inError, setInError] = useState(false);
    const [error, setError] = useState("");

    /** Hardware Availabilities and Names */
    const [availabilities, setAvailabilities] = useState([]);
    const [HW_names, setHW_names] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/hardware').then(res => res.json()).then(data => {
                setAvailabilities(data.HW_ava);
                setHW_names(data.HW_name);
            }).catch((error) => {
                console.error(error);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

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
            props.handleList(list);
        }
    }

    // creates form table
    function renderTable() {
        return hardware.map((hw, index) => {
            var disable = (availabilities[index] === 0);
            var max = availabilities[index];

            return(
                <>
                <tr key={index}>
                    <td>{HW_names[index]}</td>
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