import React from 'react';
import { BrowserRouter as Router,
    Switch,
    Route,
    Link 
} from 'react-router-dom';
import './Menu.css';

// Pages //
import Account from '../Pages/Account';
import Projects from '../Pages/Projects';

function Menu() {

    return(
        <Router>
        <ul>
            <li>
                <div className="list_item_div">
                    <Link to="/account" className="menu_link">Account Settings</Link>
                </div>
            </li>
            <li>
                <div  className="list_item_div">
                <Link to="/projects" className="menu_link">Projects Page</Link>
                </div>
            </li>
        </ul>

        <Switch>
            <Route path="../Pages/Account"><Account /></Route>
            <Route path="../Pages/Projects"><Projects /></Route>
        </Switch>
        </Router>
    );
}

export default Menu;