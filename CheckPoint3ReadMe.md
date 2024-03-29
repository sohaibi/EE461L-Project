# EE461L-Project
Welcome to WIRE powderless! WIRE (Working in Remote Environments) is a proof-of-concept app created by five college students at the University of Texas at Austin. <br>
Our app will allow you to checkin and checkout hardware with us for project use. Each of our webpage is composed of the header, the page content, and the footer. <br>
Enhanced and deployed web link: 
https://wirepowderless.herokuapp.com/

## Code Scalability
### Add More Hardware Resources
**Database:** <br>
In data_service/hardware.py, we have implemented two functions 
```
def create_new_HWSet(HWSet_name: str, capacity: int) -> str:
    """
    create new HWSet 
    :param hardware_name: HWSet name
    :param capacity: HWSet capacity
    :returns: HWSet_id in str format if success; -1 if capacity is negative
    """
```
and 
```
def set_HWSet_capacity(HWSet_id: str, amt_of_hardware: int) -> int:
    """
    set hardware_set capacity, amt_of_hardware can be positive or negative 
    :param HWSet_id: HWSet id
    :param amt_of_hardware: change of amount of hardware capacity in this hardware set
    :returns: new capacity if success; error code as int. -1 when hardware cannot be found ; -2 when decrease of capacity exceeds current availability
    """
```
to enable the feature as to create new hardware and expand the capacity of existing hardware set, respectively. <br>
**Web UI:** <br>
This feature can be easily implemented by add a new button 'Add Hardware Resources' on hardware web page(https://wirepowderless.herokuapp.com/hardware).
### Tailor the Look and Feel of Web UI by Stakeholders
Updating the Web UI can be done as follows:
- For more general styling like font style, colors, sizes, and background, make changes to App.css.
- For more specific styling of pages or components, make changes to their individual CSS files. 
<br>

### View Billing Information by Client<br>
**Database:**<br>
- Add a 'credit' attibute in 'Project' collection in MongoDB <br>
This 'credit' attribute will be in integer or float datatype, to indicate how many credits this project currently has. If intially every project has 300 free credits, then its value will be 300. When 'credit' becomes 0, it can be increased again by charging Client's credit card.
- Add datetime information in hardware checkin/checkout dictonary in 'Project' collection in MongoDB <br>
In checkpoint 2, the hardware set rent information for each project is stored as a dictionary,called 'HWSet_dict' with the key being the hardware set ID, and the value being the integer of how many hardware are being rent(for example, '{HWSet_id_1:5, HWSet_id_2 :10}'). <br>
In checkpoint 3, to add the feature of viewing bill for certain project, what we can do is do modify the value in this dictionary from an integer to a tuple, with the first element being the datetime when that hardware is checked out; second being the checked out number for that hardware set(for example,
'{HWSet_id_1: [
(2021-04-22 8:00 , 2),
(2021-04-22 9:30 , 1),
 ],
HWSet_id_2:[
(2021-04-20 7:00 , 5),
(2021-04-23 15:30 , 4),
 ]
}'). <br>
When hardware is returned, we calculate the total billed credit = sum(price per hour* time span). The deducted hardware rent information and credits value will be reflected on the 'HWSet_dict' and the 'credits' accordingly.<br>

