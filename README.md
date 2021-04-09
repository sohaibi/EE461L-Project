# EE461L-Project

Userguide:

Features:

User Profile Management:

Project Management:

Sear, Create, Join Project:
  * The user can use the “Search Bar” to search desire project by project name
  * The user can use the “Create Project” button to create new project with a project name and comments
  * The user can use the “Join Project” button to join an existing project with a unique project ID

Project Table:
  * The project table contains the unique id of each project, project name, project creation and modification date, and two action buttons that allows for project modification and deletion.
  * (Note: Current version of the project table also include the name of the project creator for each project. However, this information might be relocated in the next phase of development.)
  * In the “action column”, the pencil icon allows user to edit the project (either change project name or modify comment), the “x” icon allows user to delete the specific project.

Sorting and Pagination:
  * The project table can be sorted according to project name, date created, and date edited.
  * The project table can be sorted by clicking on the table headers available for sorting.
  * The pagination clickable at the bottom of the project table allows user to select the number of projects (5, 10, or 15) to be displayed on a single page. The arrows clickable allows user to go back and forth between pages.


Hareware Management:

Dataset Management:


https://wirepowderless.herokuapp.com/

The 'frontend' folder contains the React side of the web app.
The 'data_service' folder contains the mongoDB data side of the web app.
<b>app.py</b> file contains the flask side of the web app.
Connection between reactJS and flask is done via fetch method in js file.
