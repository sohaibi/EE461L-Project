import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

/* Pages and Components */
import HwTable from '../HW_Table';

/** TODO
 *  - if user is signed in, direct to page to checkout datasets
 */

function Home() {

    /* Timeline Interaction */
    const par1 = "The idea of WIRE was created and project-planing began.";
    const par2 = "Our team submitted the plan, which included stakeholders' needs and the user stories.";
    const par3 = "We began developing the app using combination of Flask and React.";
    const par4 = "Our first draft of the website was completed and we began revising for the second.";
    const par5 = "The final version was completed and deployed.";

    const [desc, setDesc] = useState("");
    const noClick = () => setDesc("");
    const janClick = () => setDesc(par1);
    const febClick = () => setDesc(par2);
    const marClick = () => setDesc(par3);
    const aprClick = () => setDesc(par4);
    const mayClick = () => setDesc(par5);

    /** Hardware Checkout 
     * If user is logged in, redirect to hardware page
     * Else, redirect to login page 
    */
    // TODO: method to determine if user is logged in 
    const isUser = true;
    var hwLink = "/login";

    if (isUser) {
        hwLink = "/hardware";
    } else {
        hwLink = "/login";
    }

    return (
        <>
            <div id="home_container">
                {/* About Website information */}
                <div className="home_content" id="home_about">
                    <h1>WIRE</h1>
                    <p>WIRE (<b>W</b>orking in <b>R</b>emote <b>E</b>nvironments) is a
                proof-of-concept app created by five college students at the University
                of Texas at Austin.
                </p>

                    <br /> <br />

                    {/* Timeline */}
                    <p>Notable Dates, 2021</p>
                    <div id="timeline">
                        <div id="timeNodes">
                            <div className="time_node"
                                onMouseEnter={janClick}
                                onMouseLeave={noClick}>
                                <p>JAN</p>
                            </div>
                            <div className="time_edge"></div>
                            <div className="time_node"
                                onMouseEnter={febClick}
                                onMouseLeave={noClick}>
                                <p>FEB</p>
                            </div>
                            <div className="time_edge"></div>
                            <div className="time_node"
                                onMouseEnter={marClick}
                                onMouseLeave={noClick}>
                                <p>MAR</p>
                            </div>
                            <div className="time_edge"></div>
                            <div className="time_node"
                                onMouseEnter={aprClick}
                                onMouseLeave={noClick}>
                                <p>APR</p>
                            </div>
                            <div className="time_edge"></div>
                            <div className="time_node"
                                onMouseEnter={mayClick}
                                onMouseLeave={noClick}>
                                <p>MAY</p>
                            </div>
                        </div>
                        <p id="time_desc">{desc}</p>
                    </div>

                </div>

                {/* Hardware Availability */}
                <div className="home_content" id="home_hw">
                    <h1>Available Equipment</h1>
                    <p>Our state-of-the-art equipment are available for researchers to borrow.
                    Sign-in to gain access and connect your project.
                    We have provided datasets to test the hardware with.
                </p>

                    <div id="tableContainer">
                        <HwTable />
                        <h4>Sign in now to check out the hardware.</h4>
                        <Link to={hwLink} id="homeCheckout">
                            <button type="button" id="checkout">Check Out</button>
                        </Link>
                    </div>

                </div>

                {/* Team Information */}
                <div className="home_content" id="home_team">
                    <h1>About Us</h1>
                    <div id="profile-container">
                        <div className="profile">
                            <div className="profile-pic">
                                <div className="profile-linked"
                                    onClick={() => window.open("https://www.linkedin.com/", "_blank")} />
                            </div>
                            <div className="profile-desc">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.
                                Lacus laoreet non curabitur gravida arcu. </p>
                            </div>
                        </div>

                        <div className="profile">
                            <div className="profile-desc">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.
                                Lacus laoreet non curabitur gravida arcu. </p>
                            </div>
                            <div className="profile-pic">
                                <div className="profile-linked"
                                    onClick={() => window.open("https://www.linkedin.com/", "_blank")} />
                            </div>
                        </div>

                        <div className="profile">
                            <div className="profile-pic">
                                <div className="profile-linked"
                                    onClick={() => window.open("https://www.linkedin.com/", "_blank")} />
                            </div>
                            <div className="profile-desc">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.
                                Lacus laoreet non curabitur gravida arcu. </p>
                            </div>
                        </div>

                        <div className="profile">
                            <div className="profile-desc">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.
                                Lacus laoreet non curabitur gravida arcu. </p>
                            </div>
                            <div className="profile-pic">
                                <div className="profile-linked"
                                    onClick={() => window.open("https://www.linkedin.com/", "_blank")} />
                            </div>
                        </div>

                        <div className="profile">
                            <div className="profile-pic">
                                <div className="profile-linked"
                                    onClick={() => window.open("https://www.linkedin.com/", "_blank")} />
                            </div>
                            <div className="profile-desc">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.
                                Lacus laoreet non curabitur gravida arcu. </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;