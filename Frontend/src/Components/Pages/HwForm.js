import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './HwForm.css';

// import components
import HwTable from '../HW_Table';
import CheckinTable from '../CheckinTable';
import CheckoutTable from '../CheckoutTable';

/** TODO 
 * generate dataset availabilities
 * generate capacities
 * push requests to backend
 * allow option to refresh (?)
*/

function HwForm(props) {
    // check login status and user id
    const [isLogin, setIsLogin] = useState(props.isLogin);
    const [userID, setUserID] = useState(props.userID);

    /** Part 1 Functions/Variables */
    const [checkin, setCheckin] = useState(false);
    const toggleCheckIn = () => setCheckin(!checkin);

    const [checkout, setCheckout] = useState(false);
    const toggleCheckOut = () => setCheckout(!checkout);

    const [disable, setDisable] = useState(false);
    const [alert, setAlert] = useState(false);
    const [displayIn, setDisplayIn] = useState(false);
    const [displayOut, setDisplayOut] = useState(false);

    // synchronize with App.js's login status
    useEffect(() => {
        console.log('login status updated', props.isLogin);
        console.log('userID updated', props.userID);
        setUserID(props.userID)
        setIsLogin(props.isLogin)
    }, [props.isLogin, props.userID])




    function handlePart1() {
        if (checkin || checkout) {
            setDisable(true);
            setDisplayIn(checkin);
            setDisplayOut(checkout);
            setAlert(false);
        } else {
            setAlert(true);
        }
    }

    /** Part 2 Functions */
    if (isLogin) {
        return (
            <>

                <div id="hardware-container">
                    <h1>Hardware Rental Services</h1>
                    <div id="hardware-prompt">
                        <HwTable />

                        {/* First Form */}
                        <form id="hardware-form">
                            <p className="hardware-form-el">Are you checking in and/or checking out hardware?</p>

                            <div className="hardware-form-el" id="hw-answer-wrap">
                                <input type="checkbox"
                                    id="inBox"
                                    onChange={toggleCheckIn}
                                    disabled={disable} />
                                <label id="inBox-label" htmlFor="inBox">Checking In</label>
                                <br />

                                <input type="checkbox"
                                    id="outBox"
                                    onChange={toggleCheckOut}
                                    disabled={disable} />
                                <label id="outBox-label" htmlFor="outBox">Checking Out</label>
                            </div>

                            {/* Error Text */}
                            <div className="hardware-form-el" id="errorDiv">
                                <p id=
                                    {alert
                                        ? 'showError'
                                        : 'hideError'
                                    }>
                                    You must select at least one option.
                            </p>
                            </div>

                            <button className="hardware-form-el"
                                id="part1-submit"
                                type="button"
                                onClick={handlePart1}
                                disabled={disable}>
                                Go
                        </button>
                        </form>

                        {/* Check In Form */}
                        <div id=
                            {displayIn
                                ? 'showCheckIn'
                                : 'hideCheckIn'
                            }
                            className="second-form">
                            <CheckinTable />
                        </div>

                        {/* Check Out Form */}
                        <div id=
                            {displayOut
                                ? 'showCheckOut'
                                : 'hideCheckOut'
                            }
                            className="second-form">
                            <CheckoutTable />
                        </div>

                        {/* Confirmation Button  */}
                        <div id={
                            (displayOut || displayIn)
                                ? 'showCheckButton'
                                : 'hideCheckButton'}>
                            <button type="button" className="check_submit">Confirm</button>
                        </div>
                    </div>
                </div>
            </>
        );

    } else {
        return <Redirect to='/login' />;
    }


}

export default HwForm;