import React from 'react';
import './Home.css';

/* Pages and Components */
import HW_Table from '../Components/HW_Table';

function Home() {

    /* TODO: get hardware availabilities */

    return(
        <>
        <div id="home_container">
            {/* About Website information */}
            <div className="home_content" id="home_about">
                <h1>WIRE</h1>
                <p>WIRE (<b>W</b>orking in <b>R</b>emote <b>E</b>nvironments) is a 
                proof-of-concept app created for educational purposes only.</p>
            </div>

            {/* Hardware Availability */}
            <div className="home_content" id="home_hw">
                <h1>Hardware</h1>

                <div id="tableContainer">
                    <HW_Table />
                </div>

            </div>

            {/* Team Information */}
            <div className="home_content" id="home_team">
                <h1>The Team</h1>
            </div>
        </div>
        </>
    );
}

export default Home;