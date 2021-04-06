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

    /** Part 1 Variables and Functions */
    // GET projects from backend
    const [isLogin, setIsLogin] = useState(props.isLogin);
    // const [userID, setUserID] = useState('');
    const [projects, setProjects] = useState([]);

    // parameters for the single project selected
    const [projIndex, setProjIndex] = useState(-1);

    const [HWSet_rent_list, setHWSet_rent_list] = useState([]);

    // const [credits, setCredits] = useState([]);

    const [confirmMessage, setconfirmMessage] = useState([]);

    // reload projects info once comfirmed, to keep value updated
    const [confirm, setConfirm] = useState(false);



    /** Login Status Synchronization*/
    useEffect(() => {
        console.log('login status updated', props.isLogin);
        setIsLogin(props.isLogin);
        // setUserID(props.setUserID);
    }, [props.isLogin]);

    // load projects & hardware info when mouted
    useEffect(() => {
        if (isLogin) {
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
                    if (data.projects.length > 0) {
                        // select the first project by default, use passed in parameter since setState is not updated immediately
                        var tempIdx = 0;
                        if (projIndex === -1 || projIndex === undefined) {
                            setProjIndex(0);


                        } else {
                            setProjIndex(projIndex);
                            tempIdx = projIndex;

                        }


                        setHWSet_rent_list(data.projects[tempIdx].hardware);
                        console.log("HWSet_dict updated");
                        // setCredits(data.projects[0].credits);
                    }
                }
            }).catch((error) => { console.error(error); });
        }
    }, [confirm]);




    // project selection
    const [disable1, setDisable1] = useState(false);

    const projectSelect = (event) => {
        var index = parseInt(event.target.value);
        // console.log(index);

        setProjIndex(index);

        setHWSet_rent_list(projects[index].hardware);

        // console.log(HWSet_dict);
        // setCredits(projects[index].credits);

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
        // console.log("received checkin list from child!")
    }

    function handleCheckOut(childList) {
        setCOList(childList);
        // console.log("received checkout list from child!")
    }

    function handleConfirmation() {
        let updateDict = {};// list of dict {HW_id: HW_changeNum}

        var i;
        for (i = 0; i < checkinList.length; i++) {
            updateDict[checkinList[i].HW_id] = checkinList[i].HW_changeNum;
        }
        for (i = 0; i < checkoutList.length; i++) {
            if (checkoutList[i].HW_id in updateDict) {
                updateDict[checkoutList[i].HW_id] -= checkoutList[i].HW_changeNum;
            } else {
                updateDict[checkoutList[i].HW_id] = -checkoutList[i].HW_changeNum;
            }
        }

        /** TODO: 
         * 1. update hardware and project database with POST
         * 2. display confirmation notification after receiving success
         * 3. refresh page 
         */
        console.log(updateDict);
        console.log(projects[projIndex]['id']);
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
                    "project_id": projects[projIndex]['id'],
                    "update": updateDict
                })
            }
        ).then(response => {
            return response.json()
        }).then(
            data => {
                console.log(data);
                if (data.message !== 'success') {
                    console.log(data);
                    setconfirmMessage(data.message + ' Here is the log file: ' + JSON.stringify(data.log));

                } else {
                    // const r = window.confirm("Do you really want to Sign Out?");
                    // console.log("Error: " + data);
                    // reload the data
                    setConfirm(!confirm);
                    // console.log(confirm);
                    setconfirmMessage("You have successfully checkin/checkout the hardware, redirect to project page...");

                    window.location.reload();
                    // return <Redirect to={{ pathname: "/hardware", isLogin=true }} />;

                }

            }
        ).catch(
            (error) => { console.error(error); }
        );
    }

    if (isLogin) {
        return (

            <>
                {/* <p>{JSON.stringify(HWSet_rent_list)}</p> */}
                <div id="hardware-container">
                    <h1>Hardware Rental Services</h1>
                    <HwTable HWSet_rent_list={HWSet_rent_list} project={projects[projIndex]} />
                    <div id="hardware-prompt">

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
                                    disabled={disable1}
                                    autocomplete="off">
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
                                HWSet_rent_list={HWSet_rent_list}
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
                                // credits={credits}
                                HWSet_rent_list={HWSet_rent_list}
                                handleList={handleCheckOut}
                            />
                        </div>
                        <p id='confirm_message'>{confirmMessage}</p>
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
    else {
        // console.log({ isLogin });
        return <Redirect to='/login' />;
    }


}
export default HwForm;