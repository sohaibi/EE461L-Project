import React, { useState, useEffect } from 'react';
import './CheckInOut.css';

function CheckoutTable(props) {


    // const [credits, setCredit] = useState(props.credits); 
    const [checkoutList, setCheckoutList] = useState([]);
    const [HWSet_use_dict, setHWSet_use_dict] = useState({});
    // const [inError, setInError] = useState(false);
    // const [error, setError] = useState("");

    // /** Hardware Availabilities, Names and ids */
    const [availabilities, setAvailabilities] = useState([]);
    const [HW_names, setHW_names] = useState([]);
    const [HW_ids, setHW_ids] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/hardware').then(res => res.json()).then(data => {
                setAvailabilities(data.HW_ava);
                setHW_names(data.HW_name);
                setHW_ids(data.HW_id);
            }).catch((error) => {
                console.error(error);
            });
        }, 1000);
        return () => clearInterval(interval);

    }, []);

    useEffect(() => {
        // initialize the checkoutList
        
        if (HW_names.length > 0 && HW_ids.length > 0 && availabilities.length > 0 && checkoutList.length != availabilities.length) {
            let list = [];
            for (var i = 0; i < HW_names.length; i++) {
                list.push({
                    "HW_id": HW_ids[i],
                    "HW_name": HW_names[i],
                    "HW_changeNum": 0
                });
            }
            console.log("initialized checkout list", list);
            // console.log(checkoutList);

            setCheckoutList(list);
            // console.log("initialized checkout list", list);


        }

    }, [availabilities]);


    useEffect(() => {
        // get all the checkin HW infos
        console.log("making dict of {HW_id: current_in_use}");
        // console.log("list updated!");

        // initialize the return list
        let temp = {};
        if (props.HWSet_rent_list !== undefined){ //add undefined condition for jest testing
            for (var i = 0; i < props.HWSet_rent_list.length; i++) {
                temp[props.HWSet_rent_list[i].HW_id] = props.HWSet_rent_list[i].HW_use;
            }
        }   
        setHWSet_use_dict(temp);
        console.log("initialized current in use dict", temp);

    }, [props.HWSet_rent_list]);

    // check if input is within range and affordable
    // update checkoutlist
    const handleInput = index => event => {
        var input = parseInt(event.target.value);
        let list = [...checkoutList];
        list[index].HW_changeNum = input;

        setCheckoutList(list);
        // console.log(list);
        props.handleList(list);



        /*will implement credit in phase 3*/
        // var diff = input - checkoutList[index];

        // setInError(false);
        // setError("");

        // if(credits - diff < 0) { // check if there are enough credits
        //     event.target.value = checkoutList[index].toString();
        //     setInError(true);
        //     setError("You do not have enough credits.");
        // } 
        // else {    
        //     setCredit(credits - diff);

        //     let list = [...checkoutList];
        //     list[index] = input;
        //     setList(list);
        //     props.handleList(list);
        // }

    }

    // // creates form table
    function renderTable() {
        return HW_names.map((hw, index) => {
            var disable = (availabilities[index] === 0);
            var max = availabilities[index];

            return (
                <>
                    <tr key={index}>
                        <td>{HW_names[index]}</td>
                        <td>{HWSet_use_dict[HW_ids[index]] > 0 ? HWSet_use_dict[HW_ids[index]] : 0}</td>
                        <td >
                            <input
                                data-testid="outArrow"
                                type="number"
                                className="hw-input"
                                min={"0"}
                                max={max}
                                defaultValue={"0"}
                                onChange={handleInput(index)}
                                onKeyDown={(event) => { event.preventDefault(); }}
                                disabled={disable}
                                data-testid="test_arrow">
                            </input>
                            <label  data-testid="outArrow" >/{max}</label>
                        </td>
                    </tr>
                </>
            );
        })
    }

    return (
        <>
            {/* <p>{JSON.stringify(checkoutList)}</p> */}
            {/* <p>{(checkoutList.length === 0).toString()}</p> */}
            {/* {JSON.stringify(props)} */}
            <h3 className="io-heading">Hardware Check-Out</h3>
            <div className="check-table-container">
                {/* <p className="check-text">
                You currently have&nbsp;
                <span className="hw-spanText">{credits.toString()}</span> 
                &nbsp;credits remaining for this project.
            </p> */}
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
                {/* <p className={inError ? 'showError' : 'hideError'}>{error}</p> */}
            </div>
        </>
        // "checkout nothing"
    );
}

export default CheckoutTable;