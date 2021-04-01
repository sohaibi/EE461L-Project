<<<<<<< Updated upstream
import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {

    return (

        <ul>
            <li>
                <Link to="/editProfile" className="menu_link">
                    <div className="list_item_div">
                        Account Settings
                    </div>
                </Link>
            </li>
            <li>
                <Link to="/project" className="menu_link">
                    <div className="list_item_div">
                        My Projects
                    </div>
                </Link>

            </li>
            <li>
                <Link to="/hardware" className="menu_link">
                    <div className="list_item_div">
                        Hardware
                    </div>
                </Link>
            </li>
        </ul>
    );
}

=======
import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {

    return (

        <ul>
            <li>
                <Link to="/userProfile" className="menu_link">
                    <div className="list_item_div">
                        Account Settings
                    </div>
                </Link>
            </li>
            <li>
                <Link to="/project" className="menu_link">
                    <div className="list_item_div">
                        My Projects
                    </div>
                </Link>

            </li>
            <li>
                <Link to="/hardware" className="menu_link">
                    <div className="list_item_div">
                        Hardware
                    </div>
                </Link>
            </li>
        </ul>
    );
}

>>>>>>> Stashed changes
export default Menu;