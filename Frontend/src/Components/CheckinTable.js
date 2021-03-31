import React, { useState } from 'react';
import './CheckInOut.css';

function CheckinTable(props) {
    const hardware = props.hardware;
    const [checkinList, setList] = useState(new Array(hardware.length).fill(0));

    // check if hardware is all 0s
    function checkHW() {
        var i;
        for(i=0; i<hardware.length; i++) {
            return false;;
        }

        return true;;
    }

    // check if input is within range and update checkinlist
    const handleInput = index => event => {
        var input = parseInt(event.target.value);
        let list = [...checkinList];
        list[index] = input;
        setList(list);
    };

    // creates form table
    function renderTable() {   
        return hardware.map((hw, index) => {
            if(hw > 0) {
                var max = hw.toString();

                return(
                    <>
                    <tr key={index.toString()}>
                        <td>HW Set {index + 1}</td>
                        <td>
                            <input
                                type="number" 
                                className="hw-input"
                                min={"0"}
                                max={max}
                                defaultValue={"0"}
                                onChange={handleInput(index)}
                                onKeyDown={(event) => {event.preventDefault();}}>
                            </input>
                            <label>/{max}</label>
                        </td>
                    </tr>
                    </>
                );
            } else {
                return(
                    <></>
                );
            }
        })
    }

    return(
        <>
        <h3 className="io-heading">Hardware Check-In</h3>
        <div className="check-table-container">
            <p className="check-text"
                id={!checkHW()
                    ? 'showPara'
                    : 'hidePara'
                }>
                You currently have&nbsp;
                <span className="hw-spanText">0</span> 
                &nbsp;hardware checked out.
            </p>
            <table className="checked_table"
                id={checkHW()
                    ? 'showTable'
                    : 'hideTable'
                }>
                <tbody>
                    <tr>
                        <td>Hardware</td>
                        <td>Check In</td>
                    </tr>
                    {renderTable()}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default CheckinTable;