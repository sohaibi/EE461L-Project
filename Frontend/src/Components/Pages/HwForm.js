import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './HwForm.css';

// import components
import HwTable from '../HW_Table';
import CheckinTable from '../CheckinTable';
import CheckoutTable from '../CheckoutTable';

/** TODO 
 * generate hardware availabilities and capacities
 *  call @app.route('/hardware')
 * push requests to backend and refresh
*/

function HwForm(props) {
    /** Login Status and Redirect */
    useEffect(() => {
        console.log('login status updated', props.isLogin);
        console.log('userID updated', props.userID);

        if(!props.isLogin) {
            return <Redirect to='/login' />;
        }
    }, [props.isLogin, props.userID]);

    /** Part 1 Variables and Functions */
    // GET projects from backend
    const [projects, setProjects] = useState([]);
    const [id, setID] = useState(0);
    const [hardware, setHardware] = useState([]);
    const [credits, setCredits] = useState([]);
    const [projIndex, setProj] = useState(0);

    useEffect(() => {
        fetch('/check',
            {
                method: "GET",
                cache: 'default',
                credentials: 'include',
                withCredentials: true,
                headers: {
                    "content_type": "application/json",
                },
            }
        ).then(res => res.json()).then(data => {
            console.log(data);
            if (data.message === "success") {
                setProjects(data.projects);
            }
        }).catch((error) => {console.error(error);});
    }, [props.isLogin, props.userID]);

    // project selection
    const [disable1, setDisable1] = useState(false);

    const projectSelect = (event) => {
        var index = parseInt(event.target.value);
        setProj(index);
        setID(projects[index].id);
        setHardware(projects[index].hardware);
        setCredits(projects[index].credits);
    }

    // checkin and checkout selection
    const [checkin, setCheckin] = useState(false);
    const toggleCheckIn = () => setCheckin(!checkin);

    const [checkout, setCheckout] = useState(false);
    const toggleCheckOut = () => setCheckout(!checkout);

    const [disable2, setDisable2] = useState(false);
    const [alert, setAlert] = useState(false);
    const [displayIn, setDisplayIn] = useState(false);
    const [displayOut, setDisplayOut] = useState(false);

    function handlePart1() {
        if (checkin || checkout) {
            setDisable2(true);
            setDisplayIn(checkin);
            setDisplayOut(checkout);
            setAlert(false);
        } else {
            setAlert(true);
        }
    }

    /** Part 2 Functions */
    // confirmation function
    const [checkinList, setCIList] = useState([]);
    const [checkoutList, setCOList] = useState([]);

    // callback functions
    function handleCheckIn(childList) {
        setCIList(childList);
    }

    function handleCheckOut(childList) {
        setCOList(childList);
    }

    function handleConfirmation() {
        let updateList = new Array(checkinList.length).fill(0);

        var i;
        for(i=0; i<updateList.length; i++) {
            if(checkin) {
                updateList[i] += checkinList[i];
            }
            if(checkout) {
                updateList[i] -= checkoutList[i];
            }
        }

        /** TODO: 
         * 1. update hardware and project database with POST
         * 2. display confirmation notification after receiving success
         * 3. refresh page 
         */
        console.log(updateList);    
        fetch('/check',
            {
                method: "POST",
                cache: 'force-cache',
                credentials: 'include',
                withCredentials: true,
                headers: {
                    "content_type": "application/json",
                },
                body: JSON.stringify({
                    'id' : id,
                    'update': updateList,
                })
            }
        ).then(response => {
            return response.json()
        }).then(
            data => {
                console.log(data);
                if (data.message !== 'success') {
                    console.log("Success: " + data.message);
                } else {
                    console.log("Error: " + data);
                }
            }
        ).catch(
            (error) => {console.error(error);}
        );
    }


    return (
        <>
            <div id="hardware-container">
                <h1>Hardware Rental Services</h1>
                <div id="hardware-prompt">
                    <HwTable />

                    {/* First Form */}
                    <form id="hardware-form">
                        {/** Project Selection */}
                        <p id={(projects.length < 1)
                                ? "projectError"
                                : "hideError"
                            }>
                            Please create a project first.
                        </p>
                        <div className="hardware-form-el" 
                            id={(projects.length > 0) 
                                ? "project-select-div"
                                : "hide-project-select"
                            }>
                            <h3 id="hardware-form-header">Select Project</h3>
                            <select name="Projects"
                                className="select-el"
                                value={projIndex.toString()}
                                onChange={projectSelect}
                                disabled={disable1}>
                                {projects.map((proj, index) => {
                                    return (
                                        <>
                                            <option key={index.toString()} value={index}>
                                                {proj.name}
                                            </option>
                                        </>
                                    );
                                })}
                            </select>
                            <button className="hw-form-button"
                                id="select-button"
                                disabled={disable1}
                                onClick={() => setDisable1(true)}>
                                Next
                        </button>
                        </div>

                        {/** Checkin-out Selection */}
                        <div className="hardware-form-el"
                            id={disable1
                                ? "hw-answer-wrap"
                                : "hideBox"
                            }>
                            <p className="hw-form-prompts">
                                Are you checking in and/or checking out hardware?
                        </p>

                            <div className="hw-form-prompts" id="hw-checkboxes">
                                <input type="checkbox"
                                    id="inBox"
                                    onChange={toggleCheckIn}
                                    disabled={disable2} />
                                <label id="inBox-label"
                                    htmlFor="inBox">
                                    Checking In
                            </label>
                                <br></br>

                                <input type="checkbox"
                                    id="outBox"
                                    onChange={toggleCheckOut}
                                    disabled={disable2} />
                                <label id="outBox-label"
                                    htmlFor="outBox">
                                    Checking Out
                            </label>
                            </div>

                            {/* Error Text */}
                            <div id="errorDiv"
                                className="hw-form-prompts">
                                <p id=
                                    {alert
                                        ? 'showError'
                                        : 'hideError'
                                    }>
                                    You must select at least one option.
                            </p>
                            </div>

                            <button
                                className="hw-form-button"
                                id="part1-submit"
                                type="button"
                                onClick={() => handlePart1()}
                                disabled={disable2}>
                                Go
                        </button>
                        </div>
                    </form>

                    {/* Check In Form */}
                    <div id=
                        {displayIn
                            ? 'showCheckIn'
                            : 'hideCheckIn'
                        }
                        className="second-form">
                        <CheckinTable 
                            hardware={hardware}
                            handleList={handleCheckIn}
                        />
                    </div>

                    {/* Check Out Form */}
                    <div id=
                        {displayOut
                            ? 'showCheckOut'
                            : 'hideCheckOut'
                        }
                        className="second-form">
                        <CheckoutTable 
                            hardware={hardware}
                            credits={credits}
                            handleList={handleCheckOut}
                        />
                    </div>

                    {/* Confirmation Button  */}
                    <div id={
                        (displayOut || displayIn)
                            ? 'showCheckButton'
                            : 'hideCheckButton'}>
                        <button type="button"
                            className="hw-form-button"
                            onClick={() => handleConfirmation()}>Confirm</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HwForm;