**Web UI:**<br>
On project webpage(https://wirepowderless.herokuapp.com/project), we can add a column to indicate the 'credit' amount for each project. The history of checkin and checkout log can also be stored and displayed if necessary.

## Continuous Improvement
### Refractor <br>
**Backend** <br>
In checkpoint2, all the routes are defined in the app.py file, which makes the app.py extremely long and hard to debug. In checkpoint3, we seperated the code into 4 modules adopting flask's 'Blueprint' feature. Now the code in each modules(user module, project module, hardware module, dataset module) are saved in different py files in 'modules' folder, which makes the whole structure more organized and easier to check and debug. <br>
**Frontend** <br>
In checkpoint3, we refractored some duplicated codes. Examples are: <br>
- Login Page and Register Page  <br>
- The Login and Registration system went through some refactoring for optimizing and reducing our code. In our project checkpoint2 submission, the login page(https://wirepowderless.herokuapp.com/login) and register page(https://wirepowderless.herokuapp.com/register) basically contains the same rendering code. <br>
Therefore, we made a seperate component 'UserForm.js' which will render different form upon receiving different props, either from Login.js or from Register.js. These props can be differentiated in situations when a user either wants to login to the website or sign up to make an account since both of these events result in rendering different type of forms. For both of these forms, there are different type of requests sent to the backend depending upon the entries that each form has. For instance, the register form on the register.js file contains entries like email, username, password, and a confirmation of the password while the login form (login.js) consist of only the username and password entries. By creating a UserForm component for both of the files passing their respective props, our code can render different forms. We also created one css file called UserForm.css which contains the css properties for both the login and the register forms. In our last submission, the code was identical for both the login and register.css files, hence we wrote one css file to optimize and reduce the code.   
- Dataset Page <br>
 The Dataset Page underwent significant refactoring to change the way we generated the downloadable zips. Initially, it was designed to download a zip's data via wfdb onto Heroku and transfer the zip to the user through Flask. Ultimately, however, we noticed a pattern in the href urls used on PhysioNet's own website to allow users to download the data. Using this formula, we autogenerated urls for a list of 10 databases that we make available to the users. This eliminated 90% of the code needed in dataset.py and reduced the necessary functions from about 10 to 1.<br>
 Additionally, the Frontend coding of the table was streamlines. While initially each row was individually coded, now the content of the table is generated by an asynchronous function. This allows for easier scalability when it comes to adding additional dataset options. The functionality to grab additionall database information and display that information in the table is based on 2 for loops. Therefore, expanding the list requires the modifications of 2 upper bounds. Perviously, this would have required 5 lines of code per additional row. <br>

### Information Hiding <br>
**Frontend**<br>
Earlier in checkpoint 2 we have adopted the information hiding principle when imporve our codes. Examples are: <br>
- Hareware Page <br>
In hardware page(https://wirepowderless.herokuapp.com/hardware), we created seperate child components as CheckinTable.js and CheckoutTable.js to be called from page HWForm.js to render either or both tables, depending on user's input. <br>
Tables that are not requested by the user are hidden by toggling their CSS properties: <br>
```
.table-disabled {
    visibility: collapse;
    display: none;
    height: 0px;
}
```
The same above is applied to the containers of errors when their appearance needs to be toggled based on if an error in the user input is detected. <br>
In hardware page(https://wirepowderless.herokuapp.com/hardware), we created seperate child components as CheckinTable.js and CheckoutTable.js to be called from page HWForm.js to render different tables.
- Project Page <br>
In project page(https://wirepowderless.herokuapp.com/project), we created seperate child components as UseTable.js and UseForm.js to be called from page Project.js to render the table needed and form needed for parent component Project.js. <br>

**Backend**<br>
In the '/projects' route of flask end, to handle the post request regarding differetn actions('create','update','delete',etc) takes quite large amounts of code while actually doing a simple task. In order to make the code more compact, we move that bunch of code into a seperate helper python file 'project_module_helper.py'.

## Testing Coverage
We selected the hardware module to test with, and tested the react end and flask end, respectively. 
<br>
**Frontend**
<br>
To test the react front end we imported the package react testing libary.
- Testing the rendering of hardware page <br>
The testing code is in 'test-react-hardwareModule-rendering' branch. To run the test, do: <br>
```
$ git checkout test-react-hardwareModule-rendering
$ cd Frontend
$ npm test
```
**Jest Testing** <br>
- Testing the functionality of hardware page <br>
-  Rendering Tests<br>
    ✓ both check in/out renders without crashing<br>
    ✓ render CheckIn heading (user-friendly) <br>
    ✓ render CheckIn heading <br>
    ✓ render CheckOut heading <br>
    ✓ render checkbox labels <br>

-  Functionality Tests<br>
    ✓ test checkbox response <br>
    ✓ test CheckInTable.js against dummy data <br>
    ✓ test stepUp/Down in CheckinTable.js  <br>
    
  Test Suites: 1 passed, 1 total.    Tests: 8 passed, 8 total<br>
  
The testing code is in 'test-react-hardwareModule-functionality' branch. To run the test, do: <br>
```
$ git checkout test-react-hardwareModule-functionality
$ cd Frontend
$ npm test
```
**Hardware Frontend Testing Details** <br>
- Rendering Tests <br>
In order to test the Hardware page rendering, inputs represent the hardware sets and the user's project hardware info. The CheckinTable and CheckouTable were then rendered and the values inside their rows were compared against the expected. <br>
- Functionality Tests <br>
In order to test the Check-In and Check-Out functionality, similar test inputs were used as above. In addition, events were fired to imitate a user filling out the number fields to check-in or check-out hardware. Then, the values of these fields and the callback function's array that held the updated hardware arrays were compared against the expected.
<br>

**Backend**<br>
We adopted the in-built flask testing module to test the rendering and functionality.
- Testing the rendering and functionality of hardware module in flask<br>
The testing code is in 'test-flask-rendering-functionality' branch. To run the test, do: <br>
```
$ git checkout test-flask-rendering-functionality
$ pytest test_app.py
```
A test client is created to test the hardware module. Four tests are conduted: <br>
    ✓ test_hardware_module_hwtable(client)   # test the rendering and length of hardware table <br>
    ✓ test_hardware_module_get_projects(client) # test projects can be retrived from database for the test client<br>
    ✓ test_hardware_module_checkout(client)  # pick up a random project to checkout random amount for randowm existing hardware set, check if the changed hardware amount in the 'Project' colleciton and 'HWSet' collection in MongoDB meets expected checkout value.<br>
    ✓ test_hardware_module_checkin(client) # pick up a random project which has hardware in rent to checkin random amount for randowm existing hardware set, check if the changed hardware amount in the 'Project' colleciton and 'HWSet' collection in MongoDB meets expected checkout value.<br>
All tests passed, which indicates the rendering and functionality of hardware module in flask backend works normally.
