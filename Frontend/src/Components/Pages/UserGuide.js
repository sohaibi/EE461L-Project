import React from 'react';
import '../../App.css';
import './UserGuide.css';

export default function Link1() {
    return (
<div id="home_container">
                {/* About Website information */}
                <div className="home_content" id="home_about">
                    <h1>User Guide</h1>
                    <p>Welcome to WIRE powderless! WIRE (Working in Remote Environments) is a proof-of-concept app created by 
                        five college students at the University of Texas at Austin.Our app will allow you to checkin and checkout
                        hardware with us for project use. Each of our webpage is composed of the header, the page content, 
                        and the footer.
                    </p>

                    <br /> <br />

                </div>

                {/* Hardware Availability */}
                <div className="home_content" id="home_hw">
                    <h1 id="smaller_h1">Web Structure</h1>
                    <p><b>Header:</b> Our header consists of a navigation bar to the <i>Home Page</i>,  
                     the <i>Userguide Page</i>, the <i>Sign in Page</i>, the <i>Datasets Page</i>, and the <i>Dropdown Menu</i>. The drop down menu is only 
                    available to those already signed in. If you ever need to get back to the home page just click on our logo!</p>
                    <br></br>
                    <p><b>Footer:</b> We designed our proof of concept footer for our WIRE powerderless app.</p>
                    <br></br>
                    <h2>Main Menu</h2>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Home Page</th>
                                    <th>User Guide</th>
                                    <th>Datasets</th>
                                    <th>Sign In</th>
                                    <th>Register</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className="table_data">*Project Overview</p>
                                        <p className="table_data">*Development Timeline</p>
                                        <p className="table_data">*Hardware Preview</p>
                                    </td>
                                    <td>
                                        <p className="table_data">*Website Overview</p>
                                        <p className="table_data">*Page Summaries</p>
                                        <p className="table_data">*Navigation Guidance</p> 
                                    </td>
                                    <td>
                                        <p className="table_data">*Dataset Options</p>
                                        <p className="table_data">*Links to Download</p>
                                    </td>
                                    <td>
                                        <p className="table_data">*Sign In Form</p>
                                        <p className="table_data">*Option to Register</p>
                                    </td>
                                    <td>
                                        <p className="table_data">*User Name</p>
                                        <p className="table_data">*Password</p>
                                        <p className="table_data">*Linked Email</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h2>Drop Down Menu</h2>
                    <p id="table_subtitle">This menu is only displayed once you sign in.</p>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Account Setting</th>
                                    <th>My Projects</th>
                                    <th>Hardware</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className="table_data">*Account Info</p>
                                        <p className="table_data">*Option to Edit Info</p>
                                    </td>
                                    <td>
                                        <p className="table_data">*List of Projects</p>
                                        <p className="table_data">*Option to Create Projects</p>
                                        <p className="table_data">*Option to Join Projects</p> 
                                    </td>
                                    <td>
                                        <p className="table_data">*Hardware Availability</p>
                                        <p className="table_data">*Option to Check-in HW</p>
                                        <p className="table_data">*Option to Check-out HW</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1 id="smaller_h1">Features Summary and Coding Logistics</h1>
                    <p class='text_for_first'>
                        For more details on features summary and coding logistics please read our README.md file in our github at <a href="https://github.com/sohaibi/EE461L-Project/tree/main">https://github.com/sohaibi/EE461L-Project/tree/main</a>.
                    </p>
                    <br></br>

                </div>

            </div>
    );
}