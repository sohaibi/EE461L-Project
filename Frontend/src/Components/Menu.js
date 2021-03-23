import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route
} from 'react-router-dom';
import './Menu.css';
import Projects from './Pages/Projects'

// TO-DO: Pages //
// import Account from './Pages/Account';
// import Projects from './Pages/Projects';

function Menu() {

    return (

        <ul>
            <li>
                <Link to="/" className="menu_link">
                    <div className="list_item_div">
                        Account Settings
                    </div>
                </Link>
            </li>
            <li>
                <Link to="/projects" className="menu_link">
                    <div className="list_item_div">
                        My Projects
                    </div>
                </Link>

            </li>
            <li>
                <Link to="/" className="menu_link">
                    <div className="list_item_div">
                        Hardware
                    </div>
                </Link>
            </li>
        </ul>

    );
}

export default Menu;