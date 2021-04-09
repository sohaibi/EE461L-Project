# EE461L-Project

## Userguide:
### Home Page: 
Our home page tells you everything you need to know about our project's concept and development time. It also provides you with a quick view of the types of hardware you can check out with us. 
### Sign In:
Our sign in page is crucial. Signing in precedes most of our websites functionalities, including the project page and checking out hardware. If you don't yet have an account, the sign in page will give you a registration option as well.
### Datasets:
Our datasets page allows you to download various types of databases to use with the hardware you check out from us. All it takes is one click to get the zip containing your desired information!
### Under the Menu:
Our menu consists of a header and drop down menu. The drop down menu is only available to those already signed in. If you ever need to get back to the main page just click on our logo!
#### My Projects:
This page contains all the projects you've started with us as well as projects created by others that you've joined. Using this page, you can create new projects, join existing ones, or edit the information associated with your current projects. Projects are important because they allow you to check out hardware.
#### Hardware:
The hardware page allows you to check in and check out our different types of hardware for your projects. Our graph at the top gives a quick view of what we have available and how much of that hardware you've checked out personally for the selected project. By selecting one of your projects, you can alter this graph view and procede to check in or check out hardware. What ever you decide to do with the hardware at this point will be tied to the project you selected. 
#### Account Settings:
This page displays for you your username, email, and user id. You also have the capability to changing your username or email by clicking the edit profile button.

## Features:

## User Profile Management:

## Project Management:

#### Sear, Create, Join Project:
  * The user can use the “Search Bar” to search desire project by project name
  * The user can use the “Create Project” button to create new project with a project name and comments
  * The user can use the “Join Project” button to join an existing project with a unique project ID

#### Project Table:
  * The project table contains the unique id of each project, project name, project creation and modification date, and two action buttons that allows for project modification and deletion.
  * (Note: Current version of the project table also include the name of the project creator for each project. However, this information might be relocated in the next phase of development.)
  * In the “action column”, the pencil icon allows user to edit the project (either change project name or modify comment), the “x” icon allows user to delete the specific project.

#### Sorting and Pagination:
  * The project table can be sorted according to project name, date created, and date edited.
  * The project table can be sorted by clicking on the table headers available for sorting.
  * The pagination clickable at the bottom of the project table allows user to select the number of projects (5, 10, or 15) to be displayed on a single page. The arrows clickable allows user to go back and forth between pages.


## Hardware Management:
### The Hardware Table (also on Home Page) 
  * The table contains the availability and capacity of each hardware set.
  * The graph displays the available and capacity of the hardware sets, as well as the amount checked out by the selected project.

### Checking In and Checking Out Hardware
  * The selection input allows the user to pick which of the projects they want to add/remove hardware to/from.
  * Once a project is selected, the user then determines whether to check-in hardware, check-out hardware, or both. 
  * When checking in or out the hardware, only numeric inputs are accepted by arrow keys. In the next phase, acceptance of user input will be more flexible. 
    * If checking in, their inputs are limited by the current amount they have checked out.
    * If checking out, their inputs are limited by the capacity of the hardware. In the next phase, they will also be limited by the remaining credits in the project.

## Dataset Management:
#### Functionalities: 
  * The first functionality uses wfdb to grab the names of the databases from Physionet to diplay them as options for the user to download.
  * The second functionality allows for the download of these database zip files. When the user clicks the Download hyperlink, the zip of that specific database is downloaded to their computer. This is via a href in the <a></a> data type. The links for which were taken by inspecting Physionet's website. 
  * The third functionality was built as a way to make our code more dynamic. Using wfdb functions, we are able to download the files for a database into our own project folder. The database is then zipped. When the user clicks the button to download as part of a submit through a form datatype, this grabbing of the zip from Physionet ensues. The zip is then saved into a variable, the files within our project folder are deleted, and the zip variable is returned, initiating the process of downloading. This functionality is currently inactive but is intended to be expanded upon in Phase 3.
#### Files:
The files used to exercise the Dataset Management functionallities are as follows:
  * dataset.py: This is the backend python code that uses wfdb to interact with Physionet
  * Datasets.js: This handles the javascript and html that displays the Dataset page on our website.
  * app.py: This handles our flask connection, transferring the form submission in Datasets.js to the downloading of files in dataset.py



https://wirepowderless.herokuapp.com/

The 'frontend' folder contains the React side of the web app.
The 'data_service' folder contains the mongoDB data side of the web app.
<b>app.py</b> file contains the flask side of the web app.
Connection between reactJS and flask is done via fetch method in js file.
