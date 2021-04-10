# EE461L-Project
Welcome to WIRE powderless! WIRE (Working in Remote Environments) is a proof-of-concept app created by five college students at the University of Texas at Austin. <br>
Our app will allow you to checkin and checkout hardware with us for project use. Each of our webpage is composed of the header, the page content, and the footer. <br>
Deployed web link: 
https://wirepowderless.herokuapp.com/

## Webpage Structure
### Header
Our header consists of a navigation bar to **Home Page**, **Userguide**, **Sign in**, **Datasets**, and a **Dropdown Menu**. The drop down menu is only available to those already signed in. If you ever need to get back to the home page just click on our logo!<br>
#### Home Page
Our home page tells you everything you need to know about our project's concept and development time. It also provides you with a quick view of the types of hardware you can check in or out with us. 
#### User guide
This is the page you're looking at right now. The userguide page provides guidance to our users on how to browse our app.
#### Sign In
Our sign in page is crucial. Signing in precedes most of our websites functionalities, including the account page, project page and hardware page. If you don't yet have an account, the sign in page will give you an option to direct to the registration page.
#### Registration
Our registration page allows a new coming user to register a new account with us.You will have to provide the unique username, email and password.
#### Datasets
Our datasets page allows you to download various types of databases to use with the hardware you check out from us. All it takes is one click to get the zip containing your desired information!
#### Dropdown Menu
Signed in users will be able to see the dropdown menu which can direct to "My Projects", "Hardware" and "Account Settings" pages.
##### My Projects
This page contains all the projects you've started with us as well as projects created by others that you've joined. Using this page, you can create new projects, join existing ones, or edit the information associated with your current projects. Projects are important because they allow you to check out hardware.
##### Hardware
The hardware page allows you to check in and check out our different types of hardware for your projects. Our graph at the top gives a quick view of what we have available and how much of that hardware you've checked out personally for the selected project. By selecting one of your projects, you can alter this graph view and procede to check in or check out hardware. What ever you decide to do with the hardware at this point will be tied to the project you selected. 
##### Account Settings
This page displays for you your username, email, and user id. You also have the capability to changing your username or email by clicking the edit profile button.
### Footer
We create our proof of concept footer for our WIRE powerderless app.




## Features

### User Profile Management
  * The user can sign in with the usrename and password. The guest can register a new account with provided username, password, and email.
  * Safe encryption of the password.
  * The user can edit the username and email address, if the new username and password does not exist in the database.

### Project Management

#### Search, Create, Join Project
  * The user can use the “Search Bar” to search desire project by project name
 * The user can use the “Create Project” button to create new project with a project name and comments
 * The user can use the “Join Project” button to join an existing project with a unique project ID

#### Display, Update, Delete Project
  * The project table contains the unique id of each project, project name, project creation and modification date
  * Two action buttons that allows for project modification and deletion.
  * (Note: Current version of the project table also include the name of the project creator for each project. However, this information might be relocated in the next phase of development.)
  * In the “action column”, the pencil icon allows user to edit the project (either change project name or modify comment), the “x” icon allows user to delete the specific project.

#### Sorting and Pagination
  * The project table can be sorted according to project name, date created, and date edited.
  * The project table can be sorted by clicking on the table headers available for sorting.
  * The pagination clickable at the bottom of the project table allows user to select the number of projects (5, 10, or 15) to be displayed on a single page. The arrows clickable allows user to go back and forth between pages.


### Hardware Management
#### Intantly Updated Hardware Information 
  * The table contains the availability and capacity of each hardware set.
  * The graph displays the available and capacity of the hardware sets, as well as the amount checked out by the selected project.
  * Any change in the hardware amount is instantly updated on page.

#### Checking In and Checking Out Hardware
  * The selection input allows the user to pick which of the projects they want to add/remove hardware to/from.
  * Once a project is selected, the user then determines whether to check-in hardware, check-out hardware, or both. 
  * When checking in or out the hardware, only numeric inputs are accepted by arrow keys. In the next phase, acceptance of user input will be more flexible. 
    * If checking in, their inputs are limited by the current amount they have checked out.
    * If checking out, their inputs are limited by the capacity of the hardware. In the next phase, they will also be limited by the remaining credits in the project.

### Dataset Management:
  * Use wfdb to grab the names of the databases from Physionet to diplay them as options for the user to download.
  * Download database zip files. When the user clicks the Download hyperlink, the zip of that specific database is downloaded to their computer. This is via a href in the <a></a> data type. The links for which were taken by inspecting Physionet's website. 
  * Handle the download request more dynamically. Using wfdb functions, we are able to download the files for a database into our own project folder. The database is then zipped. When the user clicks the button to download as part of a submit through a form datatype, this grabbing of the zip from Physionet ensues. The zip is then saved into a variable, the files within our project folder are deleted, and the zip variable is returned, initiating the process of downloading. This functionality is currently inactive but is intended to be expanded upon in Phase 3.



## Coding Logistics

The 'Frontend' folder contains the frontend code written in reactJS.<br>
The 'data_service' folder contains code to read and write to the mongoDB database.<br>
<b>app.py</b> file contains the server side code in flask framework.<br>
Proxy connection between reactJS and flask is done via fetch method in js file.<br>
