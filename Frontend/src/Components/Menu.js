import React from 'react';
import { BrowserRouter as Router,
    Switch,
    Route,
    Link 
} from 'react-router-dom';
import './Menu.css';

// TO-DO: Pages //
// import Account from '../Pages/Account';
// import Projects from '../Pages/Projects';

function Menu() {

    return(
        <Router>
        <ul>
            <li>
                <Link to="/" className="menu_link">
                    <div className="list_item_div">
                        Account Settings
                    </div>
                </Link>
            </li>
            <li>
                <Link to="/" className="menu_link">
                    <div className="list_item_div">
                        My Projects
                    </div>
                </Link>
            </li>
        </ul>

        <Switch>
            {/* TO-DO: assign routes
            <Route path="../Pages/Account"><Account /></Route>
            <Route path="../Pages/Projects"><Projects /></Route>
            */}
        </Switch>
        </Router>
    );
}

export default Menu;