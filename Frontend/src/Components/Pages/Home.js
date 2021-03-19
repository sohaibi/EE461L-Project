import React from 'react';
import './Home.css';

/* Pages and Components */
import HwTable from '../HW_Table';

/** TODO
 *  - if user is signed in, direct to page to checkout datasets
 */

function Home() {

    return(
        <>
        <div id="home_container">
            {/* About Website information */}
            <div className="home_content" id="home_about">
                <h1>WIRE</h1>
                <p>WIRE (<b>W</b>orking in <b>R</b>emote <b>E</b>nvironments) is a 
                proof-of-concept app created for educational purposes only.</p>

                <br/> <br />

                {/* Timeline */}
                <p>Notable Dates, 2021</p>
                <div id="timeline">
                    <div class="time_node">
                        <p>JAN</p>
                    </div>
                    <div class="time_edge"></div>
                    <div class="time_node">
                        <p>FEB</p>
                    </div>
                    <div class="time_edge"></div>
                    <div class="time_node">
                        <p>MAR</p>
                    </div>
                </div>
                <p class="time_desc">
                    January 2021: The idea of WIRE was created and project-
                    planing began.
                </p>
                <p class="time_desc">
                    February 2021: Our team submitted the plan, which 
                    included stakeholders' needs and the user stories. 
                </p>
                <p class="time_desc">
                    March 2021: We received permission to begin creating the
                    app. 
                </p>
            </div>

            {/* Hardware Availability */}
            <div className="home_content" id="home_hw">
                <h1>Equipment Availability</h1>

                <div id="tableContainer">
                    <HwTable />
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