import React from 'react';
import '../../App.css';
import './UserGuide.css';

export default function Link1(){
    return (
        <div>
            <h1 id='user_guide'>User Guide</h1>
            <div>
                <h3 id='header3'>Home Page</h3>
                <p id='text_for_header3'>Our home page tells you everything you need to know about our project's concept and development time.
                     It also provides you with a quick view of the types of hardware you can check out with us.</p>
                <br></br>
                <h3 id='header3'>Sign In</h3>
                <p id='text_for_header3'>Our sign in page is crucial. Signing in precedes most of our websites functionalities, including the project page and checking out hardware.
                     If you don't yet have an account, the sign in page will</p>
                <p id='text_for_header3'>give you a registration option as well.</p>
                <br></br>
                <h3 id='header3'>Datasets</h3>
                <p id='text_for_header3'>Our datasets page allows you to download various types of databases to use with the hardware you check out from us.
                     All it takes is one click to get the zip containing your desired information!</p>
                <br></br>
                <h3 id='header3'>Under the Menu:</h3>
                <p id='text_for_header3'>Our menu consists of a header and drop down menu. The drop down menu is only available to those already signed in.
                     If you ever need to get back to the main page just click on our logo!</p>
                <br></br>
                <h4 id='text_for_header3'>My Projects</h4>
                <p id='text_for_header4'>This page contains all the projects you've started with us as well as projects created by others that you've joined. Using this page, you can create new projects, join existing ones, </p>
                <p id='text_for_header4'>or edit the information associated with your current projects. Projects are important because they allow you to check out hardware.</p>
                <br></br>
                <h4 id='text_for_header3'>Hardware</h4>
                <p id='text_for_header4'>The hardware page allows you to check in and check out our different types of hardware for your projects. Our graph at the top gives a quick view of what we have available</p>
                <p id='text_for_header4'>and how much of that hardware you've checked out personallly for the selected project. By selecting one of your projects, you can alter this graph view and procede to check in or</p>
                <p id='text_for_header4'>check out hardware. What ever you decide to do with the hardware at this point will be tied to the project you selected.</p>
                <br></br>
                <h4 id='text_for_header3'>Account Settings</h4>
                <p id='text_for_header4'>This page displays for you your username, email, and user id. You also have the capability to changing your username or email by clicking the edit profile button.</p>
                <br></br>
                <br></br>
            </div>
              
        </div>
    );
}