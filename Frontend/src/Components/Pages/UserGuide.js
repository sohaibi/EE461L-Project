import React from 'react';
import '../../App.css';
import './UserGuide.css';

export default function Link1() {
    return (
        <div >
            <h1 id='user_guide'>User Guide</h1>

            <div id="user_guide_container">

                <p id="intro">Welcome to WIRE powderless! WIRE (Working in Remote Environments) is a proof-of-concept app created by five college students at the University of Texas at Austin.
Our app will allow you to checkin and checkout hardware with us for project use. Each of our webpage is composed of the header, the page content, and the footer.</p>
                <div id="user_guide_content">
                    <h2>Webpage Structure</h2>
                    <h3 class='first'>Header</h3>
                    <p id='text_for_first'>Our header consists of a navigation bar to **Home Page**, **Userguide**, **Sign in**, **Datasets**, and a **Dropdown Menu**. The drop down menu is only available to those already signed in. If you ever need to get back to the home page just click on our logo!</p>
                    <br></br>

                    <h4 class='second'>Home Page</h4>
                    <p class='text_for_second'>Our home page tells you everything you need to know about our project's concept and development time. It also provides you with a quick view of the types of hardware you can check in or out with us. </p>
                    <br></br>

                    <h4 class='second'>User Guide</h4>
                    <p class='text_for_second'>This is the page you're looking at right now. The userguide page provides guidance to our users on how to browse our app. </p>
                    <br></br>

                    <h4 class='second'>Datasets</h4>
                    <p class='text_for_second'>Our datasets page allows you to download various types of databases to use with the hardware you check out from us. All it takes is one click to get the zip containing your desired information!</p>
                    <br></br>

                    <h4 class='second'>Sign In</h4>
                    <p class='text_for_second'>Our sign in page is crucial. Signing in precedes most of our websites functionalities, including the account page, project page and hardware page. If you don't yet have an account, the sign in page will give you an option to direct to the registration page. </p>
                    <br></br>

                    <h4 class='second'>Registration</h4>
                    <p class='text_for_second'>Our registration page allows a new coming user to register a new account with us.You will have to provide the unique username, email and password.</p>
                    <br></br>

                    <h4 class='second'>Dropdown Menu</h4>
                    <p class='text_for_second'>Signed in users will be able to see the dropdown menu which can direct to "Account Settings", "My Projects" and "Hardware" and pages.</p>
                    <br></br>

                    <h5 class='third'>Account Settings</h5>
                    <p class='text_for_third'>This page displays for you your username, email, and user id. You also have the capability to changing your username or email by clicking the edit profile button.</p>
                    <br></br>

                    <h5 class='third'>My Projects</h5>
                    <p class='text_for_third'>This page contains all the projects you've started with us as well as projects created by others that you've joined. Using this page, you can create new projects, join existing ones, or edit the information associated with your current projects. Projects are important because they allow you to check out hardware.</p>
                    <br></br>

                    <h5 class='third'>Hardware</h5>
                    <p class='text_for_third'>The hardware page allows you to check in and check out our different types of hardware for your projects. Our graph at the top gives a quick view of what we have available and how much of that hardware you've checked out personally for the selected project. By selecting one of your projects, you can alter this graph view and procede to check in or check out hardware. What ever you decide to do with the hardware at this point will be tied to the project you selected. </p>
                    <br></br>

                    <h3 class='first'>Footer</h3>
                    <p class='text_for_first'>We designed our proof of concept footer for our WIRE powerderless app.</p>
                    <br></br>


                    <h2>Features Summary and Coding Logistics</h2>
                    <p class='text_for_first'>
                        For more details on features summary and coding logistics please read our README.md file in our github at <a href="https://github.com/sohaibi/EE461L-Project/tree/main">https://github.com/sohaibi/EE461L-Project/tree/main</a>.
                    </p>
                    <br></br>


                </div>


            </div>

        </div>
    );
}