import React, { useState } from 'react';
import './HwForm.css';

// import components
import HwTable from '../HW_Table';
import CheckinTable from '../CheckinTable';
import CheckoutTable from '../CheckoutTable';

function HwForm() {
    /** TODO: establish connection and organize list of projects */
    const projects = [
        {
            name: 'My First Project',
            hardware: [20,30,40,10,5],
            credits: 80
        },
        {
            name: 'NASA Internship',
            hardware: [2,1,0,1,0],
            credits: 224
        },
        {
            name: 'Research Project',
            hardware: [0,0,0,0,0],
            credits: 350
        }
    ]; 


    /** Part 1 Variables and Functions */
    // project selection
    const [projIndex, setProj] = useState(0);
    const [disable1, setDisable1] = useState(false);

    const projectSelect = (event) => {
        var index = parseInt(event.target.value);
        setProj(index);
    }

    // checkin-out checkboxes
    const [checkin, setCheckin] = useState(false);
    const toggleCheckIn = () => setCheckin(!checkin);

    const [checkout, setCheckout] = useState(false);
    const toggleCheckOut = () => setCheckout(!checkout);

    const [disable2, setDisable2] = useState(false);
    const [alert, setAlert] = useState(false);
    const [displayIn, setDisplayIn] = useState(false);
    const [displayOut, setDisplayOut] = useState(false);


    function handlePart1() {
        if(checkin || checkout) {
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
    const handleConfirmation = () => {
        // TODO: check if either lists are empty 

        if(checkin) {
            /** TODO: 
             * 1. get list of hardware being checked in
             * 2. update hardware database
             */
        }
        if(checkout) {
           /** TODO: 
             * 1. get list of hardware being checked out
             * 2. update hardware and project database
             */
        }

        /** TODO: 
         * 1. display confirmation notification
         * 2. refresh page 
         */ 
    }

    return(
        <>
        <div id="hardware-container">
            <h1>Hardware Rental Services</h1>
            <div id="hardware-prompt">
                <HwTable /> 
                
                {/* First Form */}
                <form id="hardware-form">
                    {/** Project Selection */}
                    <div className="hardware-form-el" id="project-select-div">
                        <h3 id="hardware-form-header">Select Project</h3>
                        <select name="Projects" 
                            className="select-el"
                            value={projIndex.toString()}
                            onChange={projectSelect}
                            disabled={disable1}>
                            {projects.map((proj, index) => {
                                return(
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
                                disabled={disable2}/>
                            <label id="inBox-label" 
                                htmlFor="inBox">
                                    Checking In
                            </label>
                            <br></br>

                            <input type="checkbox" 
                                id="outBox"
                                onChange={toggleCheckOut}
                                disabled={disable2}/>
                            <label id="outBox-label" 
                                htmlFor="outBox">
                                    Checking Out
                            </label>
                        </div>

                        {/* Error Text */}
                        <div id="errorDiv"
                            className="hw-form-prompts">
                            <p id = 
                                {alert 
                                    ? 'showError'
                                    : 'hideError'
                                }>
                                You must select at least one option.
                            </p>
                        </div>

                        <button  
                            className = "hw-form-button"
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
                            hardware={projects[projIndex].hardware}/>
                </div>

                {/* Check Out Form */}
                <div id=
                    {displayOut 
                        ? 'showCheckOut' 
                        : 'hideCheckOut' 
                    }
                    className="second-form">
                        <CheckoutTable
                            hardware={projects[projIndex].hardware} 
                            credits={projects[projIndex].credits}/>
                </div>

                {/* Confirmation Button  */}
                <div id={
                    (displayOut || displayIn) 
                        ? 'showCheckButton'
                        : 'hideCheckButton'}>
                    <button type="button" 
                        className="hw-form-button"
                        onClick={() => handleConfirmation}>Confirm</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default HwForm;